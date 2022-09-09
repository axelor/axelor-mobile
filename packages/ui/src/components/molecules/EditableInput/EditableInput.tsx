import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getCommonStyles } from "../../../commons-styles";
import { useTheme } from "../../../ThemeContext";
import { Icon, Input } from "../../atoms";

interface EditableInputProps {
  placeholder: string;
  onValidate: (any) => void;
  defaultValue: string | undefined;
  multiline?: boolean;
  numberOfLines?: number;
}

const EditableInput = ({
  placeholder,
  onValidate,
  defaultValue,
  multiline = false,
  numberOfLines = 1,
}: EditableInputProps) => {
  const Colors = useTheme();
  const [isEditable, setEditable] = useState(true);
  const [value, setValue] = useState(defaultValue);

  const handleIcon = () => {
    setEditable(!isEditable);
    if (!isEditable) {
      onValidate(value == null ? "" : value);
    }
  };

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        multiline ? styles.size : commonStyles.filterSize,
      ]}
    >
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(text) => setValue(text)}
        readOnly={isEditable}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleIcon}>
          <Icon name={isEditable ? "pencil-alt" : "check"} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  size: {
    width: "90%",
    minHeight: 40,
  },
  input: {
    width: "80%",
    fontSize: 14,
  },
  actions: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
});

export default EditableInput;
