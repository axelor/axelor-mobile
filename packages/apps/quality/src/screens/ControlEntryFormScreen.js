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
import {
  searchControlEntrySampleLine,
  searchControlEntrySampleLineByCharacteristic,
} from '../features/controlEntrySampleLineSlice';
import {fetchControlPlanById} from '../features/controlPlanSlice';

const MODE = {
  bySample: '1',
  byCharacteristic: '2',
};

const ControlEntryFormScreen = ({route}) => {
  const {controlEntryId, selectedMode} = route.params;

  const dispatch = useDispatch();

  const {controlEntrySampleList} = useSelector(
    state => state.controlEntrySample,
  );
  const {controlEntrySampleLineList, controlEntrySampleLineByCharacteristic} =
    useSelector(state => state.controlEntrySampleLine);
  const {controlEntry} = useSelector(state => state.controlEntry);
  const {controlPlan} = useSelector(state => state.controlPlan);

  const [currentIndexSample, setCurrentIndexSample] = useState(1);
  const [currentSample, setCurrentSample] = useState([]);
  const [currentCharacteristic, setCurrentCharacteristic] = useState(null);
  const [currentIndexCharacteristic, setCurrentIndexCharacteristic] =
    useState(1);
  const [isLastCharacteristic, setIsLastCharacteristic] = useState(false);
  const [isFirstCharacteristic, setIsFirstCharacteristic] = useState(false);

  const [currentControlPLan, setCurrentControlPLan] = useState(null);
  const [currentControlPLanIndex, setCurrentControlPLanIndex] = useState(1);

  const [currentSampleLine, setCurrentSampleLine] = useState(null);
  const [currentSampleLineIndex, setCurrentSampleLineIndex] = useState(1);

  const [isLastSampleLine, setIsLastSampleLine] = useState(false);
  const [isFirstSampleLine, setIsFirstSampleLine] = useState(false);

  // MODE CARACT FETCH DES CONTROLPLAN liste stocké dans controlPlan.controlPlanLinesSet
  useEffect(() => {
    if (selectedMode === MODE.byCharacteristic) {
      dispatch(
        fetchControlPlanById({controlPlanId: controlEntry?.controlPlan?.id}),
      );
    }
  }, [controlEntry?.controlPlan?.id, dispatch, selectedMode]);

  // MODE CARACT set du currentControl Plan en fonction de son Index par default 1
  useEffect(() => {
    if (selectedMode === MODE.byCharacteristic) {
      if (Array.isArray(controlPlan?.controlPlanLinesSet)) {
        setCurrentControlPLan(
          controlPlan?.controlPlanLinesSet[currentControlPLanIndex - 1],
        );
      }
    }
  }, [controlPlan?.controlPlanLinesSet, currentControlPLanIndex, selectedMode]);

  // MODE CARACT fetch des lignes sample par currentControlPlan stocké dans controlEntrySampleLineByCharacteristic
  useEffect(() => {
    if (selectedMode === MODE.byCharacteristic) {
      const idListSample = controlEntrySampleList.map(elt => elt.id);
      dispatch(
        searchControlEntrySampleLineByCharacteristic({
          characteristicId: currentControlPLan?.id,
          idListSample: idListSample,
          page: 0,
        }),
      );
    }
  }, [controlEntrySampleList, currentControlPLan?.id, dispatch, selectedMode]);

  // MODE CARACT set du currentSampleLine  en fonction de son Index par default 1
  useEffect(() => {
    if (controlEntrySampleLineByCharacteristic?.length > 0) {
      setCurrentSampleLine(
        controlEntrySampleLineByCharacteristic[currentSampleLineIndex - 1],
      );
    }
  }, [controlEntrySampleLineByCharacteristic, currentSampleLineIndex]);

  // MODE CARACT NEXBUTTON CONTROL PLAN
  const handleNextControlPlan = () => {
    if (currentControlPLanIndex !== controlPlan.controlPlanLinesSet.length) {
      setCurrentSampleLineIndex(1);
    }
    if (currentControlPLanIndex <= controlPlan.controlPlanLinesSet.length - 1) {
      setCurrentControlPLanIndex(currentControlPLanIndex + 1);
    }
  };

  // MODE CARACT PREVBUTTON CONTROL PLAN
  const handlePrevControlPLan = () => {
    setCurrentSampleLineIndex(1);
    if (currentControlPLanIndex > 1) {
      setCurrentControlPLanIndex(currentControlPLanIndex - 1);
    }
  };

  // MODE CARACT NEXT SAMPLE LINE
  const handleNextSampleLine = () => {
    if (
      currentSampleLineIndex <=
      controlEntrySampleLineByCharacteristic?.length - 1
    ) {
      setCurrentSampleLineIndex(currentSampleLineIndex + 1);
    } else {
      setIsLastSampleLine(true);
    }
  };

  // MODE CARACT Prev SAMPLE LINE
  const handlePrevSampleLine = () => {
    if (currentSampleLineIndex > 1) {
      setCurrentSampleLineIndex(currentSampleLineIndex - 1);
    } else {
      setIsLastSampleLine(true);
    }
  };
  // MODE CARACT Manage isLast item sample line
  useEffect(() => {
    if (
      currentSampleLineIndex === controlEntrySampleLineByCharacteristic?.length
    ) {
      setIsLastSampleLine(true);
    } else {
      setIsLastSampleLine(false);
    }
    if (currentSampleLineIndex === 1) {
      setIsFirstSampleLine(true);
    } else {
      setIsFirstSampleLine(false);
    }
  }, [controlEntrySampleLineByCharacteristic?.length, currentSampleLineIndex]);

  //MODE SAMPLE mis à jour du current sample en fonction de son index
  useEffect(() => {
    setCurrentSample(
      controlEntry?.controlEntrySamplesList[currentIndexSample - 1],
    );
  }, [controlEntry?.controlEntrySamplesList, currentIndexSample]);

  //MODE SAMPLE fetch des sample line en fonction des samples
  useEffect(() => {
    dispatch(
      searchControlEntrySampleLine({controlEntrySampleId: currentSample?.id}),
    );
  }, [currentSample?.id, dispatch]);

  //MODE SAMPLE set le cuurentSampleLine en fonction de son index
  useEffect(() => {
    if (controlEntrySampleLineList?.length > 0) {
      setCurrentCharacteristic(
        controlEntrySampleLineList[currentIndexCharacteristic - 1],
      );
    }
  }, [controlEntrySampleLineList, currentIndexCharacteristic]);

  //MODE SAMPLE set des firsts et last items
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
    currentIndexSample,
  ]);

  const handleNextSample = () => {
    if (currentIndexSample !== controlEntry?.controlEntrySamplesList.length) {
      setCurrentIndexCharacteristic(1);
    }
    if (
      currentIndexSample <=
      controlEntry?.controlEntrySamplesList.length - 1
    ) {
      setCurrentIndexSample(currentIndexSample + 1);
    }
  };

  const handlePrevSample = () => {
    setCurrentIndexCharacteristic(1);
    if (currentIndexSample > 1) {
      setCurrentIndexSample(currentIndexSample - 1);
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
          mode={selectedMode}
          handleNextControlPlan={handleNextControlPlan}
          handlePrevControlPLan={handlePrevControlPLan}
          handleNextSampleLine={handleNextSampleLine}
          handlePrevSampleLine={handlePrevSampleLine}
          isLastSampleLine={isLastSampleLine}
          isFirstSampleLine={isFirstSampleLine}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ControlEntryFormHeader
            mode={selectedMode}
            currentIndexSample={currentIndexSample}
            controlEntryId={controlEntryId}
            currentIndexCharacteristic={currentIndexCharacteristic}
            currentControlPLanIndex={currentControlPLanIndex}
            currentSampleLineIndex={currentSampleLineIndex}
          />
        }
      />
      {((selectedMode === MODE.bySample && currentCharacteristic != null) ||
        (selectedMode === MODE.byCharacteristic &&
          currentSampleLine?.id != null)) && (
        <CustomFieldForm
          model="com.axelor.apps.quality.db.ControlEntryPlanLine"
          modelId={
            selectedMode === MODE.bySample
              ? currentCharacteristic?.id
              : currentSampleLine?.id
          }
        />
      )}
    </Screen>
  );
};

export default ControlEntryFormScreen;
