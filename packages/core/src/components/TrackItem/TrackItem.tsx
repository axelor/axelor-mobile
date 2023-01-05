import React, {useCallback, useMemo} from 'react';
import {Icon, Text} from '@axelor/aos-mobile-ui';
import {isDate, isDateTime} from '../../utils/date';
import useTranslator from '../../i18n/hooks/use-translator';
import {formatDate, formatDateTime} from '../../utils/formatters';
import {StyleSheet} from 'react-native';

export const formatDateItem = (date, I18n) => {
  return isDateTime(date)
    ? formatDateTime(date, I18n.t('Base_DateTimeFormat'))
    : formatDate(date, I18n.t('Base_DateFormat'));
};

const TrackItem = ({title, oldDisplayValue, oldValue, displayValue, value}) => {
  const I18n = useTranslator();

  const values = useMemo(() => {
    return {
      oldValue: oldDisplayValue || oldValue,
      value: displayValue || value,
    };
  }, [oldDisplayValue, oldValue, displayValue, value]);

  const parseDate = useCallback(
    (item: string): string => {
      return isDate(item) ? formatDateItem(item, I18n) : item;
    },
    [I18n],
  );

  return (
    <Text style={styles.listItem}>
      <Text style={styles.itemTitle}>{`${title}: `}</Text>
      <Text style={styles.itemValue}>
        {parseDate(values.oldValue)}
        {values.oldValue && (
          <Icon
            name="long-arrow-right"
            size={10}
            FontAwesome5={false}
            style={styles.arrowIcon}
          />
        )}
        {parseDate(values.value)}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    paddingHorizontal: 5,
  },
  listItem: {
    flexDirection: 'row',
    fontSize: 13,
  },
  itemTitle: {
    fontWeight: 'bold',
  },

  itemValue: {
    textAlign: 'justify',
  },
});

export default TrackItem;
