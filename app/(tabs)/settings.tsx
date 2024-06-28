import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const widthDeimenses = Dimensions.get('screen').width;

import { Text } from '~/components/ui/text';
export default function Tab() {
  

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fff"}}>
        <StatusBar style='dark'  backgroundColor={'#000'} hidden/>
        <View className='w-full h-20 justify-center items-center' style={{
          backgroundColor: "#000"
        }}>
          <View className='max-w-[90%] justify-center self-center items-center '>
            <View className='flex flex-row justify-between items-center w-full '>
             <Text className='text-center text-lg' style={{color: "#fff" }}>Profile</Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={{marginTop: 20,}}>
            <View style={{justifyContent: "center", alignItems: "center", overflow: "hidden",maxWidth: 110, marginHorizontal: "auto",borderWidth: 1.2 ,borderColor: "#fff",borderRadius: 50}}>
              <Image  style={{width: 100, height: 100, objectFit: "cover", backgroundColor: "#D9D9D9"}}/>
            </View>

            <View style={{justifyContent: "center",marginTop: 5,alignItems: "center"}}>
                <Text style={{color: "#000", fontSize: 18, fontWeight: "500"}}>Younes Ayoub</Text>
                <Text style={{color: "#000", fontSize: 14, fontWeight: "400", marginTop: 5}}>Waiter</Text>
            </View>
          </View>

          <View style={{marginTop: 20, width: widthDeimenses * 0.85, alignSelf: "center"}}>
             <Text style={{color: "#000", fontSize: 15, fontWeight: "500"}}>Your Email</Text>

             <View style={{marginTop: 15, width: widthDeimenses * 0.75, alignSelf: "center"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                  <Octicons name="mail" size={24} color="#ABABAB" />
                  <Text style={{color: "#ABABAB", fontSize: 15}}>example@gmail.com</Text>
              </View>
             </View>
          </View>

          <View style={{marginTop: 25, width: widthDeimenses * 0.85, alignSelf: "center"}}>
             <Text style={{color: "#000", fontSize: 15, fontWeight: "500"}}>Phone Number</Text>

             <View style={{marginTop: 15, width: widthDeimenses * 0.75, alignSelf: "center"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                 <MaterialCommunityIcons name="phone" size={24} color="#ABABAB" />
                  <Text style={{color: "#ABABAB", fontSize: 15}}>+93123135</Text>
              </View>
             </View>
          </View>

          <View style={{marginTop: 25, width: widthDeimenses * 0.85, alignSelf: "center"}}>
             <Text style={{color: "#000", fontSize: 15, fontWeight: "500"}}>Username</Text>

             <View style={{marginTop: 15, width: widthDeimenses * 0.75, alignSelf: "center"}}>
              <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                  <AntDesign name="user" size={24} color="#ABABAB" />
                  <Text style={{color: "#ABABAB", fontSize: 15}}>test</Text>
              </View>
             </View>
          </View>
        </ScrollView>
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
