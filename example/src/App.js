import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import Colors from '@/types/colors';
import {Application, configI18n} from '@aos-mobile/core';
import enTranslation from './i18n/en.json';
import frTranslation from './i18n/fr.json';

const App = () => {
  configI18n({
    resources: [
      {lng: 'en', translationsObject: enTranslation},
      {lng: 'fr', translationsObject: frTranslation},
    ],
  });

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={[styles.success, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={[styles.error, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
  };

  return <Application modules={[]} />;
};

const styles = StyleSheet.create({
  error: {
    borderLeftColor: Colors.ligthTheme.errorColor,
  },
  success: {
    borderLeftColor: Colors.ligthTheme.primaryColor,
  },
  toast: {
    width: '90%',
    height: 90,
  },
  toastContent: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.ligthTheme.text,
    flex: 1,
  },
  detail: {
    fontSize: 16,
    color: Colors.ligthTheme.text,
    flex: 3,
  },
});

export default App;
