import {Color} from '../../../theme';

export interface FloatingButtonProps {
  style?: any;
  actions: ActionProps[];
  iconName?: string;
  closeIconName?: string;
  size?: number;
  closeOnOutsideClick?: boolean;
  onGlobalPress?: () => void;
  translator: (key: string) => string;
  useCircleStyle?: boolean;
}

export interface ActionProps {
  key: number | string;
  title?: string;
  iconName: string;
  color?: Color;
  hideIf?: boolean;
  disabled?: boolean;
  closeOnPress?: boolean;
  indicator?: boolean;
  onPress: () => void;
}

export const FLOATING_BUTTON_SIZE = 60;
export const ACTION_BUTTON_SIZE_PERCENTAGE = 0.7;
export const MIN_ACTION_BUTTON_WIDTH = 200;
