import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {setItem} from '../utils/AsycStorage';

const Auth = ({navigation}) => {
  const Input = ({label, ...props}) => {
    return (
      <View
        style={{
          paddingHorizontal: 30,
          paddingTop: 20,
        }}>
        <Text style={{fontSize: 20}}>{label}</Text>
        <TextInput
          placeholderTextColor="blue"
          style={{
            borderBottomColor: 'blue',
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}
          {...props}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: '#8db', flex: 1}}>
      <StatusBar />
      <Image
        resizeMode="cover"
        style={{
          width: 200,
          height: 300,
          alignSelf: 'center',
          borderRadius: 20,
        }}
        source={{
          uri: 'https://nuoithu.com/wp-content/uploads/2018/07/cho-Samoyed.jpg',
        }}
      />
      <View>
        <Input label="class" placeholder="class code" />
        <Input label="Name" placeholder="name" />

        <TouchableOpacity
          onPress={() => {
            setItem('rootScreen', 'inRoot');
            navigation.navigate('HomeScreen');
          }}
          style={{
            borderRadius: 10,
            borderColor: 'blue',
            borderWidth: 1,
            alignItems: 'center',
            padding: 20,
            margin: 20,
            alignSelf: 'center',
            width: '30%',
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default withNavigation(Auth);
