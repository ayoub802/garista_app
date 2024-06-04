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
const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

const ModalBot = ({
    handleSheetChanges,
    bottomSheetModalRef,
    snapPoints,
}) => {
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
            <Text className='text-2xl font-medium text-black text-left'>Order #258</Text>
            <View className='flex flex-row justify-between items-center w-full mt-5'>
               <View className='flex flex-col gap-4'>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Table</Text>
                        <Text className='text-md text-[#e9d841] text-left'>Table 1</Text>
                    </View>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Time</Text>
                        <Text className='text-md text-[#e9d841] text-left'>12:42:22 PM</Text>
                    </View>
               </View>
               <View className='flex flex-col gap-4'>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Status</Text>
                        <View className='flex flex-row items-center gap-1.5'>
                            <View className='w-2.5 h-2.5 bg-green-500 rounded-full'></View>
                            <Text className='text-green-500 text-right text-md font-medium'>New</Text>
                        </View>
                    </View>
                    <View>
                        <Text className='text-[25px] font-normal text-black text-left' style={{fontSize: 16, lineHeight: 30}}>Date</Text>
                        <Text className='text-md text-[#e9d841] text-left'>6/4/2024</Text>
                    </View>
               </View>
            </View>

            <View className='mt-5'>
               <View className='rounded-2xl border border-[#4b556325] px-4 flex flex-row justify-between items-center mb-2' style={{paddingVertical: 8}}>

               <Avatar alt="Zach Nugent's Avatar">
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                    <Text>ZN</Text>
                    </AvatarFallback>
                </Avatar>

                    <View className='flex flex-col gap-1' style={{marginRight: "auto", paddingLeft: 16}}>
                        <Text className='text-lg font-medium text-black text-left uppercase' style={{textTransform: "uppercase"}}>Chiken</Text>
                        <Text className='text-md font-normal text-black text-left ' style={{textTransform: "uppercase"}}>4 Qty</Text>
                    </View>
                    <View className='flex flex-col gap-1'>
                        <Text className='text-lg font-medium text-black text-right'>Total</Text>
                        <Text className='text-md font-normal text-black text-left'>320.00 MAD</Text>
                    </View>
               </View>
               <View className='rounded-2xl border border-[#4b556325] px-4 flex flex-row justify-between items-center mb-2' style={{paddingVertical: 8}}>

               <Avatar alt="Zach Nugent's Avatar">
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                    <Text>ZN</Text>
                    </AvatarFallback>
                </Avatar>

                    <View className='flex flex-col gap-1' style={{marginRight: "auto", paddingLeft: 16}}>
                        <Text className='text-lg font-medium text-black text-left uppercase' style={{textTransform: "uppercase"}}>Chiken</Text>
                        <Text className='text-md font-normal text-black text-left ' style={{textTransform: "uppercase"}}>4 Qty</Text>
                    </View>
                    <View className='flex flex-col gap-1'>
                        <Text className='text-lg font-medium text-black text-right'>Total</Text>
                        <Text className='text-md font-normal text-black text-left'>320.00 MAD</Text>
                    </View>
               </View>
               <View className='rounded-2xl border border-[#4b556325] px-4 flex flex-row justify-between items-center mb-2' style={{paddingVertical: 8}}>

               <Avatar alt="Zach Nugent's Avatar">
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                    <Text>ZN</Text>
                    </AvatarFallback>
                </Avatar>

                    <View className='flex flex-col gap-1' style={{marginRight: "auto", paddingLeft: 16}}>
                        <Text className='text-lg font-medium text-black text-left uppercase' style={{textTransform: "uppercase"}}>Chiken</Text>
                        <Text className='text-md font-normal text-black text-left ' style={{textTransform: "uppercase"}}>4 Qty</Text>
                    </View>
                    <View className='flex flex-col gap-1'>
                        <Text className='text-lg font-medium text-black text-right'>Total</Text>
                        <Text className='text-md font-normal text-black text-left'>320.00 MAD</Text>
                    </View>
               </View>

               <View className='flex flex-row justify-between items-center mb-2 mt-2'>
                <Text className='text-lg font-medium text-black text-left'>Total</Text>
                <Text className='text-lg font-medium text-black text-left'>8090.00 MAD</Text>
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