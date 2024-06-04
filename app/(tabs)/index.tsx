import { StatusBar } from 'expo-status-bar';
import { View,  StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Octicons } from '@expo/vector-icons';
import CardList from '~/components/CardList';
import { FlashList } from "@shopify/flash-list";
import {OrderDetail, dataList} from "../../constants/index"
import { Skeleton } from '~/components/ui/skeleton';
import { Ionicons } from '@expo/vector-icons';

import { useCallback, useMemo, useRef } from 'react';


export default function Tab() {
  const DATA = [
    {
      id: 1,
      title: "Notification",
    },
    {
      id: 2,
      title: "Order",
    },
    {
      id: 2,
      title: "Order Complete",
    },
  ];




  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
            <TouchableOpacity  className='bg-[#000]/55 w-12 h-12 justify-center items-center rounded-lg border  m-0' style={{borderColor: "#4b5563" }}>
              <AntDesign name="plus" size={18} color="white" className='m-0'/>
            </TouchableOpacity>
            <Text className='text-center text-lg' style={{color: "#fff" }}>Hello</Text>
            {/* <View>
            </View> */}
              <TouchableOpacity  className='bg-black/55 w-12 h-12 justify-center items-center rounded-lg border  m-0'  style={{borderColor: "#4b5563" }}>
              <Octicons name="bell" size={18} color="white" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View className='justify-center self-center items-center mt-2 bg-white'>
            {/* <TouchableOpacity onPress={handlePresentModalPress}>
              <Text className='text-black text-center text-lg'>Press</Text>
            </TouchableOpacity> */}

            <View className='mt-5'>
              
              <View className='flex flex-row items-center gap-2 justify-between self-center max-w-[90%]' style={{alignSelf: "center",}}>
                <FlashList 
                data={DATA}
                numColumns={3}
                estimatedItemSize={200}

                renderItem={({item, index}) => {
                  console.log("The Index => ", index);
                  
                  return(
                  <Card  className='bg-[#f8f9fa] border-gray-300 h-32 w-full'>
                    <CardHeader className='px-0 justify-center items-center'>
                      <CardTitle className='text-black text-sm'>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text className='text-black text-center text-sm'>Nombre :</Text>
                    </CardContent>
                  </Card>
                  )
                }}
                />
              </View>
              
              
            </View>
            <View className='mt-2 max-w-[90%] self-center '>
              <View className='justify-between items-center w-full flex-row my-3'>
                <Text className='text-black text-center text-md'>Orders</Text>
                <Text className='text-black text-center text-md'>View All</Text>
              </View>
            </View>
          </View>

          <FlashList 
            data={OrderDetail}
            estimatedItemSize={200}
            renderItem={({item}) => <CardList item={item}/>}
          />

        </ScrollView>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  skeletonCircle: {
    height: 48, // 12 * 4
    width: 48, // 12 * 4
    borderRadius: 24, // height / 2
    backgroundColor: '#ccc', // Replace with your desired color
  },
  skeletonLine: {
    height: 32, // 8 * 4
    width: 256, // 64 * 4
    borderRadius: 4,
    backgroundColor: '#ccc', // Replace with your desired color
  },
  overlay:{
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});