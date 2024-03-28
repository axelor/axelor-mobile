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
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  enableCamera,
  handleDocumentSelection,
} from '@axelor/aos-mobile-core';
import EquipmentDetailsHeader from '../../components/molecules/EquipmentDetailsHeader/EquipmentDetailsHeader';
import {searchEquipmentPicture} from '../../features/equipmentPictureSlice';
import {PicturesCard} from '../../components';

const cameraKey = 'equipment_pictures';

const EquipmentPictureScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {equipment} = useSelector((state: any) => state.intervention_equipment);
  const {equipmentPictureList, loadingList, moreLoading, isListEnd} =
    useSelector((state: any) => state.intervention_equipmentPicture);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const handleSelectImage = id => {
    setSelectedImageId(id);
  };

  const fetchEquipmentPictureAPI = useCallback(
    (page = 0) => {
      dispatch(
        (searchEquipmentPicture as any)({equipmentId: equipment?.id, page}),
      );
    },
    [dispatch, equipment.id],
  );

  const prepareImageData = pictures => {
    const pairedData = [];
    for (let i = 0; i < pictures.length; i += 2) {
      pairedData.push({
        item1: pictures[i],
        item2: pictures[i + 1] ? pictures[i + 1] : null,
      });
    }
    return pairedData;
  };

  const pairedEquipmentPictureList = useMemo(() => {
    return prepareImageData(equipmentPictureList);
  }, [equipmentPictureList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<EquipmentDetailsHeader />}
      />
      <ScrollList
        actionList={[
          {
            iconName: 'plus-lg',
            title: I18n.t('Intervention_ChoosePhoto'),
            onPress: () => {
              handleDocumentSelection(file => console.log(file));
            },
          },
          {
            iconName: 'camera-fill',
            title: I18n.t('Intervention_TakePicture'),
            onPress: () => {
              dispatch((enableCamera as any)(cameraKey));
            },
          },
        ]}
        loadingList={loadingList}
        data={pairedEquipmentPictureList}
        renderItem={({item}) => (
          <PicturesCard
            item={item}
            onPressClose={() => {}}
            selectedImageId={selectedImageId}
            onSelectImage={itemId =>
              handleSelectImage(itemId !== selectedImageId ? itemId : null)
            }
          />
        )}
        fetchData={fetchEquipmentPictureAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default EquipmentPictureScreen;
