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
import {TagList} from '@axelor/aos-mobile-ui';
import {customComponentOptions, fetchData} from '../../../../forms';

interface props extends customComponentOptions {
  targetModel?: string;
}

const CustomTagList = ({style, title, defaultValue, targetModel}: props) => {
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    const fetchTagsData = async () => {
      if (targetModel && defaultValue != null) {
        fetchData({
          modelName: targetModel,
          criteria: [
            {
              fieldName: 'id',
              operator: 'in',
              value: defaultValue.map(({id}) => id),
            },
          ],
          searchFields: ['fullName', 'name'],
        })
          .then(setTagsData)
          .catch(() => setTagsData([]));
      }
    };

    fetchTagsData();
  }, [targetModel, defaultValue]);

  const tags = useMemo(() => {
    return tagsData.map(item => ({
      title: item.fullName || item.name || null,
    }));
  }, [tagsData]);

  return <TagList style={style} tags={tags} title={title} />;
};

export default CustomTagList;
