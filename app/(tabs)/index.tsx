import { StatusBar } from 'expo-status-bar';
import { View,  StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
import {dataList} from "../../constants/index"
import { Skeleton } from '~/components/ui/skeleton';

export default function Tab() {
  const DATA = [
    {
      id: 1,
      title: "First Item",
    },
    {
      id: 2,
      title: "Second Item",
    },
  ];
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'/>
      <View className='max-w-[90%] justify-center self-center items-center mt-2 bg-white'>
        <View className='flex flex-row justify-between items-center w-full'>
        <TouchableOpacity  className='bg-gray-100 w-12 h-12 justify-center items-center rounded-lg border border-gray-300 m-0'>
          <AntDesign name="plus" size={18} color="black" className='m-0'/>
        </TouchableOpacity>
        <Text className='text-black text-center text-sm'>Hello</Text>
        {/* <View>
        </View> */}
          <TouchableOpacity  className='bg-gray-100 w-12 h-12 justify-center items-center rounded-lg border border-gray-300 m-0'>
          <Octicons name="bell" size={18} color="black" />
        </TouchableOpacity>
        </View>

        <View className='mt-5'>
          
           <View className='flex flex-row items-center gap-2 justify-between self-center' style={{alignSelf: "center"}}>
           <Card className='max-w-[110px] bg-gray-100 border-gray-300 h-36 '>
            <CardHeader className='px-0 justify-center items-center'>
              <CardTitle className='text-black text-sm'>Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className='text-black text-center text-sm'>Nombre of Orders :</Text>
            </CardContent>

          </Card>
           <Card className='max-w-[110px] bg-gray-100 border-gray-300 h-36'>
            <CardHeader className='px-0 justify-center items-center'>
              <CardTitle className='text-black text-sm'>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className='text-black text-center text-sm'>Nombre of Orders :</Text>
            </CardContent>

          </Card>
           <Card className='max-w-[110px] bg-gray-100 border-gray-300 h-36'>
            <CardHeader className='px-0 justify-center items-center max-w-[75%] mx-auto'>
              <CardTitle className='text-black text-sm text-center'>Orders Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className='text-black text-center text-sm'>Nombre of Orders :</Text>
            </CardContent>

          </Card>
           </View>
          
          
        </View>
        <View className='mt-2'>
           <Skeleton className='h-12 w-12 rounded-full' />
        </View>
      </View>
    </SafeAreaView>
  );
}


