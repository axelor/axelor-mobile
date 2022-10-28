import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, EditableInput, Text} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

interface DescriptionCardProps {
  isEditable?: boolean;
  description: string;
  onChange: () => void;
}

const DescriptionCard = ({
  isEditable = true,
  description,
  onChange = () => {},
}: DescriptionCardProps) => {
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
            <Card>
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
