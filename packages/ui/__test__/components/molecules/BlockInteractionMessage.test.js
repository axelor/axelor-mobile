import React from 'react';
import {shallow} from 'enzyme';
import {BlockInteractionMessage} from '../../../lib/components/molecules';

const configStyle = {backgroundColor: 'blue'};

jest.mock('../../../lib/config/ConfigContext', () => ({
  useConfig: () => ({
    blockInteractionConfig: {
      visible: true,
      message: 'Test Message',
      style: configStyle,
      actionItems: [
        {
          iconName: 'check',
          title: 'Action 1',
          onPress: jest.fn(),
          color: 'green',
        },
        {
          title: 'Action 2',
          onPress: jest.fn(),
          color: 'red',
        },
      ],
    },
  }),
}));

describe('BlockInteractionMessage Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct error message', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.find('WarningCard').prop('errorMessage')).toBe(
      'Test Message',
    );
  });

  it('applies custom styles', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.find('Card').prop('style')).toContain(configStyle);
  });

  it('renders action items correctly', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    const buttons = wrapper.find('IconButton');
    expect(buttons).toHaveLength(1);
    expect(buttons.at(0).prop('iconName')).toBe('check');
    expect(buttons.at(0).prop('title')).toBe('Action 1');
    expect(buttons.at(0).prop('color')).toBe('green');

    const buttonsWithoutIcon = wrapper.find('Button');
    expect(buttonsWithoutIcon).toHaveLength(1);
    expect(buttonsWithoutIcon.at(0).prop('title')).toBe('Action 2');
    expect(buttonsWithoutIcon.at(0).prop('color')).toBe('red');
  });

  // TODO: try to update useConfig mock context
  /*it('does not render if blockInteractionConfig.visible is false', () => {
    jest.mock('../../../lib/config/ConfigContext', () => ({
      useConfig: () => ({
        blockInteractionConfig: {
          visible: false,
        },
      }),
    }));

    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });*/
});
