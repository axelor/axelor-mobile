import React from 'react';
import {View, Dimensions} from 'react-native';
import {shallow} from 'enzyme';
import {BlockInteractionScreen} from '../../../lib/components/atoms';

describe('BlockInteractionScreen Component', () => {
  it('renders children and blocks interactions', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(
      <BlockInteractionScreen>{children}</BlockInteractionScreen>,
    );

    // Check if children are rendered
    expect(wrapper.find('[testID="children"]').length).toBe(1);

    // Check if the blocking overlay is rendered
    expect(wrapper.find(View).length).toBe(3); // Expect three Views, two for the container and the gray card overlay and one for the children

    const grayOverlay = wrapper.find(View).at(1);

    // Check the style of the overlay
    const windowHeight = Dimensions.get('window').height;
    const expectedStyle = {
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CECECE',
      opacity: 0.2,
      height: windowHeight * 2,
      top: -50,
      width: Dimensions.get('window').width,
      position: 'absolute',
    };
    expect(grayOverlay.prop('style')).toMatchObject(expectedStyle);
  });

  it('hides the header if specified', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(
      <BlockInteractionScreen hideHeader>{children}</BlockInteractionScreen>,
    );

    const container = wrapper.find(View).at(0);

    // Check if the header is hidden
    const containerStyle = container.prop('style');
    expect(containerStyle.top).toBe(0); // Expect the top offset to be 0
  });
});
