/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Stepper, Text, Card, Icon} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('Stepper Component', () => {
  const steps = [
    {title: 'Step 1', state: 'draft'},
    {title: 'Step 2', state: 'inProgress'},
    {title: 'Step 3', state: 'completed'},
  ];

  const translator = (key, values) => {
    if (key === 'Base_Next') return 'Next';
    if (key === 'Base_StepOfStep')
      return `${values.activeStep}/${values.numberOfSteps}`;
    return key;
  };

  const baseProps = {
    steps,
    activeStepIndex: 0,
    translator,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Stepper {...baseProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render ProgressCircle', () => {
    const wrapper = shallow(<Stepper {...baseProps} />);

    const progressCircleWrapper = wrapper.find('ProgressCircle');
    expect(progressCircleWrapper.exists()).toBe(true);

    const progressCircleContent = progressCircleWrapper.dive();
    expect(progressCircleContent.exists()).toBe(true);
  });

  it('should render active step title', () => {
    const wrapper = shallow(<Stepper {...baseProps} />);
    expect(wrapper.find(Text).at(0).prop('children')).toBe(steps[0].title);
  });

  it('should render next step title if not last step', () => {
    const wrapper = shallow(<Stepper {...baseProps} />);
    expect(wrapper.find(Text).at(1).prop('children')).toBe('Next : Step 2');
  });

  it('should not render next step title if last step', () => {
    const wrapper = shallow(<Stepper {...baseProps} activeStepIndex={2} />);
    expect(wrapper.find(Text).length).toBe(1);
  });

  it('should display StepList when dropdown is clicked', () => {
    const wrapper = shallow(<Stepper {...baseProps} displayDropdown />);

    expect(wrapper.find('StepList').exists()).toBe(false);

    wrapper.find('TouchableOpacity').simulate('press');

    const stepListWrapper = wrapper.find('StepList');
    expect(stepListWrapper.exists()).toBe(true);

    const stepListContent = stepListWrapper.dive();
    expect(stepListContent.exists()).toBe(true);
  });

  it('should render Icon chevron when displayDropdown is true', () => {
    const wrapper = shallow(<Stepper {...baseProps} displayDropdown />);
    expect(wrapper.find(Icon).exists()).toBe(true);
  });

  it('should not render Icon chevron when displayDropdown is false', () => {
    const wrapper = shallow(<Stepper {...baseProps} />);
    expect(wrapper.find(Icon).exists()).toBe(false);
  });

  it('should use Card as container when isCardBackground or displayDropdown is true', () => {
    const wrapper1 = shallow(<Stepper {...baseProps} isCardBackground />);
    expect(wrapper1.find(Card).exists()).toBe(true);

    const wrapper2 = shallow(<Stepper {...baseProps} displayDropdown />);
    expect(wrapper2.find(Card).exists()).toBe(true);
  });

  it('should use View as container by default', () => {
    const wrapper = shallow(<Stepper {...baseProps} />);
    expect(wrapper.find(View).exists()).toBe(true);
  });

  it('applies custom border style when isCardBackground is true', () => {
    const wrapper = shallow(<Stepper {...baseProps} isCardBackground />);
    const container = wrapper.find(Card);
    const styles = getGlobalStyles(container);

    expect(styles.borderWidth).toBe(1);
  });
});
