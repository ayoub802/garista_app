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
import  ShoppingBagScreen  from '~/components/ShoppingCart';
import { useProductQuery } from '~/useFetch/useFetch';
import { FlashList } from '@shopify/flash-list';
import { getCart } from '~/modules/StorageGestion';
import { cartAtom } from '~/Atom/atoms';
import { useAtom } from 'jotai';

type Category = string;
type CartOrder = any[]; 
export default function AddOrder() {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOrder, setCartOrder] = useAtom<CartOrder>(cartAtom);

  useEffect(() => {
    const fetchValues = async () => {
      try{
            const res = await getCart();
            setCartOrder(res)
      }
      catch(err)
      {
        console.log("The Error => ",err);
        
      }
    }

    fetchValues()
  }, [cartOrder])




  const products = useProductQuery()
  const filteredData = selectedCategory != "All" ? products.data?.filter(item => item.categorie.name === selectedCategory) : products.data;
   
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
              <TouchableOpacity onPress={() => router.push('/cartScreen')} className='bg-black/55 relative w-12 h-12 justify-center items-center rounded-lg border m-0'  style={{borderColor: "#4b5563" }}>
              <Feather name="shopping-cart" size={15} color="#fff" />
              <View className='w-5 h-5 rounded-full justify-center items-center absolute -top-2 -left-1' style={{backgroundColor: "red"}}>
                <Text className='text-[12px]' style={{fontSize: 10}}>{cartOrder?.length}</Text>
              </View>
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
                renderItem={({ item }) => <ProductItem item={item}/>}
              />


              {/* <View>
                <Text className='text-black'>Hello</Text>
              </View> */}
           {/* </View> */}
        </ScrollView>
    </SafeAreaView>
  )
}

