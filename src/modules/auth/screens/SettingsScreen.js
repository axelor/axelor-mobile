import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, Switch, Text} from '@/components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {activateColorBlind, desactivateColorBlind} from '@/features/themeSlice';
import {
  toggleFilterShowConfig,
  toggleZebraConfig,
} from '../features/configSlice';
import useTranslator from '@/hooks/use-translator';

const SettingsScreen = ({route}) => {
  const {isColorBlind} = useSelector(state => state.theme);
  const {zebraConfig, filterShowConfig} = useSelector(state => state.config);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleToggleColorBlind = useCallback(
    state => {
      if (state) {
        dispatch(activateColorBlind());
      } else {
        dispatch(desactivateColorBlind());
      }
    },
    [dispatch],
  );

  const handleToggleFilter = useCallback(() => {
    dispatch(toggleFilterShowConfig());
  }, [dispatch]);

  const handleToggleZebra = useCallback(() => {
    dispatch(toggleZebraConfig());
  }, [dispatch]);

  return (
    <Screen style={styles.container}>
      <View style={styles.deviceContainer}>
        <Text>{`${I18n.t('User.ZebraDevice')} ? `}</Text>
        <Switch isEnabled={zebraConfig} handleToggle={handleToggleZebra} />
      </View>
      <View style={styles.deviceContainer}>
        <Text>{`${I18n.t('User.ShowFilter')} ? `}</Text>
        <Switch
          isEnabled={filterShowConfig}
          handleToggle={handleToggleFilter}
        />
      </View>
      <View style={styles.deviceContainer}>
        <Text>{`${I18n.t('User.ColorBlind')} ? `} </Text>
        <Switch
          isEnabled={isColorBlind}
          handleToggle={state => handleToggleColorBlind(state)}
        />
      </View>
      {route.params.user == null ||
      route.params.user.group.code !== 'admins' ? null : (
        <Button
          title={I18n.t('User.SendTranslations')}
          style={styles.button}
          onPress={() => {}}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '87%',
    marginVertical: 2,
  },
  button: {
    width: '50%',
  },
});

export default SettingsScreen;
