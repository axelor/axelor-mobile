import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, useThemeColor} from '@aos-mobile/ui';
import RenderHTML from 'react-native-render-html';

const PERCENTAGE_WIDTH_NOTES = 0.95;

const NotesCard = ({title, data}) => {
  const [widthNotes, setWidthNotes] = useState();
  const Colors = useThemeColor();

  if (data == null || data === '') {
    return null;
  }

  return (
    <View style={styles.description}>
      <Text style={styles.title}>{title}</Text>
      <Card
        style={styles.note}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setWidthNotes(width);
        }}>
        <RenderHTML
          source={{
            html: data,
          }}
          contentWidth={widthNotes * PERCENTAGE_WIDTH_NOTES}
          baseStyle={{color: Colors.text}}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 16,
    flexDirection: 'column',
    marginTop: 2,
  },
  title: {
    marginHorizontal: '5%',
  },
  note: {
    justifyContent: 'center',
    elevation: 0,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
});

export default NotesCard;
