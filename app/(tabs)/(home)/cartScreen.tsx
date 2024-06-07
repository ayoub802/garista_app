import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: 'https://via.placeholder.com/50' }} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Feather name="minus" size={16} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Feather name="plus" size={16} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Feather name="trash-2" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
  const items = [
    { id: '1', name: 'Lorem', price: 225.00, size: 'US 7', quantity: 1 },
    { id: '2', name: 'Lorem', price: 225.00, size: 'US 7', quantity: 1 },
    { id: '3', name: 'Lorem', price: 225.00, size: 'US 7', quantity: 1 },
  ];
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const CartScreen = () => {
  return (
    <View style={styles.container}>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
            <TouchableOpacity onPress={() => router.back()} className='bg-[#000]/55 w-12 h-12 justify-center items-center rounded-lg border  m-0' style={{borderColor: "#4b5563" }}>
            <Feather name="arrow-left" size={18} color="#fff" />
            </TouchableOpacity>
            <Text className='text-center text-lg' style={{color: "#fff" }}>Cart</Text>
            {/* <View>
            </View> */}
              <TouchableOpacity onPress={() => router.push('/cart')} className='w-24 h-12 justify-center items-center rounded-lg border  m-0'  style={{backgroundColor: "rgb(239 68 68)" }}>
              {/* <Feather name="shopping-cart" size={15} color="#fff" /> */}
              <Text className='text-center text-lg' style={{color: "#fff" }}>Clear All</Text>

            </TouchableOpacity>
            </View>
          </View>
        </View>
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
        <View style={styles.footer}>
            <View className='flex items-center gap-1 flex-row'>
                <Text style={styles.totalText}>Total :</Text>
                <Text style={styles.totalPrice}>{totalPrice.toFixed(2)}$</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
            </TouchableOpacity>
        </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    itemSize: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    quantityText: {
        fontSize: 14,
        marginHorizontal: 10,
    },
    deleteButton: {
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalText: {
        fontSize: 16,
        fontWeight: "600",
        textTransform: "uppercase"
    },
    totalPrice: {
        fontSize: 16,
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    });
    
export default CartScreen