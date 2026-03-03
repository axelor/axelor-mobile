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
import {Button} from '@axelor/aos-mobile-ui';
import {linkingProvider, useSelector} from '@axelor/aos-mobile-core';
import {searchTourLineApi} from '../../../api';

const TourItineraryButton = ({}) => {
  const isMounted = useRef(true);

  const {tour} = useSelector((state: any) => state.tour);

  const [adressList, setAdressList] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    searchTourLineApi({
      tourId: tour?.id,
      numberElementsByPage: null,
      isValidated: false,
    })
      .then(response => {
        if (isMounted.current) {
          if (Array.isArray(response?.data?.data)) {
            const tourLineList: any[] = response.data.data.map(line => ({
              address: line?.address?.fullName,
            }));

            setAdressList(tourLineList);
          } else {
            setAdressList([]);
          }
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setAdressList([]);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [tour]);

  return (
    <Button
      style={styles.button}
      isNeutralBackground={true}
      iconName="map"
      width={40}
      iconSize={20}
      onPress={() => {
        linkingProvider.openGoogleMapsDirections(adressList);
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderWidth: 1,
  },
});

export default TourItineraryButton;
