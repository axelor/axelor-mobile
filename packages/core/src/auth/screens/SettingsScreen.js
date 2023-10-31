/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  SwitchCard,
  useConfig,
  useTheme,
  Text,
  Dashboard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslator} from '../../i18n';
import {
  disable,
  enable,
  useEffectOnline,
  useOnline,
} from '../../features/onlineSlice';
import {ApiProviderConfig} from '../../apiProviders/config';
import {TranslationsButton} from '../components';

const SettingsScreen = ({children}) => {
  const I18n = useTranslator();
  const Theme = useTheme();
  const online = useOnline();
  const dispatch = useDispatch();

  const {
    showFilter,
    hideVirtualKeyboard,
    toggleFilterConfig,
    toggleVirtualKeyboardConfig,
    setShowSubtitles,
    showSubtitles,
  } = useConfig();

  const {baseUrl} = useSelector(state => state.auth);

  const handleToggleConnection = useCallback(
    state => {
      if (!state) {
        dispatch(enable());
      } else {
        dispatch(disable());
      }
    },
    [dispatch],
  );

  useEffectOnline();

  const handleToggleColorBlind = useCallback(
    state => {
      if (state) {
        Theme.activateColorBlind();
      } else {
        Theme.desactivateColorBlind();
      }
    },
    [Theme],
  );

  const handleToggleSubtitles = useCallback(
    state => {
      setShowSubtitles(state);
    },
    [setShowSubtitles],
  );

  return (
    <Screen>
      <Dashboard
        ligne={[
          {
            graph: [
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
              {
                type: 'line',
                dataList: [
                  [
                    {value: 25, label: 'Draft', color: '#ff0000'},
                    {value: 3, label: 'Waiting'},
                    {value: 1, label: 'Validate'},
                    {value: 1, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'e'},
                  ],
                  [
                    {value: 15, label: 'Draft'},
                    {value: 3, label: 'Waiting'},
                    {value: 2, label: 'Validate'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Refused'},
                    {value: 4, color: '#ff0000', label: 'Baw'},
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'test',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'aaa',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'aaa',
                    },
                  ],
                ],
              },
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'bar',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'ddd',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
            ],
          },
          {
            graph: [
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
              {
                type: 'pie',
                dataList: [
                  [
                    {
                      value: 25,
                      color: '#FFDF00',
                      label: 'Draft',
                    },
                    {
                      value: 3,
                      color: '#ffa500',
                      label: 'Waiting',
                    },
                    {
                      value: 1,
                      color: '#008000',
                      label: 'Validate',
                    },
                    {
                      value: 1,
                      color: '#ff0000',
                      label: 'Refused',
                    },
                  ],
                ],
              },
            ],
          },
        ]}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  container: {
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SettingsScreen;
