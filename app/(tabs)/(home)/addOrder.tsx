import { StatusBar } from 'expo-status-bar';
import { View,  StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '~/components/ui/text';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import TabsFilter from '~/components/TabFilter/TabFilter';
import React, {useEffect, useState} from 'react';
import { data } from '~/constants';
import  ProductItem  from '~/components/Product/ProductItem';
import { useProductQuery } from '~/useFetch/useFetch';
import { FlashList } from '@shopify/flash-list';


export default function AddOrder() {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantity, setQuantity] = useState(1);

  const increment = (id: number) => {
    // setProducts(products.map(product => product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
  };

  const decrement = (id: number) => {
    // setProducts(products.map(product => product.id === id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product));
  };
  const products = useProductQuery()
  console.log("The Filtered of Products => ", selectedCategory);
  const filteredData = selectedCategory != "All" ? products.data?.filter(item => item.categorie.name === selectedCategory) : products.data;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     products.refetch();
  //   }, 500); // Polling every 5 seconds

  //   return () => clearInterval(interval);
  // }, [products.refetch]);
   
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
            <TouchableOpacity onPress={() => router.back()} className='bg-[#000]/55 w-12 h-12 justify-center items-center rounded-lg border  m-0' style={{borderColor: "#4b5563" }}>
            <Feather name="arrow-left" size={18} color="#fff" />
            </TouchableOpacity>
            <Text className='text-center text-lg' style={{color: "#fff" }}>Add Order</Text>
            {/* <View>
            </View> */}
              <TouchableOpacity  className='bg-black/55 w-12 h-12 justify-center items-center rounded-lg border  m-0'  style={{borderColor: "#4b5563" }}>
              <Feather name="shopping-cart" size={15} color="#fff" />
            </TouchableOpacity>
            </View>
          </View>
        </View>


        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
           {/* <View style={{flex:1}}> */}
              <TabsFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

              <FlashList
                data={filteredData}
                estimatedItemSize={200}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ProductItem item={item} increment={increment} decrement={decrement} quantity={quantity}/>}
              />
              {/* <View>
                <Text className='text-black'>Hello</Text>
              </View> */}
           {/* </View> */}
        </ScrollView>
    </SafeAreaView>
  )
}

