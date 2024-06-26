import { StatusBar } from 'expo-status-bar';
import { View,  StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser, removeCart } from '~/modules/StorageGestion';
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
import {OrderDetail, dataList, DATA} from "../../../constants/index"
import { Skeleton } from '~/components/ui/skeleton';
import { Ionicons } from '@expo/vector-icons';
import NotificationsList from '../../../components/NotificationsList';
import {ScrollView} from "react-native-gesture-handler"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { orderAtom, restoAtom, userId } from '~/Atom/atoms';
import { useOrderFirebaseQuery, useOrderQuery, useRestoQuery } from '~/useFetch/useFetch';
import dayjs from "dayjs";
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { database } from '~/firebaseConfig';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
export default function Tab() {

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const gap = 5;
  const availableSpace = screenWidth - (numColumns + 7) * gap;
  const itemSize = availableSpace / numColumns;

  const { isLoading } = useRestoQuery();
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [loadingOrder, setLoadingOrder] = useState(false)
  const [restos, setRestos] = useAtom<any>(restoAtom);
  const [orderResto, setOrderResto] = useAtom(orderAtom);
  const restoId = restos?.id
   const { data: result, error,  refetch } = useOrderQuery();
   const { data: fireOrder, isLoading: isQueryLoading,} = useOrderFirebaseQuery();

   const today = dayjs().startOf('day');
  //  result?.data.map((item: any) => {



    useEffect(() => {
      // Fetch data from Firebase
      const fetchDataFromFirebase = async () => {
        setLoadingOrder(true)
        const ordersRef = ref(database, 'orders');
        // const restoOrdersQuery = query(ordersRef, orderByChild('resto_id'), equalTo(restoId));
        // console.log("The query From Firebase => ", restoOrdersQuery);

        onValue(ordersRef, (snapshot) => {
          const data = snapshot.val();
          console.log("The Data From Firebase => ", data);
          const claimsList = [];

          for (let id in data) {
            
            claimsList.push({ id, ...data[id] });
          }
          claimsList.sort((a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf());

          setDataOrder(claimsList);
        });
        setLoadingOrder(false)
      };
  
      fetchDataFromFirebase();
    }, []);

    const filteredData = dataOrder?.filter((order:any) => {
      let isSameDay = dayjs(order.created_at).isSame(today, 'day');
      isSameDay = order?.resto_id == restoId;

      return isSameDay;
    });

  if(isLoading && loadingOrder)
  {
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
         <ActivityIndicator size={"small"} color={"#000"}/>
      </View>
    )
  }



  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
            <TouchableOpacity onPress={() => router.push('/addOrder')} className='bg-[#000]/55 w-12 h-12 justify-center items-center rounded-lg border  m-0' style={{borderColor: "#4b5563" }}>
              <AntDesign name="plus" size={18} color="white" className='m-0'/>
            </TouchableOpacity>
            <Text className='text-center text-lg' style={{color: "#fff" }}>{restos?.name}</Text>
            {/* <View>
            </View> */}
              <TouchableOpacity  className='bg-black/55 w-12 h-12 justify-center items-center rounded-lg border  m-0'  style={{borderColor: "#4b5563" }}>
              <Octicons name="bell" size={18} color="white" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          <View className='justify-center self-center items-center mt-2 bg-white'>
            {/* <TouchableOpacity onPress={handlePresentModalPress}>
              <Text className='text-black text-center text-lg'>Press</Text>
            </TouchableOpacity> */}
    
            <View className='mt-5'>
              
              <View className='flex flex-row items-center gap-2 justify-between self-center max-w-[90%]' style={{alignSelf: "center",}}>
                  <Card style={{  height: itemSize, width: itemSize }} className='bg-[#f8f9fa] border-gray-300 '>
                    <CardHeader className='px-0 justify-center items-center'>
                      <CardTitle className='text-black text-sm'>Notification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text className='text-black text-center text-sm'>250 notification</Text>
                    </CardContent>
                  </Card>
                  <Card style={{  height: itemSize, width: itemSize }} className='bg-[#f8f9fa] border-gray-300 '>
                    <CardHeader className='px-0 justify-center items-center'>
                      <CardTitle className='text-black text-sm'>Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text className='text-black text-center text-sm'>{filteredData?.length}{'\n'} orders</Text>
                    </CardContent>
                  </Card>
                  <Card style={{  height: itemSize, width: itemSize }} className='bg-[#f8f9fa] border-gray-300 '>
                    <CardHeader className='px-0 justify-center items-center'>
                      <CardTitle className='text-black text-sm'>Orders Complete</CardTitle>
                    </CardHeader>
                    <CardContent className='px-0'>
                      <Text className='text-black text-center text-sm'>25 {'\n'} Order complete</Text>
                    </CardContent>
                  </Card>
              </View>
              
              
            </View>
            <View className='max-w-[90%] self-center '>
              <View className='justify-between items-center w-full flex-row' style={{ marginVertical: 12,marginTop: 30}}>
                <Text className='text-black text-center font-medium' style={{fontSize: 19}}>Orders</Text>
                <Text className='text-black text-center ' style={{fontSize: 16}}>View All</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, width: '100%' }}>
            {
              filteredData?.length > 0
              ?
              <FlashList 
                data={filteredData}
                estimatedItemSize={100}
                renderItem={({item}) => <CardList item={item}/>}
              />
              :

              <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <Text className='text-black text-center font-medium' style={{fontSize: 19}}>No Orders Today</Text>
              </View>
            }
          </View>

        </ScrollView>
        {/* <View>
          <NotificationsList />
        </View> */}
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