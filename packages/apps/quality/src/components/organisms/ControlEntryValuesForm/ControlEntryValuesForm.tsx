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

import React, {useEffect, useMemo, useState} from 'react';
import {
  Action,
  Field,
  FormView,
  formConfigsProvider,
  JSONObject,
  showToastMessage,
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  searchCharacteristicPropertyApi,
  searchControlTypeFieldApi,
  searchEntryValueApi,
  searchPlanValueApi,
} from '../../../api';
import {updateControlEntrySampleLineValues} from '../../../features/controlEntrySampleLineSlice';
import {
  getFormDefaults,
  getFormFields,
  mapFormToEntryValues,
  SelectionItem,
} from './control-entry-values.helpers';
import {
  CharacteristicProperty,
  ControlEntry as ControlEntryType,
  ControlEntrySampleLine,
  ControlTypeField,
  ControlTypeFieldDefinition,
  ControlTypeFieldValue,
  SampleLineControlResult,
} from '../../../types';

const MODEL = 'com.axelor.apps.quality.db.ControlEntryPlanLine';
const FORM_KEY = 'quality_controlEntryValues-form';

interface ControlEntryValuesFormProps {
  sampleLineId: number;
  readonly?: boolean;
  navigationButtons: React.ReactElement;
  onValidate: () => void;
}

const ControlEntryValuesForm = ({
  sampleLineId,
  readonly = false,
  navigationButtons,
  onValidate,
}: ControlEntryValuesFormProps) => {
  const I18n = useTranslator();
  const dispatch: any = useDispatch();
  const {ControlEntrySample} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const {sampleLine: _storeSampleLine} = useSelector(
    state => state.controlEntrySampleLine,
  );

  const [entryValues, setEntryValues] = useState<ControlTypeFieldValue[]>([]);
  const [planValues, setPlanValues] = useState<ControlTypeFieldValue[]>([]);
  const [selectionOfField, setSelectionOfField] = useState<
    Map<number, SelectionItem[]>
  >(new Map());

  const sampleLine: ControlEntrySampleLine = useMemo(
    () => (_storeSampleLine?.id === sampleLineId ? _storeSampleLine : null),
    [_storeSampleLine, sampleLineId],
  );

  useEffect(() => {
    searchEntryValueApi({entryLineId: sampleLineId})
      .then(({data}) => setEntryValues(data?.data ?? []))
      .catch(() => setEntryValues([]));
  }, [sampleLineId]);

  useEffect(() => {
    const controlPlanLineId = sampleLine?.controlPlanLine?.id;

    if (!controlPlanLineId) return setPlanValues([]);

    searchPlanValueApi({planLineId: controlPlanLineId})
      .then(({data}) => setPlanValues(data?.data ?? []))
      .catch(() => setPlanValues([]));
  }, [sampleLine?.controlPlanLine?.id]);

  useEffect(() => {
    const fieldIds = entryValues
      .filter(
        _value =>
          _value.fieldTypeSelect === ControlTypeField.fieldType.Selection,
      )
      .map(_value => _value.controlTypeField?.id)
      .filter(_id => _id != null);

    if (fieldIds.length === 0) return setSelectionOfField(new Map());

    searchControlTypeFieldApi({ids: fieldIds})
      .then(({data}) => {
        const _fields: ControlTypeFieldDefinition[] = data?.data ?? [];
        const propertyIds = _fields
          .flatMap(_field => _field.valueSet ?? [])
          .map(_property => _property.id);

        if (propertyIds.length === 0) return setSelectionOfField(new Map());

        return searchCharacteristicPropertyApi({ids: propertyIds}).then(
          ({data: propertyData}) => {
            const properties: CharacteristicProperty[] =
              propertyData?.data ?? [];
            const nameOfId = new Map<number, string>(
              properties.map(_property => [_property.id, _property.name ?? '']),
            );

            setSelectionOfField(
              new Map(
                _fields.map(_field => [
                  _field.id,
                  (_field.valueSet ?? []).map(_property => ({
                    title: nameOfId.get(_property.id) ?? '',
                    value: _property.id,
                  })),
                ]),
              ),
            );
          },
        );
      })
      .catch(() => setSelectionOfField(new Map()));
  }, [entryValues]);

  const fields: JSONObject<Field> = useMemo(
    () =>
      getFormFields({
        entryValues,
        selectionOfField,
        formulaDescription: sampleLine?.controlType?.formulaDescription,
        planValues,
      }),
    [
      entryValues,
      planValues,
      sampleLine?.controlType?.formulaDescription,
      selectionOfField,
    ],
  );

  const defaults = useMemo(() => getFormDefaults(entryValues), [entryValues]);

  const formKey = useMemo(() => `${FORM_KEY}_${readonly}`, [readonly]);

  useEffect(() => {
    formConfigsProvider.registerForm(
      formKey,
      {readonlyIf: () => readonly, fields, modelName: MODEL},
      {replaceOld: true},
    );
  }, [fields, formKey, readonly]);

  const actions: Action[] = useMemo(
    () => [
      {
        key: 'controlEntryValues-save',
        type: 'custom',
        customComponent: navigationButtons,
        customAction: ({objectState}) => {
          dispatch(
            (updateControlEntrySampleLineValues as any)({
              sampleLineId,
              version: sampleLine?.version,
              entryValueList: mapFormToEntryValues(entryValues, objectState),
            }),
          ).then(({payload}: {payload: SampleLineControlResult}) => {
            if (payload == null) return;

            showToastMessage({
              type: ControlEntryType.getSampleResultType(payload.resultSelect),
              position: 'bottom',
              bottomOffset: 80,
              text1: I18n.t('Quality_ConformityResult'),
              text2: getItemTitle(
                ControlEntrySample?.resultSelect,
                payload.resultSelect,
              ),
            });

            onValidate();
          });
        },
      },
    ],
    [
      ControlEntrySample?.resultSelect,
      I18n,
      dispatch,
      entryValues,
      getItemTitle,
      navigationButtons,
      onValidate,
      sampleLine?.version,
      sampleLineId,
    ],
  );

  return (
    <FormView
      actions={actions}
      formKey={formKey}
      defaultValue={defaults}
      floatingTools={false}
      isCustom
    />
  );
};

export default ControlEntryValuesForm;
