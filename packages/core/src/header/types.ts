export interface HeaderActions {
  [key: string]: HeaderOptions;
}

export interface HeaderOptions {
  model?: string;
  modelId?: number;
  disableMailMessages?: boolean;
  attachedFileScreenTitle?: string;
  actions?: ActionType[];
}

export interface ActionType {
  key: string;
  order: number;
  title: string;
  iconName: string;
  iconColor?: string;
  FontAwesome5?: boolean;
  indicator?: number;
  hideIf?: boolean;
  onPress: () => void;
  showInHeader?: boolean;
}
