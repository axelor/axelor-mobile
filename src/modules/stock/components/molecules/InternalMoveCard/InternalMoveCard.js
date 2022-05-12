import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '@/modules/stock/utils/format-date';

const getStatusColor = status => {
  if (status === 'Draft') {
    return {
      backgroundColor: 'rgba(206, 206, 206, 0.6)',
      borderColor: 'rgba(206, 206, 206, 1)',
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
          <View style={styles.rightContainer}>
            <View style={styles.badgeContainer}>
              <Badge
                style={[styles.statusBadge, getStatusColor(status)]}
                title={status}
              />
              {availability == null ? null : (
                <Badge
                  style={[
                    styles.statusBadge,
                    getAvailabilityColor(availability),
                  ]}
                  title={availability}
                />
              )}
            </View>
            <Icon size={24} name="chevron-right" color="#e6e6e6" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  content: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '50%',
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
  },
});

export default InternalMoveCard;
