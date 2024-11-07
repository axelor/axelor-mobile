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
import {TagList} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../../forms/types';
import {fetchData} from '../../../../forms/studio/api.helpers';

interface props extends customComponentOptions {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value: any) => void;
  required?: boolean;
  readonly?: boolean;
  targetModel?: string;
}

const CustomTagList = ({defaultValue, title, targetModel}: props) => {
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    const fetchTagsData = async () => {
      const criteria = Array.isArray(defaultValue)
        ? [
            {
              fieldName: 'id',
              operator: 'in',
              value: defaultValue.map(item => item.id),
            },
          ]
        : defaultValue?.id
          ? [
              {
                fieldName: 'id',
                operator: '=',
                value: defaultValue.id,
              },
            ]
          : [];

      if (criteria.length > 0 && targetModel) {
        try {
          const fetchedData = await fetchData({
            modelName: targetModel,
            criteria,
            searchFields: ['fullName', 'name'],
          });
          setTagsData(fetchedData);
        } catch (error) {
          setTagsData([]);
        }
      }
    };

    fetchTagsData();
  }, [targetModel, defaultValue]);

  const tags = useMemo(() => {
    return tagsData.map(item => ({
      title: item.fullName || item.name || null,
    }));
  }, [tagsData]);

  return <TagList tags={tags} title={title} />;
};

export default CustomTagList;
