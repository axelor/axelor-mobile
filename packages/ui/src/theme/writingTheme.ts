import {useWritingStyle} from './WritingThemeContext';

export interface Writing {
  key: string;
  name: string;
  style: WritingStyles;
}

export interface WritingStyles {
  defaultSize: number;
  title: TextStyle;
  subTitle: TextStyle;
  textImportant: TextStyle;
  textDetails: TextStyle;
}

export interface TextStyle {
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

export const writingDefaultTheme: Writing = {
  key: 'default',
  name: 'Default',
  style: {
    defaultSize: 14,
    title: {fontSize: 16, fontWeight: 'bold', fontStyle: 'normal'},
    subTitle: {fontSize: 16, fontWeight: 'normal', fontStyle: 'normal'},
    textImportant: {fontSize: 14, fontWeight: 'bold', fontStyle: 'normal'},
    textDetails: {fontSize: 14, fontWeight: 'normal', fontStyle: 'italic'},
  },
};

export const useWritingType = (
  type: 'title' | 'subtitle' | 'important' | 'details' | undefined,
): TextStyle => {
  const Writing = useWritingStyle();

  switch (type) {
    case 'title':
      return Writing.title;
    case 'subtitle':
      return Writing.subTitle;
    case 'important':
      return Writing.textImportant;
    case 'details':
      return Writing.textDetails;
    default:
      return {fontSize: Writing.defaultSize};
  }
};
