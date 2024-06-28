import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useOrderQuery } from '~/useFetch/useFetch';
import { FlashList } from '@shopify/flash-list';
import CardList from '~/components/CardList';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import axios from 'axios';
export default function Tab() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data: result, error, isLoading: isQueryLoading, refetch } = useOrderQuery();
  const today = dayjs().startOf('day');
  //  result?.data.map((item: any) => {


    // useEffect(() => {
    //   const claimsRef = ref(database, 'orders');
  
    //   onValue(claimsRef, (snapshot) => {
    //     const data = snapshot.val();
    //     const claimsList = [];
    //     for (let id in data) {
    //       claimsList.push({ id, ...data[id] });
    //     }
    //     setData(claimsList);
    //   });
    // }, []);
    const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Firebase
    const fetchDataFromFirebase = async () => {
      const claimsRef = ref(database, 'orders');
  
      onValue(claimsRef, (snapshot) => {
        const data = snapshot.val();
        const claimsList = [];
        for (let id in data) {
          claimsList.push({ id, ...data[id] });
        }
        setData(claimsList);
      });
      setLoading(false);
    };

    fetchDataFromFirebase();
  }, []);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/order_resto/5');
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    if (!loading) {
    //   // Wait for a moment before replacing the data
      setTimeout(() => {
        fetchDataFromApi();
      }, 5000); // Replace with your desired delay
    }
  }, [loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error fetching orders</Text>
      </SafeAreaView>
    );
  }

  

  const filteredData = data?.filter((order:any) => {
    const isSameDay = dayjs(order.created_at).isSame(today, 'day')

    return isSameDay;
    // console.log("The Date => ", order, dayjs(order.created_at).isSame(today, 'day'));
  });
  console.log("The Data => ", data);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
             <Text className='text-center text-lg' style={{color: "#fff" }}>All Orders of This Day</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, width: '100%', marginTop: 25 }}>
          {isLoading ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : filteredData?.length > 0 ? (
            <FlashList
              data={filteredData}
              estimatedItemSize={200}
              renderItem={({ item }) => <CardList item={item} />}
              onEndReachedThreshold={1}
            />
          ) : (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text className='text-black text-center font-medium' style={{ fontSize: 19 }}>No Orders Found</Text>
            </View>
          )}
        </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});
