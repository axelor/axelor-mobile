import React from 'react';
import {shallow} from 'enzyme';
import {SelectionContainer} from '@axelor/aos-mobile-ui';

describe('SelectionContainer', () => {
  const objectList = [
    {id: '1', name: 'Item 1'},
    {id: '2', name: 'Item 2'},
  ];

  const props = {
    displayValue: jest.fn(item => item.name),
    handleSelect: jest.fn(),
    objectList: objectList,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<SelectionContainer {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with objectList', () => {
    const wrapper = shallow(<SelectionContainer {...props} />);

    expect(wrapper.find('SelectionItem')).toHaveLength(props.objectList.length);
  });

  it('calls handleSelect with the right item on press', () => {
    const onPress = jest.fn();

    const newProps = {
      ...props,
      handleSelect: onPress,
    };

    const wrapper = shallow(<SelectionContainer {...newProps} />);

    wrapper.find('SelectionItem').first().simulate('press');

    expect(newProps.handleSelect).toHaveBeenCalledWith(props.objectList[0]);
  });

  it('does not render if objectList is empty or null', () => {
    const newPropsVoidTab = {
      ...props,
      objectList: [],
    };
    const newPropsNullTab = {
      ...props,
      objectList: null,
    };

    const wrapperEmpty = shallow(<SelectionContainer {...newPropsVoidTab} />);

    const wrapperNull = shallow(<SelectionContainer {...newPropsNullTab} />);

    expect(wrapperEmpty.type()).toBeNull();
    expect(wrapperNull.type()).toBeNull();
  });
});
