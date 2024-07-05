import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Dimensions, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const widthDeimenses = Dimensions.get('screen').width;
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import axiosInstance from '~/axiosInstance';
import { useNavigation } from 'expo-router';
import { useStaffsQuery, useUserQuery } from '~/useFetch/useFetch';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getStaff } from '~/modules/StorageGestion';
import ModalInfo from "~/components/modal/ModalInfo"

export default function Tab() {
  const handleLogout = async () => {
    try{
      router.navigate('/');
    }
    catch(err)
    {
      console.log("The Error => ", err);
      
    }
  }

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index:any) => {
  }, []);
  const { data, error, isLoading: isQueryLoading,refetch  } = useStaffsQuery();

  console.log("The Staffs Data => ",data);
  
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
            <View></View>
             <Text className='text-center text-lg' style={{color: "#fff" }}>Profile</Text>

            <TouchableOpacity onPress={handlePresentModalPress} className='bg-[#000]/55 w-12 h-12 justify-center items-center rounded-lg border  m-0' style={{borderColor: "#4b5563" }}>
                <Feather name="edit" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {
          isQueryLoading
          ?
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator  color={"#000"}/>
        </View>
          :
          <>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={{marginTop: 20,}}>
            <View style={{justifyContent: "center", alignItems: "center", overflow: "hidden",maxWidth: 110, marginHorizontal: "auto",borderWidth: 1.2 ,borderColor: "#fff",borderRadius: 50}}>
              <Image  style={{width: 100, height: 100, objectFit: "cover", backgroundColor: "#D9D9D9"}}/>
            </View>

            <View style={{justifyContent: "center",marginTop: 5,alignItems: "center"}}>
                <Text style={{color: "#000", fontSize: 18, fontWeight: "500", textTransform: "capitalize"}}>{data?.first_name + " " + data?.last_name}</Text>
                <Text style={{color: "#000", fontSize: 14, fontWeight: "400", marginTop: 5}}>{data?.role?.name}</Text>
            </View>
          </View>

          <View style={{marginTop: 20, width: widthDeimenses * 0.85, alignSelf: "center"}}>
             <Text style={{color: "#000", fontSize: 15, fontWeight: "500"}}>Your Email</Text>

             <View style={{marginTop: 15, width: widthDeimenses * 0.75, alignSelf: "center"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                  <Octicons name="mail" size={24} color="#ABABAB" />
                  <Text style={{color: "#ABABAB", fontSize: 15}}>{data?.email}</Text>
              </View>
             </View>
          </View>

          <View style={{marginTop: 25, width: widthDeimenses * 0.85, alignSelf: "center"}}>
             <Text style={{color: "#000", fontSize: 15, fontWeight: "500"}}>Phone Number</Text>

             <View style={{marginTop: 15, width: widthDeimenses * 0.75, alignSelf: "center"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                 <MaterialCommunityIcons name="phone" size={24} color="#ABABAB" />
                  <Text style={{color: "#ABABAB", fontSize: 15}}>{data?.phone}</Text>
              </View>
             </View>
          </View>

          <View style={{marginTop: 25, width: widthDeimenses * 0.85, alignSelf: "center"}}>
             <Text style={{color: "#000", fontSize: 15, fontWeight: "500"}}>Username</Text>

             <View style={{marginTop: 15, width: widthDeimenses * 0.75, alignSelf: "center"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                  <AntDesign name="user" size={24} color="#ABABAB" />
                  <Text style={{color: "#ABABAB", fontSize: 15}}>{data?.username}</Text>
              </View>
             </View>
          </View>
        </ScrollView>

        <View style={{justifyContent: "center", alignItems: "center", paddingBottom: 10}}>
          <TouchableOpacity onPress={handleLogout} style={{width: widthDeimenses * 0.4,justifyContent: "center", alignItems: "center" ,height: widthDeimenses * 0.12, borderRadius: 10, backgroundColor: "#f26060"}}>
            <Text style={{color: "#fff", textTransform: "uppercase", fontWeight: "600"}}>Logout</Text>
          </TouchableOpacity>
        </View>
        </>
        }

     <ModalInfo bottomSheetModalRef={bottomSheetModalRef} handleSheetChanges={handleSheetChanges} snapPoints={snapPoints} item={data} refetch={refetch}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
});
