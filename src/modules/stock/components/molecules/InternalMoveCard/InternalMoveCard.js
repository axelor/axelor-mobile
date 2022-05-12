import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '@/modules/stock/utils/format-date';

const getStatusColor = status => {
  if (status === 'Draft') {
    return {
      backgroundColor: '#84DCB7',
      borderColor: '#84DCB7',
    };
  } else if (status === 'Planned') {
    return {
      backgroundColor: 'rgba(181, 161, 223, 0.6)',
      borderColor: '#B5A1DF',
    };
  } else if (status === 'Realized') {
    return {
      backgroundColor: '#84DCB7',
      borderColor: '#3ECF8E',
    };
  } else if (status === 'Canceled') {
    return {
      backgroundColor: 'rgba(229, 77, 29, 0.6)',
      borderColor: 'rgba(206, 206, 206, 1)',
    };
  }
};

const getAvailabilityColor = availability => {
  if (availability === 'Available') {
    return {
      backgroundColor: '#84DCB7',
      borderColor: '#3ECF8E',
    };
  } else if (availability === 'Partially') {
    return {
      backgroundColor: 'rgba(243, 151, 66, 0.6)',
      borderColor: '#F39743',
    };
  } else if (availability === 'Unavailable') {
    return {
      backgroundColor: 'rgba(229, 77, 29, 0.6)',
      borderColor: '#E54D1D',
    };
  }
};

const InternalMoveCard = ({
  style,
  name,
  status,
  availability,
  fromStockLocation,
  toStockLocation,
  origin,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.txtImportant}>{name}</Text>
            <Text style={styles.txtDetails}>{fromStockLocation}</Text>
            <Text style={styles.txtDetails}>{toStockLocation}</Text>
            {origin == null ? null : (
              <Text style={styles.txtDetails}>{origin}</Text>
            )}
            {status == 'Planned' ? (
              <Text style={[styles.txtDetails, styles.creationDate]}>
                Created on {formatDate(date, 'DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={styles.txtDetails}>
                Validated on {formatDate(date, 'DD/MM/YYYY')}
              </Text>
            )}
          </View>
          <View style={styles.badgeContainer}>
            <Badge
              style={[styles.statusBadge, getStatusColor(status)]}
              title={status}
            />
            {availability == null ? null : (
              <Badge
                style={[styles.statusBadge, getAvailabilityColor(availability)]}
                title={availability}
              />
            )}
          </View>
        </View>
        <Icon size={24} name="chevron-right" color="#e6e6e6" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#efefef',
    marginRight: 32,
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  creationDate: {
    fontStyle: 'italic',
  },
  statusBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 15,
    width: 87,
    height: 22,
    borderWidth: 1.5,
    marginBottom: 2,
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 3,
  },
});

export default InternalMoveCard;
