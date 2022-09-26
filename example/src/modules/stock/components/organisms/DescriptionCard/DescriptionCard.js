import React from 'react';
import {StyleSheet, View} from 'react-native';
import {EditableInput} from '@/components/molecules';
import {Card, Text} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const DescriptionCard = ({
  isEditable = true,
  description,
  onChange = () => {},
}) => {
  const I18n = useTranslator();

  return (
    <View>
      {isEditable ? (
        <View>
          <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
          <EditableInput
            defaultValue={description}
            placeholder={I18n.t('Base_Description')}
            onValidate={onChange}
            multiline={true}
            numberOfLines={5}
          />
        </View>
      ) : (
        description != null && (
          <View>
            <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
            <Card style={styles.description}>
              <Text numberOfLines={5}>{description}</Text>
            </Card>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
  },
});

export default DescriptionCard;
