import { View, TouchableOpacity, Animated  } from 'react-native'
import React, { useCallback, useMemo, useRef, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '~/components/ui/card';
  import { Text } from '~/components/ui/text';
  import { Ionicons } from '@expo/vector-icons';
import ModalBot from "../components/modal/Modal"
const CardList = ({item}) => {

  const bottomSheetModalRef = useRef(null);

  const bounceValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (item.status === "New") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [item.status]);
  // variables
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
  }, []);

  return (
    <View className='max-w-[90%] self-center w-full' style={{marginBottom: 8}}>
        <TouchableOpacity onPress={handlePresentModalPress} className='w-full border rounded-2xl flex flex-row justify-between items-center' style={{
          borderColor: "#4b556325",
          paddingHorizontal: 20,
          paddingVertical: 20
        }}>
          {/* <View className='flex flex-row items-center gap-3 w-full bg'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <View className='flex gap-2 '>
              <Skeleton className='h-8 w-64 rounded-md'   />

            </View>
          </View> */}
            <View className='flex flex-col gap-1'>
              <Text className='text-black  text-md mb-1'>Tables : {item.table}</Text>
              <View className='flex flex-row items-center gap-2'>
                  <Ionicons name="calendar" size={14} color="#6b7280" />
                  <Text className='text-gray-500  text-sm'>08 Jan 2023</Text>
              </View>
              <View className='flex flex-row items-center gap-2'>
              <Ionicons name="time-outline" size={14} color="#6b7280" />
                  <Text className='text-gray-500  text-sm'>01:00 PM</Text>
              </View>
            </View>
            <View className='flex flex-col items-end gap-2'>
              <View className='flex flex-row items-center ' style={{gap: 6}}>
                    {item.status === "New" ? (
                    <Animated.View style={{ transform: [{ scale: bounceValue }], backgroundColor: "rgb(34, 197, 94)", width: 10, height: 10 }}  className='w-2.5 h-2.5 bg-green-500 rounded-full'></Animated.View>
                  ) : (
                    <View className='w-2.5 h-2.5  rounded-full'></View>
                  )}
                <Text className=' text-right text-md font-medium' style={{color: "rgb(34, 197, 94)",}}>New</Text>
              </View>
              <View>
                  <Text className='text-black text-center text-md'>{item.totale}.00 MAD</Text>
              </View>

            </View>
        </TouchableOpacity>

        <ModalBot bottomSheetModalRef={bottomSheetModalRef} handleSheetChanges={handleSheetChanges} snapPoints={snapPoints} />
              {/* <View>
                <Button>
                  <Text>View Order</Text>
                </Button>
              </View> */}
    </View>
  )
}

export default CardList