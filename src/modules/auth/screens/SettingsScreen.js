import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, Switch, Text} from '@/components/atoms';
import {Themes} from '@/types/colors';
import {ThemeConsumerHook} from '@/themeStore';
import {Picker} from '@/components/molecules';

const SettingsScreen = ({route, navigation}) => {
  const [{theme, isColorBlind}, colorDispatch] = ThemeConsumerHook();

  const handleChangeTheme = useCallback(
    newTheme => {
      colorDispatch({
        type: 'changeTheme',
        newTheme: newTheme,
      });
    },
    [colorDispatch],
  );

  const handleToggleColorBlind = useCallback(
    state => {
      if (state) {
        colorDispatch({
          type: 'activateColorBlind',
        });
      } else {
        colorDispatch({
          type: 'desactivateColorBlind',
        });
      }
    },
    [colorDispatch],
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.deviceContainer}>
        <Text>Zebra device? </Text>
        <Switch
          isEnabled={global.zebraConfig}
          handleToggle={state => {
            global.zebraConfig = state;
          }}
        />
      </View>
      <View style={styles.deviceContainer}>
        <Text>Show filter? </Text>
        <Switch
          isEnabled={global.filterConfig}
          handleToggle={state => {
            global.filterConfig = state;
          }}
        />
      </View>
      <View style={styles.deviceContainer}>
        <Text>Color blind? </Text>
        <Switch
          isEnabled={isColorBlind}
          handleToggle={state => handleToggleColorBlind(state)}
        />
      </View>
      {!isColorBlind && (
        <Picker
          title="Theme"
          defaultValue={theme}
          listItems={Themes.themesList}
          labelField="name"
          valueField="id"
          onValueChange={handleChangeTheme}
          emptyValue={false}
        />
      )}
      {route.params.user == null ||
      route.params.user.group.code !== 'admins' ? null : (
        <Button title="Send translations" onPress={() => {}} />
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
});

export default SettingsScreen;
