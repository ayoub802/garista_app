import { View,  Image, TouchableOpacity, StyleSheet,  } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { AntDesign } from '@expo/vector-icons';
import { API_URL } from '~/constants';
import { getCart, saveCart } from '~/modules/StorageGestion';

const ProductItem = ({ item,data }) => {

  const [quantity, setQuantity] = useState(1);

  const [isAdded, setIsAdded] = useState(false)
  const addToCart = async (product) => {
    try {
      let cartProducts = await getCart(); // Retrieve existing cart
      if (!cartProducts) cartProducts = []; // Initialize if cart is empty
  
      const productIndex = cartProducts.findIndex(item => item?.product?.id === product.id);
  
      if (productIndex > -1) {
        // If product already exists, update its quantity
        cartProducts[productIndex].quantity += quantity;
      } else {
        // If product does not exist, add new product with quantity
        cartProducts.push({
          product: product,
          quantity: quantity,
        });
      }
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false)
      }, 1000)
  
      // await saveCart(cartProducts);  // Save the updated cart
      // console.log("Success:", cartProducts);

    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }

  const increment = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decrement = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  return (
    <View style={styles.itemContainer }>
    <Image source={{ uri:  `${API_URL}/storage/${item.image}` }} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.price}>{item?.price} {data?.currency}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={{
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
        }} onPress={() => decrement()}>
        <AntDesign name="minus" size={15} color="#333" />
        </TouchableOpacity>
        <Text style={styles.counter}>{quantity}</Text>
        <TouchableOpacity style={{
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
          }} onPress={() => increment()}>
          {/* <Text>+</Text> */}
          <AntDesign name="plus" size={15} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
    <Button variant={"outline"} style={{borderRadius: 8, backgroundColor:isAdded ? "#fff" : "#000"}} onPress={() => addToCart(item)}>
      <Text style={{color: isAdded ?  "#000" : "#fff"}}>{isAdded ? "Added ..." : "Add to cart"}</Text>
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