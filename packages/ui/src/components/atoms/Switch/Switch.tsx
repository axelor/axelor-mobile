import React, { useState } from "react";
import { Switch as RNSwitch } from "react-native";
import { useThemeColor } from "../../../ThemeContext";

interface SwitchProps {
  isEnabled: boolean;
  handleToggle: (any) => void;
}

const Switch = ({ isEnabled, handleToggle }: SwitchProps) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const Colors = useThemeColor();

  const toggleSwitch = () => {
    handleToggle(!enabled);
    setEnabled((previousState) => !previousState);
  };

  return (
    <RNSwitch
      trackColor={{
        false: Colors.secondaryColor_light,
        true: Colors.primaryColor_light,
      }}
      thumbColor={"#f4f4f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={enabled}
    />
  );
};

export default Switch;
