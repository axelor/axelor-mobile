import React from 'react';
import {shallow} from 'enzyme';
import {Checkbox} from '../../../lib/components/molecules';

const Colors = {
  primaryColor: {
    background: 'blue',
    foreground: 'white',
  },
  secondaryColor: {
    background: 'green',
    foreground: 'gray',
  },
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

describe('Checkbox Component', () => {
  it('should render without crashing', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should call onChange when checkbox is clicked', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );

    wrapper.find('Icon').simulate('press');

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange when checkbox is disabled', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
        disabled={true}
      />,
    );

    wrapper.find('Icon').simulate('press');

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should have correct icon name based on isChecked prop', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );

    expect(wrapper.find('Icon').prop('name')).toBe('square-o');

    wrapper.find('Icon').simulate('press');

    expect(wrapper.find('Icon').prop('name')).toBe('check-square');
  });

  it('should render with correct title', () => {
    const onChangeMock = jest.fn();
    const title = 'Check me';
    const wrapper = shallow(
      <Checkbox
        title={title}
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );

    expect(wrapper.find('Text').prop('children')).toBe(title);
  });

  it('should render with correct icon color based on disabled prop', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        disabled={false}
        onChange={onChangeMock}
      />,
    );

    expect(wrapper.find('Icon').prop('color')).toEqual(
      Colors.primaryColor.background,
    );

    wrapper.setProps({disabled: true});

    expect(wrapper.find('Icon').prop('color')).toEqual(
      Colors.secondaryColor.background,
    );
  });
});
