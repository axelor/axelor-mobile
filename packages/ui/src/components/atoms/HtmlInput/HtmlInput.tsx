import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Text from '../Text/Text';

// NOTE: documentation https://www.npmjs.com/package/react-native-pell-rich-editor

interface HtmlInputProps {
  style?: any;
  styleToolbar?: any;
  title?: string;
  onChange?: (value: string) => void;
  defaultInput?: string;
}

const HtmlInput = ({
  style,
  styleToolbar,
  title = '',
  onChange = () => {},
  defaultInput = '',
}: HtmlInputProps) => {
  const Colors = useThemeColor();
  const richText = useRef();

  return (
    <ScrollView>
      <ScrollView style={[style]}>
        <View>
          <Text>{title}</Text>
          <RichEditor
            ref={richText}
            androidHardwareAccelerationDisabled={true}
            initialContentHTML={defaultInput}
            onChange={onChange}
          />
        </View>
      </ScrollView>
      <RichToolbar
        style={styleToolbar}
        editor={richText}
        selectedIconTint={Colors.primaryColor.background}
        iconTint={Colors.primaryColor.foreground}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
          [actions.heading1]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H1</Text>
          ),
        }}
      />
    </ScrollView>
  );
};

export default HtmlInput;
