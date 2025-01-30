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

import React, {useCallback} from 'react';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {createInternalMove} from '../../../../features/internalMoveSlice';

const InternalMoveLineCreationButton = ({
  onContinue = () => {},
  onAdd = () => {},
  hideAllIf = false,
  showRealize = false,
  moveFromStockLocation,
  moveToStockLocation,
  notes,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const handleRealize = useCallback(() => {
    onAdd().then(items => {
      dispatch(
        createInternalMove({
          companyId: user?.activeCompany?.id,
          fromStockLocationId: moveFromStockLocation?.id,
          toStockLocationId: moveToStockLocation?.id,
          lineItems: items,
          notes: notes,
        }),
      );
    });

    navigation.popToTop();
  }, [
    onAdd,
    navigation,
    dispatch,
    user?.activeCompany?.id,
    moveFromStockLocation?.id,
    moveToStockLocation?.id,
    notes,
  ]);

  const handleContinue = () => {
    onAdd().then(onContinue);
  };

  const renderRealizeButton = () => {
    return <Button title={I18n.t('Base_Realize')} onPress={handleRealize} />;
  };

  if (!hideAllIf) {
    return (
      <>
        <Button
          title={I18n.t('Base_AddContinue')}
          color={Colors.secondaryColor}
          onPress={handleContinue}
        />
        {renderRealizeButton()}
      </>
    );
  }

  if (showRealize) {
    return renderRealizeButton();
  }

  return null;
};

export default InternalMoveLineCreationButton;
