import React from 'react';
import {shallow} from 'enzyme';
import App from '../src/App';

jest.mock('../packages/core/lib/app/index', () => ({
  schemaContructor: {
    mixed: jest.fn(),
    string: jest.fn(),
    boolean: jest.fn(),
    date: jest.fn(),
    array: () => ({
      of: jest.fn(),
    }),
    object: jest.fn(),
    subObject: jest.fn(),
    number: jest.fn(),
  },
}));

describe('Appplication', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
});
