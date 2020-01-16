import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';

const IconChecked = () => (
  <Icon
    type="Feather"
    name="check"
    color="green"
    iconStyle={styles.iconStyle}
  />
);

const DrinKItem = ({item, checked}) => {
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(checked);
  }, []);

  return (
    <TouchableOpacity onPress={() => setChecked(true)} style={styles.box}>
      {useMemo(() => isChecked && <IconChecked />, [isChecked])}
      <Image source={{uri: item.avatar}} style={styles.image} />
      <Text numberOfLines={1} style={styles.text}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [list, setList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const getList = useCallback(async () => {
    let orderList = await fetch(
      'https://boba.ansuzdev.com/api/bubbleTeas',
    ).then(res => res.json());

    let listOrder = await fetch(
      'https://boba.ansuzdev.com/api/orders?classCode=wd01',
    ).then(res => res.json());

    const orderedItem = listOrder.map(e => e.id);
    setCheckedList(orderedItem);

    for (let i = 0; i < orderList.length; i++) {
      orderedItem.forEach(e => {
        if (orderList[i].id === e) {
          orderList[i].checked = true;
        }
      });
    }
    setList(orderList);
  }, []);

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={{}}>
      <FlatList
        style={{
          backgroundColor: '#8db',

          height: Dimensions.get('window').height * 0.8,
        }}
        numColumns={2}
        data={list}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <DrinKItem checked={item.checked} item={item} key={item.id} />
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 100,
    height: 200,
    width: 200,
    fontSize: 200,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 30,
    paddingVertical: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  box: {
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.45,
    margin: 10,
  },
  image: {height: 200, width: 200, zIndex: -1},
});

export default Home;
