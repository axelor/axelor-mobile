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

import React, {useEffect, useRef, useState} from 'react';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {validateTour} from '../../../features/tourSlice';
import {searchTourLineApi} from '../../../api';

const TourValidateButton = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const isMounted = useRef(true);

  const {tour} = useSelector((state: any) => state.tour);

  const [numberUnValidated, setNumberUnValidated] = useState<number>(0);

  useEffect(() => {
    isMounted.current = true;

    searchTourLineApi({
      tourId: tour?.id,
      isValidated: false,
      numberElementsByPage: 1,
    })
      .then(({data}) => {
        if (isMounted.current) {
          setNumberUnValidated(data?.total);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setNumberUnValidated(0);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [tour]);

  if (numberUnValidated === 0) {
    return null;
  }

  return (
    <Button
      iconName="calendar-check"
      title={I18n.t('Base_Validate')}
      color={Colors.successColor}
      onPress={() => {
        dispatch(
          (validateTour as any)({
            tourId: tour?.id,
          }),
        );
      }}
    />
  );
};

export default TourValidateButton;
