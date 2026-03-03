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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  enableCamera,
  handleDocumentSelection,
  uploadBase64,
  showToastMessage,
  useCameraValueByKey,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {
  createEquipmentPicture,
  deleteEquipmentPicture,
  searchEquipmentPicture,
} from '../../features/equipmentPictureSlice';
import {EquipmentDetailsHeader, PicturesRow} from '../../components';

const cameraKey = 'equipment_createPicture';

const EquipmentPictureScreen = ({}) => {
  const photo = useCameraValueByKey(cameraKey);
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Equipment',
  });
  const {canCreate, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Picture',
  });

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);
  const {equipment} = useSelector((state: any) => state.intervention_equipment);
  const {equipmentPictureList, loadingList, moreLoading, isListEnd} =
    useSelector((state: any) => state.intervention_equipmentPicture);

  const [selectedImageId, setSelectedImageId] = useState(null);

  const fetchEquipmentPictureAPI = useCallback(
    (page = 0) => {
      dispatch(
        (searchEquipmentPicture as any)({equipmentId: equipment?.id, page}),
      );
    },
    [dispatch, equipment.id],
  );

  const pairedEquipmentPictureList = useMemo(() => {
    const pairedData = [];

    if (Array.isArray(equipmentPictureList)) {
      for (let i = 0; i < equipmentPictureList.length; i += 2) {
        pairedData.push({
          item1: equipmentPictureList?.[i],
          item2: equipmentPictureList?.[i + 1],
        });
      }
    }

    return pairedData;
  }, [equipmentPictureList]);

  const handleDeletePicture = useCallback(
    (pictureId: number) => {
      dispatch(
        (deleteEquipmentPicture as any)({
          equipmentId: equipment.id,
          version: equipment.version,
          pictureId,
        }),
      );
    },
    [dispatch, equipment],
  );

  const handleUpload = useCallback(
    async (file: any) => {
      try {
        const metaFile = await uploadBase64(file, {
          baseUrl,
          token,
          jsessionId,
        });

        dispatch(
          (createEquipmentPicture as any)({
            equipmentId: equipment.id,
            version: equipment.version,
            metaFileId: metaFile.id,
          }),
        );
      } catch (error) {
        showToastMessage({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: `Could not upload the file.\n${error}`,
          onPress: () => {},
        });
      }
    },
    [baseUrl, dispatch, equipment, jsessionId, token],
  );

  useEffect(() => {
    if (photo) {
      handleUpload(photo);
    }
  }, [handleUpload, photo]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<EquipmentDetailsHeader />}
      />
      <ScrollList
        actionList={
          readonly || !canCreate
            ? []
            : [
                {
                  iconName: 'plus-lg',
                  title: I18n.t('Intervention_ChoosePhoto'),
                  onPress: () => {
                    handleDocumentSelection(handleUpload);
                  },
                },
                {
                  iconName: 'camera-fill',
                  title: I18n.t('Intervention_TakePicture'),
                  onPress: () => {
                    dispatch((enableCamera as any)(cameraKey));
                  },
                },
              ]
        }
        loadingList={loadingList}
        data={pairedEquipmentPictureList}
        renderItem={({item}) => (
          <PicturesRow
            item={item}
            handleDelete={handleDeletePicture}
            selectedImageId={selectedImageId}
            onSelectImage={itemId =>
              canDelete
                ? setSelectedImageId(itemId !== selectedImageId ? itemId : null)
                : null
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
