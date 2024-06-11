  import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
  import React, { useEffect, useState } from 'react'
  import { FlashList } from '@shopify/flash-list';
  import Feather from '@expo/vector-icons/Feather';
  import { router } from 'expo-router';
  import { getCart, saveCart } from '~/modules/StorageGestion';
  import { API_URL } from '~/constants';
import  SkeletonLoader  from '~/components/SkeletonLoader';

    
    const CartScreen = () => {
      const [products, setProducts] = useState<any>([])
      const [loading, setLoading] = useState(false)
      useEffect(() => {
        const fetchValues = async () => {
          setLoading(true)
          try{
            const res = await getCart();
            setProducts(res)
          }
          catch(err)
          {
            console.log("The Error => ",err);
            
          }
          finally
          {
            setLoading(false)
          }
        }
        
        fetchValues()
      }, [])

      const removeItem = async ({id}: any) => {
        const updatedProducts = products.filter((item: any) => item.product.id !== id);
        setProducts(updatedProducts);
        await saveCart(updatedProducts);
      };

      const increment = async ({id}: any) => {
        const updatedProducts = products.map((item: any) => item?.product?.id === id ? { ...item, quantity: item.quantity + 1 } : item);
        setProducts(updatedProducts);
        await saveCart(updatedProducts);
      };

      const decrement = async ({id}: any) => {
        const updatedProducts = products.map((item: any) => 
          item.product.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setProducts(updatedProducts);
        await saveCart(updatedProducts);
      };
      const totalPrice = products.reduce((sum:any, item: any) => sum + item?.product?.price * item?.quantity, 0);
        
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri:  `${API_URL}/storage/${item?.product?.image}` }} />
      <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item?.product?.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => decrement({id: item?.product?.id})}>
            <Feather name="minus" size={16} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => increment({id: item?.product?.id})}>
            <Feather name="plus" size={16} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex justify-end items-end gap-1'>
        <Text style={styles.itemPrice}>${item?.product?.price}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem({id: item?.product?.id})}>
          <Feather name="trash-2" size={18} color="#f26060" />
        </TouchableOpacity>
      </View>
    </View>
  );


  const clearCart = async () => {
    setProducts([]);
    await saveCart([]);
  };
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
                <TouchableOpacity onPress={clearCart} className='w-24 h-12 justify-center items-center rounded-lg border  m-0'  style={{backgroundColor: "rgb(239 68 68)" }}>
                {/* <Feather name="shopping-cart" size={15} color="#fff" /> */}
                <Text className='text-center text-lg' style={{color: "#fff" }}>Clear All</Text>

              </TouchableOpacity>
              </View>
            </View>
          </View>
          {
            loading
            ?
            <>
             
            <SkeletonLoader />
              
            </>
            :
            <>
              {
              products?.length == 0
              ?
              <View className='justify-center items-center' style={{flex: 1}}>
                <Text className=''>No Products Found</Text>
              </View>
              :
            <FlashList
              data={products}
              keyExtractor={(item: any) => item?.product?.id}
              renderItem={renderItem}
              estimatedItemSize={200}
              />
            }
            </>
          }
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
          width: 80,
          height: 80,
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
          fontWeight: "500",
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
          marginTop: 12,
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
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          backgroundColor: "#fee2e2"
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
          backgroundColor: '#000',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
      },
      checkoutButtonText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: '500',
      },
      });
      
  export default CartScreen