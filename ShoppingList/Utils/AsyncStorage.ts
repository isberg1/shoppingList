import AsyncStorage from '@react-native-community/async-storage';

export async function getFromAsyncStorage(
  key: string,
  onSuccess: (arg: any) => void,
  onError: (arg: any) => void = () => {},
) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      onSuccess(value);
    }
  } catch (error) {
    console.log('_retrieveData failed:', error);
    onError(error);
  }
}

export async function setInAsyncStorage(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('store settings error', error);
  }
}

export async function deleteFromAsyncStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('delete data error', error);
  }
}
