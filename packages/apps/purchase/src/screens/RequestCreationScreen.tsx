/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  FormHtmlInput,
  FormInput,
  KeyboardAvoidingScrollView,
  Screen,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {RequestCreation} from '../types';
import {
  CompanyPicker,
  HorizontalRuleText,
  ProductSearchBar,
  RequestCreationButtons,
  RequestCreationQuantityCard,
  UnitSearchBar,
} from '../components';

const RequestCreationScreen = () => {
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);

  const [company, setCompany] = useState(user.activeCompany);
  const [currentStep, setCurrentStep] = useState(RequestCreation.step.addLine);
  const [newLine, setNewLine] = useState(null);
  const [lines, setLines] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [productTitle, setProductTitle] = useState('');
  const [isCustomProduct, setIsCustomProduct] = useState(false);
  const [unit, setUnit] = useState(null);

  const handleEditLine = line => {
    setNewLine(line);
    setQuantity(line.quantity);
    setUnit(line.unit);
    setCurrentStep(RequestCreation.step.validateLine);
  };

  const handleReset = useCallback((_step = RequestCreation.step.addLine) => {
    setCurrentStep(_step);
    setQuantity(0);
    setNewLine(null);
    setProductTitle('');
    setUnit(null);
    setIsCustomProduct(false);
  }, []);

  const handleProductChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(RequestCreation.step.addLine);
      } else {
        setNewLine(_value);
        setProductTitle(_value.name);
        setUnit(_value?.unit);
        setIsCustomProduct(false);
        setCurrentStep(RequestCreation.step.validateLine);
      }
    },
    [handleReset],
  );

  const handleCustomProductInput = useCallback(value => {
    setProductTitle(value);
    setIsCustomProduct(!!value);
  }, []);

  const handleAddLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      const existingLine = newLines.find(line => line.id === newLine?.id);

      if (existingLine) {
        existingLine.quantity = quantity;
      } else {
        newLines.push({
          productTitle: isCustomProduct ? productTitle : null,
          product: isCustomProduct ? null : newLine,
          quantity: quantity,
          unit: unit,
          id: newLine?.id || `custom-${Date.now()}`,
        });
      }

      return newLines;
    });
    handleReset();
  };

  const isEditionMode = useMemo(
    () =>
      newLine?.quantity > 0 && lines.find(({id}) => id === newLine?.id) != null,
    [lines, newLine],
  );

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <RequestCreationButtons
          step={currentStep}
          setStep={setCurrentStep}
          lines={lines}
          unit={unit}
          movedQty={quantity}
          isEditionMode={isEditionMode}
          addLine={handleAddLine}
        />
      }>
      <KeyboardAvoidingScrollView style={styles.container}>
        <CompanyPicker onChange={setCompany} company={company} />
        <FormHtmlInput title={I18n.t('Purchase_Description')} />
        <ViewAllEditList
          title={I18n.t('Purchase_Products')}
          lines={lines.map(line => ({
            ...line,
            name: line.productTitle || line.product?.name,
            qty: line.quantity,
            unitName: line.unit?.name,
          }))}
          currentLineId={isEditionMode ? newLine.id : null}
          setLines={_lines =>
            setLines(_lines.map(line => ({...line, quantity: line.qty})))
          }
          handleEditLine={handleEditLine}
          translator={I18n.t}
        />
        <ProductSearchBar
          onChange={handleProductChange}
          defaultValue={newLine}
        />
        <HorizontalRuleText text={I18n.t('Purchase_Or')} style={styles.rule} />
        <FormInput
          readOnly={!isCustomProduct && newLine?.name != null}
          title={I18n.t('Purchase_ProductTitle')}
          defaultValue={isCustomProduct ? productTitle : newLine?.name}
          onChange={value => {
            handleCustomProductInput(value);
            if (value) {
              setCurrentStep(RequestCreation.step.validateLine);
            }
          }}
        />
        <RequestCreationQuantityCard
          quantity={quantity}
          setQuantity={setQuantity}
          cancelMove={() => handleReset(RequestCreation.step.addLine)}
          productName={newLine?.name || productTitle}
          productUnit={unit?.name || newLine?.product?.unit?.name}
        />
        <UnitSearchBar
          defaultValue={unit}
          onChange={setUnit}
          required={true}
          isScrollViewContainer={true}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  rule: {
    marginTop: 5,
    width: '80%',
  },
});

export default RequestCreationScreen;
