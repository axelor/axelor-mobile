/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDigitFormat, useOutsideClickHandler} from '../../../hooks';
import {ThemeColors, useThemeColor} from '../../../theme';
import {formatNumber} from '../../../utils';
import {Input} from '../../atoms';
import IncrementButton from './IncrementButton';
import {
  NumberSeparators,
  parseTypedNumber,
  toEditText,
  toNumber,
} from './number.helper';

interface IncrementProps {
  style?: any;
  inputStyle?: any;
  value: string | undefined;
  decimalSpacer?: string;
  thousandSpacer?: string;
  onValueChange: (_v?: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  readonly?: boolean;
  defaultFormatting?: boolean;
  stepSize?: number;
  minValue?: number;
  maxValue?: number;
  isBigButton?: boolean;
  keyboardType?: KeyboardTypeOptions;
  scale?: number;
}

const Increment = ({
  style,
  inputStyle,
  value,
  decimalSpacer,
  thousandSpacer,
  onValueChange,
  onFocus,
  onBlur,
  readonly = false,
  defaultFormatting = true,
  stepSize = 1,
  minValue = 0,
  maxValue,
  isBigButton = false,
  keyboardType = 'numeric',
  scale,
}: IncrementProps) => {
  const Colors = useThemeColor();
  const cutDecimalExcess = useDigitFormat();
  const containerRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  /*
   * The value given by the parent is the source of truth. The draft is the text
   * typed while the field is being edited; it is null the rest of the time.
   * The ref copy lets blur and outside click commit the draft only once.
   */
  const [draft, setDraft] = useState<string | null>(null);
  const draftRef = useRef<string | null>(null);
  const isEditedRef = useRef<boolean>(false);
  const isSelectionPendingRef = useRef<boolean>(false);

  const separators: NumberSeparators = useMemo(
    () => ({
      decimalSpacer: decimalSpacer ?? '.',
      thousandSpacer: thousandSpacer ?? ' ',
    }),
    [decimalSpacer, thousandSpacer],
  );

  const committedNumber = useMemo(() => toNumber(value), [value]);

  const roundToText = useCallback(
    (numberToRound: number | string): string => {
      if (scale == null) return cutDecimalExcess(numberToRound);

      return toNumber(numberToRound).toFixed(Math.max(scale, 0));
    },
    [cutDecimalExcess, scale],
  );

  const clampValue = useCallback(
    (_value: number) => {
      if (minValue != null && _value <= minValue) return minValue;
      if (maxValue != null && _value >= maxValue) return maxValue;
      return _value;
    },
    [maxValue, minValue],
  );

  const isInRange = useCallback(
    (_value: number) =>
      (minValue == null || _value >= minValue) &&
      (maxValue == null || _value <= maxValue),
    [maxValue, minValue],
  );

  /* The value sent is rounded like the value shown, then kept within limits. */
  const normalize = useCallback(
    (_value: number) => clampValue(parseFloat(roundToText(_value))),
    [clampValue, roundToText],
  );

  const getDisplayText = useCallback(
    (_value: number) =>
      defaultFormatting
        ? formatNumber(
            _value,
            separators.decimalSpacer,
            separators.thousandSpacer,
            roundToText,
          )
        : _value.toString(),
    [defaultFormatting, roundToText, separators],
  );

  const getEditText = useCallback(
    (_value: number) =>
      defaultFormatting
        ? toEditText(_value, separators, roundToText)
        : _value.toString(),
    [defaultFormatting, roundToText, separators],
  );

  const updateDraft = useCallback((text: string | null) => {
    draftRef.current = text;
    setDraft(text);
  }, []);

  const getCurrentNumber = useCallback(() => {
    if (draftRef.current == null) return committedNumber;

    return parseTypedNumber(draftRef.current, separators) ?? committedNumber;
  }, [committedNumber, separators]);

  const handleFocus = () => {
    if (draftRef.current == null) {
      isEditedRef.current = false;
      isSelectionPendingRef.current = true;
      updateDraft(getEditText(committedNumber));
    }

    onFocus?.();
  };

  /*
   * The whole text to edit is selected once it is shown: selecting it in the
   * focus handler would apply to the formatted text that it replaces.
   */
  useEffect(() => {
    if (draft == null || !isSelectionPendingRef.current) return;

    isSelectionPendingRef.current = false;
    inputRef.current?.setSelection?.(0, draft.length);
  }, [draft]);

  const handleInputChange = (text: string | null) => {
    const typedText = text ?? '';
    isEditedRef.current = true;
    updateDraft(typedText);

    // Text that is not a number yet, like "-" or "12,3,", sends nothing.
    const typedNumber = parseTypedNumber(typedText, separators);
    if (typedNumber == null) return;

    const roundedNumber = parseFloat(roundToText(typedNumber));
    if (maxValue != null && roundedNumber > maxValue && roundedNumber >= 0) {
      // More digits cannot bring a positive value back under the maximum.
      onValueChange(maxValue);
    } else if (isInRange(roundedNumber)) {
      // A value under the minimum may still be typed, like "1" for "12".
      onValueChange(roundedNumber);
    }
  };

  const commitDraft = useCallback(() => {
    const typedText = draftRef.current;
    if (typedText == null) return;

    const isEdited = isEditedRef.current;
    isEditedRef.current = false;
    isSelectionPendingRef.current = false;
    updateDraft(null);

    if (isEdited) {
      let nextNumber = committedNumber;

      if (typedText.trim() === '') {
        nextNumber = normalize(0);
      } else {
        /*
         * Text that is not a number keeps the last valid number typed, which
         * was already sent to the parent while typing.
         */
        const typedNumber = parseTypedNumber(typedText, separators);
        if (typedNumber != null) {
          nextNumber = normalize(typedNumber);
        }
      }

      if (nextNumber !== committedNumber) {
        onValueChange(nextNumber);
      }
    }

    onBlur?.();
  }, [
    committedNumber,
    normalize,
    onBlur,
    onValueChange,
    separators,
    updateDraft,
  ]);

  const handleOutsideClick = useCallback(() => {
    commitDraft();
    inputRef.current?.blur?.();
  }, [commitDraft]);

  const handleStep = (step: number) => {
    const nextNumber = normalize(getCurrentNumber() + step);
    onValueChange(nextNumber);

    if (draftRef.current != null) {
      updateDraft(getEditText(nextNumber));
    }
  };

  const currentNumber = getCurrentNumber();
  const displayedText = draft ?? getDisplayText(committedNumber);

  const styles = useMemo(() => getStyles(Colors), [Colors]);
  useOutsideClickHandler({
    wrapperRef: containerRef,
    handleOutsideClick,
    activationCondition: draft != null,
  });

  return (
    <TouchableOpacity
      ref={containerRef}
      style={[styles.container_increment, style]}
      activeOpacity={0.9}
      onPress={() => inputRef.current?.focus()}
      testID="incrementContainer">
      <IncrementButton
        iconName="dash-lg"
        onPress={() => handleStep(-stepSize)}
        readonly={readonly}
        disabled={minValue != null && currentNumber <= minValue}
        isBigButton={isBigButton}
      />
      <View
        style={[styles.inputLine, isBigButton ? styles.fixedInputWidth : null]}>
        <Input
          inputRef={inputRef}
          style={[styles.input, inputStyle]}
          value={displayedText}
          onChange={handleInputChange}
          keyboardType={keyboardType}
          onSelection={handleFocus}
          onEndFocus={commitDraft}
          readOnly={readonly}
        />
      </View>
      <IncrementButton
        iconName="plus-lg"
        onPress={() => handleStep(stepSize)}
        readonly={readonly}
        disabled={maxValue != null && currentNumber >= maxValue}
        isBigButton={isBigButton}
      />
    </TouchableOpacity>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container_increment: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    input: {
      paddingBottom: 0,
      textAlign: 'center',
    },
    inputLine: {
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 0.7,
      marginBottom: 9,
      flexShrink: 1,
    },
    fixedInputWidth: {
      width: '40%',
    },
  });

export default Increment;
