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

import React, {useEffect, useMemo, useState} from 'react';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  CustomFieldForm,
  useSelector,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ControlEntryFormButtons, ControlEntryFormHeader} from '../components';
import {searchControlEntrySampleLineOfControlEntry} from '../features/controlEntrySampleLineSlice';
import {fetchControlPlanById} from '../features/controlPlanSlice';

const MODE = {
  bySample: '1',
  byCharacteristic: '2',
};

const ControlEntryFormScreen = ({route}) => {
  const {selectedMode} = route.params;

  const dispatch = useDispatch();

  const {controlEntrySampleList} = useSelector(
    state => state.controlEntrySample,
  );
  const {sampleLineOfEntryList} = useSelector(
    state => state.controlEntrySampleLine,
  );
  const {controlEntry} = useSelector(state => state.controlEntry);
  const {controlPlan} = useSelector(state => state.controlPlan);

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemSet, setItemSet] = useState([]);
  const [categorySet, setCategorySet] = useState([]);

  useEffect(() => {
    dispatch(fetchControlPlanById({id: controlEntry.controlPlan?.id}));
    dispatch(
      searchControlEntrySampleLineOfControlEntry({
        controlEntryId: controlEntry.id,
      }),
    );
  }, [
    controlEntry?.controlPlan?.id,
    controlEntry?.id,
    controlEntrySampleList,
    dispatch,
  ]);

  useEffect(() => {
    if (Array.isArray(sampleLineOfEntryList)) {
      const _itemSet = sampleLineOfEntryList
        .map(
          _item =>
            _item[
              selectedMode === MODE.bySample // Should be done in type file
                ? 'controlEntrySample'
                : 'controlPlanLine'
            ].id,
        )
        .filter((_item, _index, self) => self.indexOf(_item) === _index);
      setCategoryIndex(0);
      setCategorySet(_itemSet);
    } else {
      setCategorySet([]);
    }
  }, [sampleLineOfEntryList, selectedMode]);

  useEffect(() => {
    if (
      Array.isArray(sampleLineOfEntryList) &&
      categorySet?.[categoryIndex] != null
    ) {
      const _itemSet = sampleLineOfEntryList.filter(
        _item =>
          _item[
            selectedMode === MODE.bySample // Should be done in type file
              ? 'controlEntrySample'
              : 'controlPlanLine'
          ].id === categorySet?.[categoryIndex],
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

    if (selectedMode === MODE.bySample) {
      return {nbItemInCategory: nbCharacteristic, nbCategories: nbSample};
    } else if (selectedMode === MODE.byCharacteristic) {
      return {nbItemInCategory: nbSample, nbCategories: nbCharacteristic};
    } else {
      return {nbItemInCategory: 0, nbCategories: 0};
    }
  }, [
    controlEntry?.controlEntrySamplesList?.length,
    controlPlan?.controlPlanLinesList?.length,
    selectedMode,
  ]);

  const isLastItem = useMemo(
    () => currentIndex % nbItemInCategory === 0,
    [currentIndex, nbItemInCategory],
  );

  const isFirstItem = useMemo(() => currentIndex === 0, [currentIndex]);

  const handleNext = () => {
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
  };

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
              customComponent: (
                <ControlEntryFormButtons
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  mode={selectedMode}
                  isLastItem={isLastItem}
                  isFirstItem={isFirstItem}
                />
              ),
            },
          ]}
        />
      )}
    </Screen>
  );
};

export default ControlEntryFormScreen;
