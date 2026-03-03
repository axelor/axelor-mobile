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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  FormHtmlInput,
  FormInput,
  KeyboardAvoidingScrollView,
  Label,
  Screen,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {RequestCreation} from '../types';
import {
  CompanyPicker,
  HorizontalOrRuleText,
  ProductSearchBar,
  RequestCreationButtons,
  RequestCreationQuantityCard,
  UnitSearchBar,
} from '../components';

const RequestCreationScreen = () => {
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.purchase.db.PurchaseRequest',
  });

  const {user} = useSelector(state => state.user);
  const {purchase: purchaseConfig} = useSelector(state => state.appConfig);

  const [company, setCompany] = useState(user.activeCompany);
  const [description, setDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(RequestCreation.step.addLine);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [isCustomProduct, setIsCustomProduct] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(purchaseConfig?.purchaseUnit);

  const resetDefaultStates = () => {
    handleReset();
    setCompany(user.activeCompany);
    setDescription('');
    setLines([]);
  };

  const handleEditLine = (line: any) => {
    setNewLine(line);
    setProductTitle(line.productTitle);
    setIsCustomProduct(line.product == null);
    setQuantity(line.quantity);
    setUnit(line.unit);
    setCurrentStep(RequestCreation.step.validateLine);
  };

  const handleReset = useCallback(
    (_step = RequestCreation.step.addLine) => {
      setCurrentStep(_step);
      setNewLine(null);
      setProductTitle('');
      setIsCustomProduct(false);
      setQuantity(0);
      setUnit(purchaseConfig?.purchaseUnit);
    },
    [purchaseConfig?.purchaseUnit],
  );

  const handleProductChange = useCallback(
    (_value: any) => {
      if (_value == null) {
        handleReset(RequestCreation.step.addLine);
      } else {
        setNewLine(_value);
        setProductTitle(_value.name);
        setIsCustomProduct(false);
        setUnit(_value.unit);
        setCurrentStep(RequestCreation.step.validateLine);
      }
    },
    [handleReset],
  );

  const handleCustomProductInput = useCallback((value: string) => {
    setProductTitle(value);
    setIsCustomProduct(!!value);

    if (value) {
      setCurrentStep(RequestCreation.step.validateLine);
    }
  }, []);

  const handleAddLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      const indexLine = newLines.findIndex(({id}) => id === newLine?.id);

      if (indexLine >= 0) {
        if (isEditionMode) {
          newLines[indexLine].quantity = quantity;
        } else {
          newLines[indexLine].quantity += quantity;
        }
      } else {
        newLines.push({
          productTitle: productTitle,
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

  if (!canCreate) {
    return (
      <Label
        style={styles.label}
        type="danger"
        message={I18n.t('Base_NoPermForCreate')}
      />
    );
  }

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <RequestCreationButtons
          step={currentStep}
          lines={lines}
          isValidateButtonDisabled={quantity === 0 || unit == null}
          isEditionMode={isEditionMode}
          addLine={handleAddLine}
          companyId={company.id}
          description={description}
          resetDefaultStates={resetDefaultStates}
        />
      }>
      <KeyboardAvoidingScrollView style={styles.container}>
        <CompanyPicker onChange={setCompany} company={company} />
        <FormHtmlInput
          title={I18n.t('Purchase_RequestDescription')}
          defaultValue={description}
          onChange={setDescription}
        />
        <ViewAllEditList
          title={I18n.t('Purchase_Products')}
          lines={lines.map(line => ({
            ...line,
            name: line.productTitle,
            qty: line.quantity,
            unitName: line.unit?.name,
          }))}
          currentLineId={isEditionMode ? newLine.id : null}
          setLines={setLines}
          handleEditLine={handleEditLine}
          translator={I18n.t}
        />
        <ProductSearchBar
          onChange={handleProductChange}
          defaultValue={newLine}
        />
        <HorizontalOrRuleText />
        <FormInput
          readOnly={!isCustomProduct && newLine != null}
          title={I18n.t('Purchase_ProductTitle')}
          defaultValue={productTitle}
          onChange={handleCustomProductInput}
        />
        <RequestCreationQuantityCard
          quantity={quantity}
          setQuantity={setQuantity}
          cancelLine={() => handleReset(RequestCreation.step.addLine)}
          productName={productTitle}
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
  label: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default RequestCreationScreen;
