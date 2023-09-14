import React from 'react';
import {shallow} from 'enzyme';
import {ClearableCard} from '../../../lib/components/molecules';
import {Icon} from '../../../lib/components/atoms';

const Colors = {
  backgroundColor: 'white',
  text: 'black',
  primaryColor: {
    background_light: 'gray',
    background: 'blue',
    foreground: 'white',
  },
  secondaryColor: {
    background_light: 'gray',
    background: 'green',
    foreground: 'gray',
  },
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

jest.mock('../../../lib/utils/commons-styles', () => ({
  getCommonStyles: () => ({
    filter: {
      backgroundColor: Colors.primaryColor.background,
    },
    filterAlign: {},
    filterSize: {},
  }),
}));

describe('ClearableCard Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <ClearableCard selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly when clearable is true', () => {
    const onClearPressMock = jest.fn();
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable
      />,
    );

    expect(wrapper.find(Icon)).toHaveLength(1);

    const iconProps = wrapper.find(Icon).props();
    expect(iconProps.name).toBe('times');
    expect(iconProps.touchable).toBe(true);
    expect(iconProps.onPress).toBe(onClearPressMock);
    expect(iconProps.size).toBeGreaterThan(0);

    const cardStyles = wrapper.find('Card').props().style;
    expect(cardStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
        }),
      ]),
    );
  });

  it('renders correctly when clearable is false', () => {
    const onClearPressMock = jest.fn();
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable={false}
      />,
    );

    expect(wrapper.find(Icon)).toHaveLength(0);

    const cardStyles = wrapper.find('Card').props().style;
    expect(cardStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
        }),
      ]),
    );
  });

  it('calls onClearPress function when the clear icon is pressed', () => {
    const onClearPressMock = jest.fn();
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable
      />,
    );

    const clearIcon = wrapper.find(Icon);
    clearIcon.props().onPress();

    expect(onClearPressMock).toHaveBeenCalled();
  });

  it('does not render clear icon when clearable is false', () => {
    const onClearPressMock = jest.fn();
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable={false}
      />,
    );

    expect(wrapper.find(Icon)).toHaveLength(0);
  });
});
