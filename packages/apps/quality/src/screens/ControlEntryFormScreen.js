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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  CustomFieldForm,
  showToastMessage,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ControlEntryFormButtons, ControlEntryFormHeader} from '../components';
import {
  fetchControlEntrySampleLine,
  searchControlEntrySampleLineOfControlEntry as searchControlEntrySampleLine,
} from '../features/controlEntrySampleLineSlice';
import {fetchControlPlanById} from '../features/controlPlanSlice';
import {ControlEntry} from '../types';
import {checkComformity, getProgressValuesApi} from '../api';

const ControlEntryFormScreen = ({navigation, route}) => {
  const {selectedMode} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {controlEntry} = useSelector(state => state.controlEntry);
  const {controlPlan} = useSelector(state => state.controlPlan);
  const {sampleLine} = useSelector(state => state.controlEntrySampleLine);
  const {sampleLineOfEntryList} = useSelector(
    state => state.controlEntrySampleLine,
  );

  const [categoryIndex, setCategoryIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [itemSet, setItemSet] = useState([]);
  const [categorySet, setCategorySet] = useState([]);
  const [progressData, setProgressData] = useState({
    topProgressBar: 0,
    bottomProgressBar: 0,
  });

  const isReadonly = useMemo(
    () =>
      controlEntry.statusSelect === ControlEntry.status.Completed ||
      controlEntry.statusSelect === ControlEntry.status.Canceled,
    [controlEntry.statusSelect],
  );

  useEffect(() => {
    dispatch(fetchControlPlanById({id: controlEntry.controlPlan?.id}));
    dispatch(searchControlEntrySampleLine({controlEntryId: controlEntry.id}));
  }, [controlEntry?.controlPlan?.id, controlEntry?.id, dispatch]);

  useEffect(() => {
    if (Array.isArray(sampleLineOfEntryList)) {
      const _itemSet = sampleLineOfEntryList
        .map(
          _item =>
            _item[ControlEntry.getMethodAssociatedAttribut(selectedMode)].id,
        )
        .filter((_item, _index, self) => self.indexOf(_item) === _index);
      setCategoryIndex(0);
      setCategorySet(_itemSet);
    } else {
      setCategorySet([]);
    }
  }, [sampleLineOfEntryList, selectedMode]);

  useEffect(() => {
    fetchSampleLine(itemSet, currentIndex);
  }, [fetchSampleLine, itemSet, currentIndex]);

  const fetchSampleLine = useCallback(
    (_set, _index) => {
      if (Array.isArray(_set) && _set.length > 0) {
        dispatch(fetchControlEntrySampleLine({id: _set[_index].id}));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (
      Array.isArray(sampleLineOfEntryList) &&
      categorySet?.[categoryIndex] != null
    ) {
      const _itemSet = sampleLineOfEntryList.filter(
        _item =>
          _item[ControlEntry.getMethodAssociatedAttribut(selectedMode)].id ===
          categorySet?.[categoryIndex],
      );
      setCurrentIndex(0);
      setItemSet(_itemSet);
    } else {
      setItemSet([]);
    }
  }, [categoryIndex, categorySet, sampleLineOfEntryList, selectedMode]);

  const {nbItemInCategory, nbCategories} = useMemo(() => {
    const nbSample = controlEntry?.controlEntrySamplesList?.length;
    const nbCharacteristic = controlPlan?.controlPlanLinesList?.length;

    return ControlEntry.getMethodTotals(
      selectedMode,
      nbCharacteristic,
      nbSample,
    );
  }, [
    controlEntry?.controlEntrySamplesList?.length,
    controlPlan?.controlPlanLinesList?.length,
    selectedMode,
  ]);

  const isLastItem = useMemo(
    () => (currentIndex + 1) % nbItemInCategory === 0,
    [currentIndex, nbItemInCategory],
  );

  const isFirstItem = useMemo(() => currentIndex === 0, [currentIndex]);

  const canNext = useMemo(
    () => !isLastItem || categoryIndex + 1 !== nbCategories,
    [categoryIndex, isLastItem, nbCategories],
  );

  const handleNext = useCallback(() => {
    setCurrentIndex(_current => {
      if ((_current + 1) % nbItemInCategory === 0) {
        setCategoryIndex(_cIndex => {
          if (_cIndex !== nbCategories - 1) {
            return _cIndex + 1;
          }

          return _cIndex;
        });

        return _current;
      }

      return _current + 1;
    });
  }, [nbCategories, nbItemInCategory]);

  const handlePrevious = () => {
    setCurrentIndex(_current => {
      if (_current === 0) {
        setCategoryIndex(_cIndex => {
          if (_cIndex !== 0) {
            return _cIndex - 1;
          }

          return _cIndex;
        });

        return _current;
      }

      return _current - 1;
    });
  };

  const getValuesProgressBar = useCallback(
    param => {
      getProgressValuesApi(param)
        .then(response => {
          setProgressData({
            bottomProgressBar:
              selectedMode === ControlEntry.fillingMethod.Sample
                ? response?.data?.characteristicControlledOnSample
                : response?.data?.sampleControlledOnCharacteristic,
            topProgressBar:
              selectedMode === ControlEntry.fillingMethod.Sample
                ? response?.data?.sampleCompletelyControlled
                : response?.data?.characteristicCompletelyControlled,
          });
        })
        .catch(() =>
          setProgressData({bottomProgressBar: 0, topProgressBar: 0}),
        );
    },
    [selectedMode],
  );

  useEffect(() => {
    if (
      selectedMode === ControlEntry.fillingMethod.Sample &&
      sampleLine?.controlEntrySample?.id != null
    ) {
      getValuesProgressBar({
        controlEntryId: controlEntry?.id,
        sampleId: sampleLine?.controlEntrySample?.id,
      });
    }
    if (
      selectedMode === ControlEntry.fillingMethod.Characteristic &&
      controlPlan?.controlPlanLinesList != null
    ) {
      getValuesProgressBar({
        controlEntryId: controlEntry?.id,
        characteristicId:
          controlPlan?.controlPlanLinesList?.[categoryIndex]?.id,
      });
    }
  }, [
    categoryIndex,
    controlEntry,
    controlPlan,
    getValuesProgressBar,
    sampleLine,
    selectedMode,
  ]);

  const handleValidation = useCallback(() => {
    if (canNext) {
      handleNext();
    } else {
      navigation.pop();
    }
  }, [canNext, handleNext, navigation]);

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ControlEntryFormHeader
            mode={selectedMode}
            currentIndex={currentIndex}
            categoryIndex={categoryIndex}
            nbItemInCategory={nbItemInCategory}
            nbCategories={nbCategories}
            progressData={progressData}
          />
        }
      />
      {categorySet[categoryIndex] != null && itemSet[currentIndex] != null && (
        <CustomFieldForm
          model="com.axelor.apps.quality.db.ControlEntryPlanLine"
          fieldType="entryAttrs"
          modelId={itemSet[currentIndex].id}
          additionalActions={[
            {
              key: 'customAction',
              useDefaultAction: true,
              showToast: false,
              postActions: async res => {
                await checkComformity({object: res}).then(result => {
                  showToastMessage({
                    type: ControlEntry.getSampleResultType(result),
                    position: 'bottom',
                    bottomOffset: 80,
                    text1: `${I18n.t('Quality_ConformityResult')}`,
                    text2: ControlEntry.getSampleResultTitle(result, I18n),
                  });
                });
                handleValidation();
              },
              customComponent: (
                <ControlEntryFormButtons
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  mode={selectedMode}
                  isLastItem={isLastItem}
                  isFirstItem={isFirstItem}
                  canNext={canNext}
                  canPrevious={!isFirstItem || categoryIndex !== 0}
                />
              ),
            },
          ]}
          readonly={isReadonly}
        />
      )}
    </Screen>
  );
};

export default ControlEntryFormScreen;
