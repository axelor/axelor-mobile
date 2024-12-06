/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useTranslator} from '@axelor/aos-mobile-core';
import {RequestCreation} from '../types';
import {
  CompanyPicker,
  HorizontalRuleText,
  ProductSearchBar,
  RequestCreationButton,
  RequestCreationQuantityCard,
  UnitSearchBar,
} from '../components';

const RequestCreationScreen = () => {
  const I18n = useTranslator();

  const [company, setCompany] = useState(null);
  const [currentStep, setCurrentStep] = useState(RequestCreation.step.addLine);
  const [newLine, setNewLine] = useState(null);
  const [lines, setLines] = useState([]);
  const [movedQty, setMovedQty] = useState(0);
  const [productTitle, setProductTitle] = useState('');
  const [isCustomProduct, setIsCustomProduct] = useState(false);
  const [unit, setUnit] = useState(null);

  const handleEditLine = line => {
    setNewLine(line);
    setMovedQty(line.realQty);
    setUnit(line.unit);
    setCurrentStep(RequestCreation.step.validateLine);
  };

  const handleReset = useCallback((_step = RequestCreation.step.addLine) => {
    setCurrentStep(_step);
    setMovedQty(0);
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
        setUnit(_value?.unit);
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
      const newProduct = isCustomProduct
        ? {name: productTitle, id: `custom-${Date.now()}`}
        : newLine;
      const indexLine = newLines.findIndex(line => line.id === newProduct?.id);

      if (indexLine >= 0) {
        if (isEditionMode) {
          newLines[indexLine].realQty = movedQty;
        } else {
          newLines[indexLine].realQty += movedQty;
        }
      } else {
        newLines.push({
          product: newProduct,
          trackingNumber: newProduct?.trackingNumber,
          realQty: movedQty,
          currentQty: newProduct?.currentQty,
          unit: unit,
          id: newProduct?.id,
        });
      }

      return newLines;
    });
    handleReset(RequestCreation.step.addLine);
  };

  const isEditionMode = useMemo(
    () =>
      newLine?.realQty > 0 && lines.find(({id}) => id === newLine?.id) != null,
    [lines, newLine],
  );

  console.log(unit);

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <RequestCreationButton
          step={currentStep}
          setStep={setCurrentStep}
          lines={lines}
          movedQty={movedQty}
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
            name: line.product?.name || line.name,
            nameDetails: line.trackingNumber?.trackingNumberSeq,
            qty: line.realQty,
            unitName: line.unit?.name,
          }))}
          currentLineId={isEditionMode ? newLine.id : null}
          setLines={_lines =>
            setLines(_lines.map(line => ({...line, realQty: line.qty})))
          }
          handleEditLine={handleEditLine}
          translator={I18n.t}
        />
        {currentStep === RequestCreation.step.addLine && !isCustomProduct && (
          <ProductSearchBar
            onChange={handleProductChange}
            defaultValue={newLine}
            isScrollViewContainer
          />
        )}
        <HorizontalRuleText text={I18n.t('Purchase_Or')} style={styles.rule} />
        {(currentStep === RequestCreation.step.addLine ||
          (RequestCreation.step.validateLine && isCustomProduct)) && (
          <FormInput
            title={I18n.t('Purchase_ProductTitle')}
            onChange={value => {
              handleCustomProductInput(value);
              if (value) {
                setCurrentStep(RequestCreation.step.validateLine);
              }
            }}
          />
        )}
        {currentStep === RequestCreation.step.validateLine && (
          <>
            <RequestCreationQuantityCard
              movedQty={movedQty}
              setMovedQty={setMovedQty}
              cancelMove={() => handleReset(RequestCreation.step.addLine)}
              productName={newLine?.name || productTitle}
              trackingNumber={newLine?.trackingNumber?.trackingNumberSeq}
              availableQty={newLine?.currentQty}
              productUnit={unit?.name || newLine?.product?.unit?.name}
            />
            <UnitSearchBar defaultValue={unit} onChange={setUnit} />
          </>
        )}
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //height: '100%',
  },
  rule: {
    marginVertical: 15,
  },
});

export default RequestCreationScreen;
