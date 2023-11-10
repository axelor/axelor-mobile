import React from 'react';
import {FlatList} from 'react-native';
import {shallow} from 'enzyme';
import {Text, UnorderedList} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('UnorderedList', () => {
  const props = {
    data: ['Item 1', 'Item 2', 'Item 3'],
    renderItem: item => <Text>{item}</Text>,
  };
  it('renders without crashing', () => {
    const wrapper = shallow(<UnorderedList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of items', () => {
    const wrapper = shallow(<UnorderedList {...props} />);

    expect(wrapper.find('FlatList').props().data).toHaveLength(
      props.data.length,
    );
  });

  it('renders the correct number of items when numberOfItems is set', () => {
    const numberOfItems = 2;
    const wrapper = shallow(
      <UnorderedList {...props} numberOfItems={numberOfItems} />,
    );

    expect(wrapper.find('FlatList').props().data).toHaveLength(numberOfItems);
  });

  it('renders the dot correctly', () => {
    const wrapper = shallow(<UnorderedList {...props} />);

    const listItems = wrapper
      .find('FlatList')
      .renderProp('renderItem')({item: props.data[0]})
      .shallow();

    expect(listItems.find(Text).at(0).prop('children')).toBe('\u2022 ');
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<UnorderedList {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(FlatList).at(0))).toMatchObject(
      customStyle,
    );
  });
});
