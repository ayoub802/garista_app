import { View, StyleSheet } from 'react-native'
import React from 'react'
import {
    BottomSheetModal,
    BottomSheetView,
  } from '@gorhom/bottom-sheet'
  import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '~/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import dayjs from 'dayjs';
import { useOrderDetailQuery } from '~/useFetch/useFetch';
import { API_URL } from '~/constants';
const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

const ModalBot = ({
    handleSheetChanges,
    bottomSheetModalRef,
    snapPoints,
    item
}) => {

  const formattedDate = dayjs(item.created_at).format('M/D/YYYY');
  const formattedTime = dayjs(item.created_at).format('hh:mm:ss A');

  const orderId = item?.id;
  const { data, error, isLoading } = useOrderDetailQuery(orderId);

  let Dishes = [];
  Dishes = data?.dishes
  return (
    <BottomSheetModal
    ref={bottomSheetModalRef}
    index={1}
    snapPoints={snapPoints}
    onChange={handleSheetChanges}
    enablePanDownToClose={true}
    backdropComponent={CustomBackdrop}
    
  >
    <BottomSheetView style={{
       flex: 1,
    }}>
      <ScrollView>
        <View  style={{paddingHorizontal: 26}}>
            <Text className='text-2xl font-medium text-black text-left'>Order #{item?.id}</Text>
            <View className='flex flex-row justify-between items-center w-full mt-5'>
               <View className='flex flex-col gap-4'>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Table</Text>
                        <Text className='text-md text-black text-left'>{item?.table?.name}</Text>
                    </View>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Time</Text>
                        <Text className='text-md text-black text-left'>{formattedTime}</Text>
                    </View>
               </View>
               <View className='flex flex-col gap-4'>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Status</Text>
                        <View className='flex flex-row items-center gap-1.5'>
                            <View className='w-2.5 h-2.5 bg-green-500 rounded-full'></View>
                            <Text className='text-green-500 text-right text-md font-medium'>{item?.status}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Date</Text>
                        <Text className='text-md text-black text-left'>{formattedDate}</Text>
                    </View>
               </View>
            </View>

            <View className='mt-5'>
              {
                Dishes?.map((item, index) => {
                  const totale = item?.quantity * item?.price
                  return(

                  <View key={index} className='rounded-2xl border border-[#4b556325]  flex flex-row justify-between items-center' style={{paddingVertical: 15,marginBottom: 10 ,paddingHorizontal: 16}}>

                  <Avatar alt="Zach Nugent's Avatar">
                        <AvatarImage source={{ uri: `${API_URL}/storage/${item.image}` }} />
                        <AvatarFallback>
                        <Text>ZN</Text>
                        </AvatarFallback>
                    </Avatar>

                        <View className='flex flex-col gap-1' style={{marginRight: "auto", paddingLeft: 16}}>
                            <Text className='text-lg font-medium text-black text-left uppercase' style={{textTransform: "uppercase"}}>{item.name}</Text>
                            <Text className='text-md font-normal text-black text-left ' style={{textTransform: "uppercase"}}>{item?.quantity} Qty</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text className='text-lg font-medium text-black text-right'>Total</Text>
                            <Text className='text-md font-normal text-black text-left'>{totale.toFixed(2)} MAD</Text>
                        </View>
                  </View>
                  )
                })
              }

               <View className='flex flex-row justify-between items-center mb-2 mt-2'>
                <Text className='text-lg font-medium text-black text-left'>Total</Text>
                <Text className='text-lg font-medium text-black text-left'>{item?.total} MAD</Text>
               </View>
            </View>
        </View>
      </ScrollView>
    </BottomSheetView>
  </BottomSheetModal>
  )
}

const CustomBackdrop = ({animatedIndex, style}) => {

    const containerStyle = [
      StyleSheet.absoluteFill,
      style,
      styles.overlay
    ]
      return(
         <View style={containerStyle}>
          <BlurView 
            tint="dark"
            intensity={25}
            style={StyleSheet.absoluteFill}
          />
         </View>
      )
  }

  const styles = StyleSheet.create({
    overlay:{
        backgroundColor: "rgba(0,0,0,0.5)"
      }
  })
export default ModalBot