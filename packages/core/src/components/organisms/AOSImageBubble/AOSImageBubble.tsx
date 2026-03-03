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

import React from 'react';
import {ImageBubble} from '@axelor/aos-mobile-ui';
import {useSelector} from 'react-redux';

interface AOSImageBubbleProps {
  imageSize?: number;
  style?: any;
  metaFileId: number;
  defaultIconSize?: number;
  listComponent?: any;
}

const AOSImageBubble = ({
  imageSize,
  style,
  metaFileId,
  defaultIconSize = 60,
  listComponent = [],
}: AOSImageBubbleProps) => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return (
    <ImageBubble
      style={style}
      source={
        metaFileId
          ? {
              uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${metaFileId}/content/download`,
            }
          : null
      }
      listComponent={listComponent}
      imageSize={imageSize}
      defaultIconSize={defaultIconSize}
    />
  );
};

export default AOSImageBubble;
