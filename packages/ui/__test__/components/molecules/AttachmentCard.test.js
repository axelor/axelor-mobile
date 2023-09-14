import React from 'react';
import {shallow} from 'enzyme';
import {AttachmentCard} from '../../../lib/components/molecules';

describe('Attachement Card Component', () => {
  it('renders without crashing', () => {
    const props = {
      fileName: 'test-file.pdf',
      creationDate: '2023-06-30',
      onPress: jest.fn(),
    };
    const wrapper = shallow(<AttachmentCard {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct file name', () => {
    const props = {
      fileName: 'test-file.pdf',
      creationDate: '2023-06-30',
      onPress: jest.fn(),
    };
    const wrapper = shallow(<AttachmentCard {...props} />);
    expect(wrapper.find('Text').at(0).props().children).toBe('test-file.pdf');
  });

  it('renders the correct creation date', () => {
    const props = {
      fileName: 'test-file.pdf',
      creationDate: '2023-06-30',
      onPress: jest.fn(),
    };
    const wrapper = shallow(<AttachmentCard {...props} />);
    expect(wrapper.find('Text').at(1).props().children).toContain('Added on');
    expect(wrapper.find('Text').at(1).props().children).toContain('06/30/2023');
  });

  it('calls onPress function on TouchableOpacity press', () => {
    const onPress = jest.fn();
    const props = {
      fileName: 'test-file.pdf',
      creationDate: '2023-06-30',
      onPress,
    };
    const wrapper = shallow(<AttachmentCard {...props} />);
    wrapper.find('TouchableOpacity').simulate('press');
    expect(onPress).toHaveBeenCalled();
  });
});
