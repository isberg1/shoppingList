import 'react-native';

//https://github.com/react-native-community/async-storage/blob/master/jest/async-storage-mock.js
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// https://github.com/facebook/react-native/tree/master/Libraries/Animated/src
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
