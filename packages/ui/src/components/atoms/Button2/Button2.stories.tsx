// stories/MyButton.stories.tsx

import {ComponentMeta, StoryObj} from '@storybook/react';

import {ButtonProps, MyButton2} from './Button2';

export default {
  title: 'components/MyButton2',
  argTypes: {onPress: {action: 'pressed'}},
  component: MyButton2,
} as ComponentMeta<typeof MyButton2>;

export const Basic: StoryObj<ButtonProps> = {
  args: {
    text: 'Hello World!!',
    color: 'purple',
  },
};
