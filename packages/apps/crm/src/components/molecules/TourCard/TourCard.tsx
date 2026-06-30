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
import {StyleSheet} from 'react-native';
import {ProgressBar, ObjectCard} from '@axelor/aos-mobile-ui';
import {useTranslator, DateDisplay} from '@axelor/aos-mobile-core';
import {searchTourLineApi} from '../../../api';

interface TourCardProps {
  style?: any;
  onPress?: () => void;
  tour: any;
}

const TourCard = ({style, onPress, tour}: TourCardProps) => {
  const I18n = useTranslator();

  const isMounted = useRef(true);

  const [numberTourLineValidated, setNumberTourLineValidated] =
    useState<number>(0);
  const [totalTourLine, setTotalTourLine] = useState<number>(0);

  useEffect(() => {
    isMounted.current = true;

    searchTourLineApi({tourId: tour?.id, numberElementsByPage: null as any})
      .then(response => {
        if (isMounted.current) {
          if (Array.isArray(response?.data?.data)) {
            const tourLineList: any[] = response.data.data;
            const total = tourLineList.length;
            const notValidated = tourLineList.filter(
              line => line.isValidated,
            ).length;

            setNumberTourLineValidated(notValidated);
            setTotalTourLine(total);
          } else {
            setNumberTourLineValidated(0);
          }
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setNumberTourLineValidated(0);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [tour]);

  return (
    <ObjectCard
      style={style}
      showArrow={false}
      touchable
      onPress={onPress}
      leftContainerFlex={2}
      upperTexts={{
        items: [
          {displayText: tour.name, isTitle: true},
          {
            iconName: 'person-fill',
            displayText: tour.salespersonUser?.fullName,
          },
          {
            displayText: I18n.t('Crm_ScheduledVisits', {totalTourLine}),
          },
        ],
      }}
      sideBadges={{
        style: styles.badgeContainer,
        items: [
          {
            customComponent: <DateDisplay date={tour.date} size={15} />,
          },
          {
            customComponent: (
              <ProgressBar
                value={numberTourLineValidated}
                total={totalTourLine}
                showPercent={false}
                height={15}
                styleTxt={styles.textProgressBar}
              />
            ),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    gap: 4,
    alignItems: 'flex-end',
  },
  textProgressBar: {
    display: 'none',
  },
});

export default TourCard;
