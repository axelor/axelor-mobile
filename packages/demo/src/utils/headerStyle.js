import {StyleSheet} from 'react-native';

export const getHeaderStyles = Colors =>
  StyleSheet.create({
    headerTitle: {
      color: Colors.text,
    },
    headerColor: {
      backgroundColor: Colors.backgroundColor,
    },
    listScreenHeaderStyle: {
      backgroundColor: Colors.backgroundColor,
      elevation: 0,
    },
  });
