import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import File from '../../../types/file';
import {formatDate} from '../../../utils/formatters';
import {Icon, Text} from '../../atoms';

interface AttachmentCardProps {
  fileName: string;
  creationDate: string;
  onPress: () => void;
  translator: (translationKey: string) => string;
}

const AttachmentCard = ({
  fileName,
  creationDate,
  onPress,
  translator,
}: AttachmentCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Icon name={File.getFileIcon(fileName)} size={20} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{fileName}</Text>
          {creationDate && (
            <Text style={styles.text}>
              {`${
                translator != null ? translator('Base_AddedOn') : 'Added on'
              } : ${formatDate(
                creationDate,
                translator != null
                  ? translator('Base_DateFormat')
                  : 'MM/DD/YYYY',
              )}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: '5%',
  },
  text: {
    fontSize: 18,
  },
});

export default AttachmentCard;
