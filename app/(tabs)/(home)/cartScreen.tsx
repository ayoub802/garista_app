  import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
  import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
  import { FlashList } from '@shopify/flash-list';
  import Feather from '@expo/vector-icons/Feather';
  import { router } from 'expo-router';
  import { getCart, saveCart } from '~/modules/StorageGestion';
  import { API_URL } from '~/constants';
import  SkeletonLoader  from '~/components/SkeletonLoader';
import axiosInstance from '~/axiosInstance';
import { restoAtom } from '~/Atom/atoms';
import { useAtom } from 'jotai';
import ModalTable from "~/components/modal/ModalTable"
import { useInfosQuery } from '~/useFetch/useFetch';

    
    const CartScreen = () => {
      const [products, setProducts] = useState<any>([])
      const [loading, setLoading] = useState(false)
      const [tables, setTables] = useState<any[]>([]);
      const [disableCheck, setDisableCheck] = useState(true)
      const [restos, ] = useAtom(restoAtom);
      const restoId = restos?.id
      const { data, error, isLoading: isQueryLoading, refetch } = useInfosQuery(restoId);


    const fetchTables = async () => {
      try {
        const response = await axiosInstance.get(`/tables/${restos?.id}`);
        const data = response.data;
        setTables(data);
      } catch (err) {
        console.log("Error fetching tables: ", err);
      }
    };
    
    useEffect(() => {
      const fetchValues = async () => {
        setLoading(true)
        try{
          const res = await getCart();
          setProducts(res)
          setDisableCheck(res.length === 0); // Update disableCheck based on cart contents
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
      fetchTables()
      fetchValues()
    }, [])


    const updateCart = async (updatedProducts: any) => {
      setProducts(updatedProducts);
      await saveCart(updatedProducts);
      setDisableCheck(updatedProducts.length === 0); // Update disableCheck based on cart contents
    };
    const removeItem = async ({id}: any) => {
      const updatedProducts = products.filter((item: any) => item.product.id !== id);
      updateCart(updatedProducts);

    };

    const increment = async ({id}: any) => {
      const updatedProducts = products.map((item: any) => item?.product?.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      updateCart(updatedProducts);

    };

    const decrement = async ({id}: any) => {
      const updatedProducts = products.map((item: any) => 
        item.product.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      updateCart(updatedProducts);

    };
    const totalPrice = products.reduce((sum:any, item: any) => sum + item?.product?.price * item?.quantity, 0);
    
    // if(totalPrice != 0)
    // {
    //   setDisableCheck(true)
    // }
    console.log("The Tables => ",products);
    const SUbmitOrder = async ({tabel_id}: any) => {
      try{
        let cartItemProduct = products.map((item: any) => ({
          type: item.product.type,  // Assuming all items are dishes
          id: item.product.id,
          quantity: item.quantity
        }));

        
      const order = {
        total: totalPrice,
        status: 'New',
        table_id: tabel_id,  // Assuming static for now, you may need to adjust this based on your app's logic
        resto_id: restoId,   // Assuming static as well, adjust accordingly
        cartItems: cartItemProduct
      };
      console.log("The order is ",order);

      const response = await fetch(`https://backend.garista.com/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorResponse}`);
      }

      const responseData = await response.json();
      console.log('Order submitted:', order, cartItemProduct, responseData);
      if(response)
      {
        const notification = {
          title: "New Order",
          status: "Order",
          resto_id: restoId,
          table_id: tabel_id,
        };
        const formData = new FormData();
        formData.append("title", "New Order");
        formData.append("status", "Order");
        formData.append("resto_id", restoId);
        const responseNotification = await fetch(`https://backend.garista.com/api/notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(notification)
        });
        }

        saveCart([])
        setProducts([])
        bottomSheetModalRef.current?.close()
      }
      catch(err)
      {
        console.log("The Error => ", err);
        
      }
    }
        
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
        <Text style={styles.itemPrice}>{item?.product?.price} {data?.currency}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem({id: item?.product?.id})}>
          <Feather name="trash-2" size={18} color="#f26060" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: any) => {
  }, []);
  const clearCart = async () => {
    setProducts([]);
    await saveCart([]);
    setDisableCheck(true); // Disable checkout button when cart is cleared
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
                    <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} {data?.currency}</Text>
                </View>
                <TouchableOpacity onPress={handlePresentModalPress} disabled={disableCheck} style={[styles.checkoutButton, {backgroundColor: !disableCheck ? "#000" : "#888" }]}>
                <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>

            <ModalTable bottomSheetModalRef={bottomSheetModalRef} SUbmitOrder={SUbmitOrder} handleSheetChanges={handleSheetChanges} snapPoints={snapPoints} tables={tables}/>
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
          // backgroundColor: '#000',
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