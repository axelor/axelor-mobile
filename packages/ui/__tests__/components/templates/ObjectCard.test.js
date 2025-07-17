import React from 'react';
import {View} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ObjectCard Component', () => {
  const setupObjectCard = overrideProps =>
    setup({
      Component: ObjectCard,
      baseProps: {
        upperTexts: {
          items: [
            {displayText: 'Title Text', isTitle: true},
            {
              displayText: 'Subtitle Text',
              indicatorText: 'Label',
              iconName: 'user',
            },
          ],
        },
        lowerTexts: {
          items: [{displayText: 'Lower Subtitle', indicatorText: 'Info'}],
        },
        upperBadges: {items: [{displayText: 'New', color: 'primary'}]},
        sideBadges: {items: [{displayText: 'Status', color: 'success'}]},
        lowerBadges: {items: [{displayText: 'Archived', color: 'danger'}]},
        image: {
          source: {uri: 'https://example.com/image.png'},
          resizeMode: 'contain',
        },
        onPress: jest.fn(),
      },
      overrideProps,
    });

  it('renders all text elements correctly', () => {
    const {getByText, props} = setupObjectCard();

    props.upperTexts?.items.forEach(_i => {
      expect(getByText(_i.displayText)).toBeTruthy();
    });

    props.lowerTexts?.items.forEach(_i => {
      expect(getByText(_i.displayText)).toBeTruthy();
    });
  });

  it('renders badges correctly', () => {
    const {getByText, props} = setupObjectCard();

    props.upperBadges?.items.forEach(_i => {
      expect(getByText(_i.displayText)).toBeTruthy();
    });

    props.sideBadges?.items.forEach(_i => {
      expect(getByText(_i.displayText)).toBeTruthy();
    });

    props.lowerBadges?.items.forEach(_i => {
      expect(getByText(_i.displayText)).toBeTruthy();
    });
  });

  it('renders image when image prop is provided', () => {
    const {getAllByRole} = setupObjectCard();

    expect(getAllByRole('image').length).toBe(1);
  });

  it('calls onPress when touchable is true', () => {
    const {getByTestId, props} = setupObjectCard({onPress: jest.fn()});

    fireEvent.press(getByTestId('objectCardTouchable'));

    expect(props.onPress).toHaveBeenCalled();
  });

  it('does not call onPress when touchable is false', () => {
    const {getByTestId, props} = setupObjectCard({
      onPress: jest.fn(),
      touchable: false,
    });

    fireEvent.press(getByTestId('objectCardTouchable'));

    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('renders customComponent instead of default text/badge', () => {
    const CustomComponent = () => <View testID="custom-component" />;

    const {getAllByTestId, queryByText} = setupObjectCard({
      upperTexts: {
        items: [{customComponent: <CustomComponent />, displayText: 'ignored'}],
      },
      upperBadges: {
        items: [
          {customComponent: <CustomComponent />, displayText: 'ignored badge'},
        ],
      },
    });

    expect(getAllByTestId('custom-component').length).toBe(2);
    expect(queryByText('ignored')).toBeFalsy();
    expect(queryByText('ignored badge')).toBeFalsy();
  });

  it('hides elements with hideIf or hideIfNull set', () => {
    const {getByText, queryByText} = setupObjectCard({
      upperTexts: {
        items: [
          {
            displayText: '',
            indicatorText: '',
            hideIfNull: true,
          },
          {displayText: 'Visible', hideIf: false},
          {displayText: 'Hidden', hideIf: true},
        ],
      },
    });

    expect(queryByText('')).toBeFalsy();
    expect(getByText('Visible')).toBeTruthy();
    expect(queryByText('Hidden')).toBeFalsy();
  });

  it('renders arrow icon if showArrow is true', () => {
    const {getByTestId} = setupObjectCard({showArrow: true});

    expect(getByTestId('icon-chevron-right')).toBeTruthy();
  });

  it('does not render arrow icon if showArrow is false', () => {
    const {queryByTestId} = setupObjectCard({showArrow: false});

    expect(queryByTestId('icon-chevron-right')).toBeFalsy();
  });
});
