import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useOrderQuery } from '~/useFetch/useFetch';
import { FlashList } from '@shopify/flash-list';
import CardList from '~/components/CardList';
import { useEffect, useState } from 'react';

export default function Tab() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: result,error, refetch } = useOrderQuery();

  useEffect(() => {
    if (result) {
      setData((prevData: any) => [...prevData, ...result]);
      setIsLoading(false);
    }
  }, [result]);

  const loadMoreData = () => {
    if (!isLoading) {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
      refetch();
    }
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error fetching orders</Text>
      </SafeAreaView>
    );
  }
  console.log("The Data => ", data);
  
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
             <Text className='text-center text-lg' style={{color: "#fff" }}>All Orders</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
        {
          data.length > 0
            ?
            <FlashList
              data={data}
              estimatedItemSize={100}
              renderItem={({ item }) => <CardList item={item} />}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
            :
            <View>
              <Text className='text-black text-center font-medium' style={{ fontSize: 19 }}>No Orders Found</Text>
            </View>
        }
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
