import React from 'react';
import {StyleSheet, View} from 'react-native';
import {EditableInput} from '@/components/molecules';
import {Card, Text} from '@/components/atoms';

const DescriptionCard = ({
  isEditable = true,
  description,
  onChange = () => {},
}) => {
  return (
    <View>
      {isEditable ? (
        <View>
          <Text style={styles.title}>DESCRIPTION</Text>
          <EditableInput
            defaultValue={description}
            placeholder="Description"
            style={styles.description}
            onValidate={onChange}
            multiline={true}
            numberOfLines={5}
          />
        </View>
      ) : (
        description != null && (
          <View>
            <Text style={styles.title}>DESCRIPTION</Text>
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
  description: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  title: {
    marginHorizontal: 16,
  },
});

export default DescriptionCard;
