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

import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '@axelor/aos-mobile-ui';
import {HeaderBand} from '../../molecules';
import {useHeaderBand, HeaderBandHelper} from '../../../header';

interface HeaderBandItem {
  key: string;
  color: Color;
  text: string;
  showIf: boolean;
  order?: number;
}

const HeaderBandList = () => {
  const {allBands} = useHeaderBand();

  const filteredBands = useMemo(
    () => HeaderBandHelper.filterBands(allBands),
    [allBands],
  );

  return (
    <SafeAreaView>
      {filteredBands.map((item: HeaderBandItem) => (
        <HeaderBand
          key={item.key}
          color={item.color}
          text={item.text}
          showIf={item.showIf}
        />
      ))}
    </SafeAreaView>
  );
};

export default HeaderBandList;
