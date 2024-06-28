import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
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

const widthDimensions = Dimensions.get("screen").width;
const ModalTable = ({
    handleSheetChanges,
    bottomSheetModalRef,
    snapPoints,
    tables,
    SUbmitOrder
}) => {

    const [selectedTable, setSelectedTable] = useState(null);

    const handleTableSelect = (table) => {
        setSelectedTable(table);
        // Proceed with the order using the selected table
      };
    const TableRectangle = ({item}) => {
    
        const backgroundColor = item?.id == selectedTable ? "#212121" : "#d9d9d9" ;
        return (
          <TouchableOpacity onPress={() => handleTableSelect(item?.id)} className='relative z-10 ' style={{marginBottom: 50, marginTop: 25}}>
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
      <ScrollView style={{flex: 1}}>
        <View  style={{paddingHorizontal: 26}}>
            <Text className='text-2xl font-medium text-black text-center'>Choose Table</Text>
        </View>

        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", width: 450, alignSelf: "center", marginTop: 25}}>
          <FlatList
              data={tables}
              numColumns={3}
              key={(tables?.length ?? 0).toString()}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <TableRectangle item={item}/>}
              // estimatedItemSize={200}
            />
         </View>
      </ScrollView>
            <View style={{justifyContent: "flex-end", alignItems: "center", backgroundColor: "#fff",width: "100%" ,alignSelf: "center", marginTop: 25, paddingBottom: 15}}>
                <TouchableOpacity disabled={!selectedTable} onPress={() => SUbmitOrder({tabel_id: selectedTable})} style={{backgroundColor: selectedTable ? "#000" : "#888", width: widthDimensions * 0.4,height: widthDimensions * 0.12, justifyContent: "center",borderRadius: 10 ,alignItems:"center" ,alignSelf: "center"}}>
                    <Text style={{color: "#fff", textAlign: "center", fontSize: 14, textTransform: "uppercase"}}>Checkout</Text>
                </TouchableOpacity>
            </View>
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
export default ModalTable