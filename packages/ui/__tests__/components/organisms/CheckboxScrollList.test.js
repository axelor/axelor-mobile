import React from 'react';
import {shallow} from 'enzyme';
import {CheckboxScrollList, ScrollList, Checkbox} from '@axelor/aos-mobile-ui';

describe('CheckboxScrollList Component', () => {
  const mockData = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
  ];
  const onCheckedChange = jest.fn();
  const renderItem = jest.fn(item => <div>{item.name}</div>);

  const props = {
    data: mockData,
    onCheckedChange,
    renderItem,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles all items when main checkbox is clicked', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    wrapper.find(Checkbox).at(0).simulate('change', true);
    expect(onCheckedChange).toHaveBeenCalledWith(mockData);
    wrapper.find(Checkbox).at(0).simulate('change', false);
    expect(onCheckedChange).toHaveBeenCalledWith([]);
  });

  it('toggles individual items', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[0], index: 0})
      .find(Checkbox)
      .simulate('change', true);
    expect(onCheckedChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it('renders each item with a checkbox', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    const firstItem = wrapper.find(ScrollList).renderProp('renderItem')({
      item: mockData[0],
      index: 0,
    });
    expect(firstItem.find(Checkbox).exists()).toBe(true);
    expect(firstItem.contains(renderItem({item: mockData[0], index: 0}))).toBe(
      true,
    );
  });

  it('passes loadingList, moreLoading, isListEnd, filter, horizontal, disabledRefresh props to ScrollList', () => {
    const additionalProps = {
      loadingList: true,
      moreLoading: true,
      isListEnd: true,
      filter: true,
      horizontal: true,
      disabledRefresh: true,
    };
    const wrapper = shallow(
      <CheckboxScrollList {...props} {...additionalProps} />,
    );
    expect(wrapper.find(ScrollList).props()).toMatchObject(additionalProps);
  });

  it('should apply custom style checkbox width when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <CheckboxScrollList {...props} styleCheckbox={customStyle} />,
    );

    expect(wrapper.find(Checkbox).prop('style')).toContain(customStyle);
  });

  it('should apply custom style to ScrollList', () => {
    const customStyleScrollList = {margin: 10};
    const wrapper = shallow(
      <CheckboxScrollList {...props} styleScrollList={customStyleScrollList} />,
    );

    expect(wrapper.find(ScrollList).prop('style')).toContain(
      customStyleScrollList,
    );
  });
});
