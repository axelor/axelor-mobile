import {Dimensions, StyleSheet} from 'react-native';

export const getCommonStyles = Colors =>
  StyleSheet.create({
    filter: {
      backgroundColor: Colors.backgroundColor,
      borderRadius: 13,
      elevation: 2,
      paddingHorizontal: 12,
      paddingVertical: 0,
      marginVertical: 3,
    },
    filterAlign: {
      marginHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterSize: {
      width: '90%',
      height: 40,
    },
    button: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingVertical: 5,
      marginVertical: 5,
      borderRadius: 35,
      width: '90%',
      height: Dimensions.get('window').height * 0.07,
      minHeight: 30,
      maxHeight: 40,
    },
  });
