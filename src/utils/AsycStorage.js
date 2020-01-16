import AsyncStorage from '@react-native-community/async-storage';

const getItem = async key => {
  const result = await AsyncStorage.getItem(`${key}`);
  return result;
};

const setItem = (key, value) => AsyncStorage.setItem(`${key}`, value);

const removeItem = async key => await AsyncStorage.removeItem(`${key}`);

export {getItem, setItem, removeItem};
