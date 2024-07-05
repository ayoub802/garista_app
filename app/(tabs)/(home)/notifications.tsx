import { StatusBar } from 'expo-status-bar';
import { View,  StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '~/components/ui/text';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Notifications from 'expo-notifications';

import { Button } from '~/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '~/axiosInstance';
import { FlashList } from '@shopify/flash-list';
import { useAtom } from 'jotai';
import { restoAtom } from '~/Atom/atoms';
import { useNotificationQuery } from '~/useFetch/useFetch';
const windowWidth = Dimensions.get('screen').width
export default function Tab() {
    const [notificationData, setNotificationData] = useState<any[]>([]);
    const [restos, ] = useAtom(restoAtom);
    const restoId = restos?.id
    
    const { data, error, isLoading: isQueryLoading, refetch } = useNotificationQuery(restoId);
    const [notification, setNotification] = useState<any[]>(data);

    const RenderNotification = ({item}: any) => {
        // console.log('The Notification Test => ',item);
        const tableName = item?.table?.name ?  item?.table?.name : item?.table
        return(
            <View className="rounded-lg border border-gray-200 bg-white p-4 mb-4" style={{borderWidth: 1,borderColor: "#e5e7eb", backgroundColor: "#fff", marginBottom: 16, padding: 16, borderRadius: 8 }}>
                    <View className="flex items-center flex-row justify-between">
                        <View>
                            <Text className="text-lg font-medium" style={{color: "#000"}}>{item.title}</Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">Table: {tableName}</Text>
                        </View>
                        <View className="flex items-center gap-2">
                            <Text className='text-gray'>{new Date(item.created_at).toLocaleString()}</Text>
                        </View>
                    </View>
            </View>
        )
    }

    const notificationListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        // Configure notification handler
        notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
            const NotData = notification.request.content.data;
            // let Data: any = [];
            // Data.push(NotData)
            // fetchNotifications();
            refetch()
        });

        return () => {
            notificationListener.current &&
              Notifications.removeNotificationSubscription(
                notificationListener.current
              );
          };
    }, []);
    // const handleNotification = (notification: any) => {
        //     // Handle incoming notification from Expo
        //     setNotification(notification);
        // };
        // console.log('Received Notification Data:', data);


    // console.log("The Notification of The Orders & =>",notification);

    // useEffect(() => {
    //     if (notificationData) {
    //         // Replace notification from Expo with data from the endpoint
    //         setNotification(notificationData);
    //     }
    // }, [notificationData]);
    // const contentInsets = { top: 0, bottom: 0, left: 0, right: 0 };

    // console.log("The Notification => ", notification);
    
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
            <Text className='text-center text-lg' style={{color: "#fff" }}>Notifications</Text>
            {/* <View>
            </View> */}
             <View></View>
            </View>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 25}}>

            <View style={{width: windowWidth * 0.9, alignSelf: "center"}}>
            {  
                    data?.length == 0
                    ?
                    <View style={{ justifyContent: "center", alignItems: "center"}}><Text className='text-center' style={{color: "#000"}}>No Notifications found</Text></View>
                    :
                    <FlatList 
                    //  estimatedItemSize={200}
                     data={data?.slice(0, 15)}
                     keyExtractor={(item: any) => item?.id}
                     renderItem={({ item }) => <RenderNotification item={item}/>}
                    />
                }
            </View>
        </View>


    </SafeAreaView>
  );
}
{/* <RenderNotification /> */}

