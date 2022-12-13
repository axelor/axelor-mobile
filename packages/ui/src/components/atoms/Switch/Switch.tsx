import React, {useState} from 'react';
import {Switch as RNSwitch} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';

interface SwitchProps {
  isEnabled: boolean;
  handleToggle: (any) => void;
}

const Switch = ({isEnabled, handleToggle}: SwitchProps) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const Colors = useThemeColor();

  const toggleSwitch = () => {
    handleToggle(!enabled);
    setEnabled(previousState => !previousState);
  };

  return (
    <RNSwitch
      trackColor={{
        false: Colors.secondaryColor.background_light,
        true: Colors.primaryColor.background_light,
      }}
      thumbColor={Colors.secondaryColor_dark.background}
      ios_backgroundColor={Colors.backgroundColor}
      onValueChange={toggleSwitch}
      value={enabled}
    />
  );
};

export default Switch;
