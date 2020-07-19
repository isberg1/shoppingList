/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

it('renders correctly', () => {
  renderer.create(<App />);
});
