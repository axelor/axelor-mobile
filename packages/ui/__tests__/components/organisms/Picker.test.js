import React from 'react';
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {getDefaultThemeColors, getGlobalStyles} from '../../tools';
import {
  Text,
  FormInput,
  SelectionContainer,
  Picker,
  RightIconButton,
} from '@axelor/aos-mobile-ui';

describe('Picker Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    listItems: [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
      {id: 3, name: 'Item 3'},
    ],
    valueField: 'id',
    labelField: 'name',
    onValueChange: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Picker {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the placeholder if provided and no value is selected', () => {
    const placeholder = 'Select an item';
    const wrapper = shallow(<Picker {...props} placeholder={placeholder} />);
    const title = wrapper.find(RightIconButton).prop('title');
    expect(title).toBe(placeholder);
  });

  it('should give listItems to SelectionContainer', () => {
    const wrapper = shallow(<Picker {...props} />);
    wrapper.find(RightIconButton).simulate('press');
    expect(wrapper.find(SelectionContainer).prop('objectList')).toBe(
      props.listItems,
    );
  });

  it('should call onValueChange with the right args', () => {
    const onValueChange = jest.fn();
    const wrapper = shallow(
      <Picker {...props} onValueChange={onValueChange} />,
    );

    expect(wrapper.find(SelectionContainer).length).toBe(0);

    wrapper.find(RightIconButton).simulate('press');
    expect(wrapper.find(SelectionContainer).length).toBe(1);

    wrapper.find(SelectionContainer).props().handleSelect(props.listItems[0]);

    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it('should display a title if provided', () => {
    const title = 'Title';
    const wrapper = shallow(<Picker {...props} title={title} />);
    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('should render readonly FormInput when props is true', () => {
    const wrapper = shallow(<Picker {...props} readonly />);
    expect(wrapper.find(FormInput).prop('readOnly')).toBe(true);
  });

  it('should apply required styling when props is true', () => {
    const wrapper = shallow(<Picker {...props} required />);
    expect(getGlobalStyles(wrapper.find(RightIconButton))).toMatchObject({
      borderColor: Colors.errorColor.background,
    });
  });

  it('should apply custom style to container when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<Picker {...props} style={customStyle} />);
    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });

  it('should apply custom style to picker when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<Picker {...props} pickerStyle={customStyle} />);
    expect(getGlobalStyles(wrapper.find(RightIconButton))).toMatchObject(
      customStyle,
    );
  });

  it('should apply custom style to title when provided', () => {
    const customStyle = {fontSize: 20};
    const wrapper = shallow(
      <Picker {...props} title="Title" styleTxt={customStyle} />,
    );
    expect(getGlobalStyles(wrapper.find(Text))).toMatchObject(customStyle);
  });
});
