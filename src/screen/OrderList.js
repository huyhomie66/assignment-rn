import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
// import {setItem} from '../utils/AsycStorage';
import { getListBubbleTea, getListOrder } from '../service';

const IconChecked = () => (
  <Icon
    type="Feather"
    name="check"
    color="green"
    iconStyle={styles.iconStyle}
  />
);

const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [myOrder, setMyOrder] = useState();

  const getList = useCallback(async () => {
    let listBubbleTea = await getListBubbleTea();

    let listOrder = await getListOrder();
    console.log(listOrder);

    const orderedItem = listOrder.map(e => e.id);

    let data = [];
    listOrder.forEach(item => {
      data.push({ id: item.id, name: item.name, avatar: item.avatar });
    });
    setAllOrder(data);

    for (let i = 0; i < listBubbleTea.length; i++) {
      orderedItem.forEach(e => {
        if (listBubbleTea[i].id === e) {
          listBubbleTea[i].checked = true;
        }
      });
    }
    setList(listBubbleTea);
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const DrinKItem = ({ item, checked }) => {
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
      setChecked(checked);
    }, []);

    const onPressItem = useCallback(() => {
      const param = { id: item.id, name: item.name, avatar: item.avatar };
      setChecked(true);
      setAllOrder([...allOrder, param]);
      setMyOrder(param);
    }, []);

    return (
      <TouchableOpacity onPress={onPressItem} style={styles.box}>
        {useMemo(() => isChecked && <IconChecked />, [isChecked])}
        <Image source={{ uri: item.avatar }} style={styles.image} />
        <Text numberOfLines={1} style={styles.text}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{}}>
      {useMemo(
        () => (
          <FlatList
            style={styles.flatList}
            numColumns={2}
            data={list}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <DrinKItem checked={item.checked} item={item} key={item.id} />
            )}
          />
        ),
        [list]
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('OrderScreen', {
            myOrder: myOrder,
            allOrder: allOrder,
          })
        }
      >
        <Text style={styles.textButton}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#8db',
    height: Dimensions.get('window').height * 0.8,
  },
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
  image: { height: 200, width: 200, zIndex: -1 },
});

export default withNavigation(Home);
