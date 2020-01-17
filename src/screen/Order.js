import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { lockOrder, createOrder } from '../service';

const screenWidth = Dimensions.get('window').width;
const Order = ({ navigation }) => {
  const myOrder = navigation.getParam('myOrder');
  const allOrder = navigation.getParam('allOrder');

  const OrderBox = ({ item, isAllOrderList }) => {
    return (
      <View style={styles.orderBox}>
        <View style={styles.imageBox}>
          <Image
            source={{ uri: item.avatar }}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
        <Text>{item.name}</Text>
        <TouchableOpacity
          onPress={() => {
            if (!isAllOrderList) {
              navigation.goBack();
            }
          }}
          style={styles.change}
        >
          <Text>{isAllOrderList ? 1 : 'Change'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;
  const closeOrder = async teaId => {
    const param = {
      classCode: 'wd01',
      student: 'Trần Quốc Huy',
      teaId: myOrder.id,
    };
    await createOrder(param);
    await lockOrder('wd01');
  };

  return (
    <View style={styles.container}>
      <Title>My Order</Title>
      <OrderBox item={myOrder} />

      <Title>All Order</Title>
      <FlatList
        data={allOrder}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <OrderBox isAllOrderList={true} key={index} item={item} />
        )}
      />
      <TouchableOpacity onPress={closeOrder} style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Close Order</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { padding: 10, fontWeight: 'bold', fontSize: 20 },
  container: {
    flex: 1,
    backgroundColor: '#8db',
  },
  imageBox: {
    backgroundColor: '#00c3e3',
    width: 100,
    alignItems: 'center',
  },
  change: {
    paddingHorizontal: 10,
    height: '100%',
    width: 100,
    backgroundColor: '#ffc6c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBox: {
    width: screenWidth,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    backgroundColor: 'white',
  },
});

export default withNavigation(Order);
