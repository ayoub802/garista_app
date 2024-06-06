import { View,  Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { AntDesign } from '@expo/vector-icons';
import { API_URL } from '~/constants';
const ProductItem = ({ item, increment, decrement, quantity }) => {
  return (
    <View style={styles.itemContainer}>
    <Image source={{ uri:  `${API_URL}/storage/${item.image}` }} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.price}>{item?.price} €</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={{
                backgroundColor: "#000",
                height: 25,
                width: 25,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
        }} onPress={() => decrement(item.id)}>
        <AntDesign name="minus" size={15} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.counter}>{quantity}</Text>
        <TouchableOpacity style={{
                backgroundColor: "#000",
                height: 25,
                width: 25,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
        }} onPress={() => increment(item.id)}>
          {/* <Text>+</Text> */}
          <AntDesign name="plus" size={15} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    <Button variant={"outline"} style={{borderRadius: 8}}>
      <Text style={{color: "#fff"}}>Add to cart</Text>
    </Button>
  </View>
  )
}
const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: 20,
      padding: 10,
      flex: 1,
      paddingBottom: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "#000"
    },
    price: {
      color: '#666',
      fontSize: 15,
      fontWeight: "500",
      marginVertical: 5,
    },
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    counterButton: {
      fontSize: 20,
      lineHeight: 0,
      paddingTop: 0,
      marginTop: 0,
      paddingHorizontal: 10,
    },
    counter: {
      marginHorizontal: 10,
      fontSize: 16,
      color: "#000"
    },
  });
export default ProductItem