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

import React, {useEffect, useState} from 'react';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  CustomFieldForm,
  useSelector,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ControlEntryFormButtons, ControlEntryFormHeader} from '../components';
import {searchControlEntrySampleLine} from '../features/controlEntrySampleLineSlice';

const ControlEntryFormScreen = ({route}) => {
  const {controlEntryId, selectedMode} = route.params;

  const dispatch = useDispatch();

  console.log('selectedMode', selectedMode);

  const {controlEntrySampleLineList} = useSelector(
    state => state.controlEntrySampleLine,
  );
  const {controlEntry} = useSelector(state => state.controlEntry);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentSample, setCurrentSample] = useState([]);
  const [currentCharacteristic, setCurrentCharacteristic] = useState(null);
  const [currentIndexCharacteristic, setCurrentIndexCharacteristic] =
    useState(1);
  const [isLastCharacteristic, setIsLastCharacteristic] = useState(false);
  const [isFirstCharacteristic, setIsFirstCharacteristic] = useState(false);

  useEffect(() => {
    setCurrentSample(controlEntry?.controlEntrySamplesList[currentIndex - 1]);
  }, [controlEntry, currentIndex]);

  useEffect(() => {
    dispatch(
      searchControlEntrySampleLine({controlEntrySampleId: currentSample?.id}),
    );
  }, [currentSample?.id, dispatch]);

  const handleNextSample = () => {
    setIsLastCharacteristic(false);
    setCurrentIndexCharacteristic(1);
    if (currentIndex <= controlEntry?.controlEntrySamplesList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevSample = () => {
    setIsLastCharacteristic(false);
    setCurrentIndexCharacteristic(1);
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextCharacteristic = () => {
    if (currentIndexCharacteristic <= controlEntrySampleLineList?.length - 1) {
      setCurrentIndexCharacteristic(currentIndexCharacteristic + 1);
    } else {
      setIsLastCharacteristic(true);
    }
  };

  const handlePrevCharacteristic = () => {
    if (currentIndexCharacteristic > 1) {
      setCurrentIndexCharacteristic(currentIndexCharacteristic - 1);
    } else {
      setIsLastCharacteristic(true);
    }
  };

  useEffect(() => {
    if (controlEntrySampleLineList?.length > 0) {
      setCurrentCharacteristic(controlEntrySampleLineList[0]);
    }
  }, [controlEntrySampleLineList]);

  useEffect(() => {
    if (controlEntrySampleLineList?.length > 0) {
      setCurrentCharacteristic(
        controlEntrySampleLineList[currentIndexCharacteristic - 1],
      );
    }
  }, [controlEntrySampleLineList, currentIndexCharacteristic]);

  useEffect(() => {
    if (currentIndexCharacteristic === controlEntrySampleLineList?.length) {
      setIsLastCharacteristic(true);
    } else {
      setIsLastCharacteristic(false);
    }
    if (currentIndexCharacteristic === 1) {
      setIsFirstCharacteristic(true);
    } else {
      setIsFirstCharacteristic(false);
    }
  }, [
    controlEntrySampleLineList?.length,
    currentIndexCharacteristic,
    currentIndex,
  ]);

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <ControlEntryFormButtons
          handleNextSample={handleNextSample}
          handlePrevSample={handlePrevSample}
          handleNextCharacteristic={handleNextCharacteristic}
          handlePrevCharacteristic={handlePrevCharacteristic}
          isLastCharacteristic={isLastCharacteristic}
          isFirstCharacteristic={isFirstCharacteristic}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ControlEntryFormHeader
            currentIndex={currentIndex}
            controlEntryId={controlEntryId}
            currentIndexCharacteristic={currentIndexCharacteristic}
          />
        }
      />
      {currentCharacteristic != null && (
        <CustomFieldForm
          model="com.axelor.apps.quality.db.ControlEntryPlanLine"
          modelId={currentCharacteristic?.id}
        />
      )}
    </Screen>
  );
};

export default ControlEntryFormScreen;
