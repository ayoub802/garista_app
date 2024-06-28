import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useOrderQuery, useTablesQuery } from '~/useFetch/useFetch';
import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';

export default function Tab() {
  const { data: tables} = useTablesQuery()
  const { data: orders } = useOrderQuery();

  const currentDate = new Date().toISOString().split('T')[0];
  const todayOrders = orders?.filter((order: any) => order.created_at.startsWith(currentDate));

  const hasOrderForToday = (tableId: any) => {
    return todayOrders?.some((order: any) => order.table_id === tableId);
  };

  // const hasOrderForToday = (tableId: any) => {
  //   return orders?.some((order: any) => order.table_id === tableId);
  // };

  console.log("The Orders => ", todayOrders);
  
  const TableRectangle = ({item}: any) => {
    
    console.log("is Has Order => ", hasOrderForToday(item.id));
    const backgroundColor = hasOrderForToday(item.id) ? "#212121" : "#d9d9d9";
    return (
      <TouchableOpacity className='relative z-10 ' style={{marginBottom: 50, marginTop: 25}}>
        <View className='rounded-xl border-[3px] justify-center items-center' style={{backgroundColor: backgroundColor, width: 120, height: 50, zIndex: 100,borderColor: "#fff"}}>
          <Text style={{color: "#fff", fontSize: 14, fontWeight: 500}}>{item?.name}</Text>
        </View>
          <View className='rounded-full absolute' style={{width: 25, height: 25,zIndex: -100 ,backgroundColor: backgroundColor, top: -16, left: 20}}></View>
          <View className='rounded-full absolute' style={{width: 25, height: 25,zIndex: -100 ,backgroundColor: backgroundColor, top: -16, left: 75}}></View>
          <View className='rounded-full absolute' style={{width: 25, height: 25,zIndex: -100 ,backgroundColor: backgroundColor, top: 44, left: 20}}></View>
          <View className='rounded-full absolute' style={{width: 25, height: 25,zIndex: -100 ,backgroundColor: backgroundColor, top: 44, left: 75}}></View>
      </TouchableOpacity>

    )
  }


  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
              <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
             <Text className='text-center text-lg' style={{color: "#fff" }}>Tables</Text>
            </View>
          </View>
        </View>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", width: 450, alignSelf: "center", marginTop: 25}}>
          <FlatList
              data={tables}
              numColumns={3}
              key={(tables?.length ?? 0).toString()}
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({item}) => <TableRectangle item={item}/>}
              // estimatedItemSize={200}
            />
         </View>
     </SafeAreaView>
  );
}
{/* <TableRectangle /> */}
