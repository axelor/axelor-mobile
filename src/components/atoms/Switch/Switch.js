import {useThemeColor} from '@/features/themeSlice';
import React, {useState} from 'react';
import {Switch as RNSwitch} from 'react-native';

const Switch = ({isEnabled, handleToggle}) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const Colors = useThemeColor();

  const toggleSwitch = () => {
    handleToggle(!enabled);
    setEnabled(previousState => !previousState);
  };

  return (
    <RNSwitch
      trackColor={{
        false: Colors.secondaryColor_light,
        true: Colors.primaryColor_light,
      }}
      thumbColor={'#f4f4f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={enabled}
    />
  );
};

export default Switch;
