import { View, StyleSheet, Dimensions, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axiosInstance from '~/axiosInstance';
const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

const windowWidth = Dimensions.get('screen').width
const ModalInfo = ({
    handleSheetChanges,
    bottomSheetModalRef,
    snapPoints,
    item,
    refetch
}) => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false)
    const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(300);

    useEffect(() => {
        if (item) {
            setEmail(item.email);
            setFirstName(item.first_name);
            setLastName(item.last_name);
            setPhone(item.phone);
        }
    }, [item]);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVerticalOffset(0);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVerticalOffset(300);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const handleUpdateStaff = async () => {
        try{
        //    const res = await axiosInstance.put('/staffs/'+item?.id, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //    })
        setLoading(true)
           const res = await axiosInstance.put('/staffs/'+item?.id, {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email
           })

           if(res)
           {
            console.log("The Response is succes", res.data);
            refetch()
            bottomSheetModalRef.current?.close();
           }
        }
        catch(err)
        {
            console.log("The Error => ", err);
        }
        finally{
            setLoading(false)
        }
    }
  console.log("The Data of Item => ", keyboardVerticalOffset);
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
        <KeyboardAvoidingView style={{flex: 1, justifyContent: "center"}}  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={keyboardVerticalOffset}>
            {/* <ScrollView> */}
                <View>
                    <Text style={{color: "#000", textAlign: "center", fontSize: 20,marginTop: 10, textTransform: "uppercase", fontWeight: "500"}}>Edit Profile</Text>
                </View>

                <View style={{marginTop: 10, width: windowWidth * 0.8, alignSelf: "center", flexDirection: "column", gap: 10}}>
                    <View>
                        <Label nativeID='name' className='mb-1' style={{color: "#000"}}>First Name</Label>
                            <Input
                                nativeID='name'
                                placeholder='First Name'
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                aria-labelledbyledBy='inputLabel'
                                aria-errormessage='inputError'
                                style={{backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#000"}}
                            />
                    </View>
                    <View>
                        <Label nativeID='last_name' className='mb-1' style={{color: "#000"}}>Last Name</Label>
                            <Input
                                nativeID='last_name'
                                placeholder='Last Name'
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                aria-labelledbyledBy='inputLabel'
                                aria-errormessage='inputError'
                                style={{backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#000"}}
                            />
                    </View>
                    <View>
                        <Label nativeID='email' className='mb-1' style={{color: "#000"}}>Email</Label>
                            <Input
                                nativeID='email'
                                placeholder='Email'
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                aria-labelledbyledBy='inputLabel'
                                aria-errormessage='inputError'
                                style={{backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#000"}}
                            />
                    </View>
                    <View>
                        <Label nativeID='phone' className='mb-1' style={{color: "#000"}}>Phone Number</Label>
                            <Input
                                nativeID='phone'
                                placeholder='Last Name'
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                aria-labelledbyledBy='inputLabel'
                                aria-errormessage='inputError'
                                style={{backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#000"}}
                            />
                    </View>

                    <Button onPress={handleUpdateStaff} disabled={loading} style={{backgroundColor: "#000", marginTop: 20}}>
                        {
                        loading 
                        ?
                        <ActivityIndicator color={"#fff"} size={"small"}/>
                        :
                        <Text style={{color: "#fff"}}>Update</Text>
                        }
                    </Button>
                </View>
            {/* </ScrollView> */}
        </KeyboardAvoidingView>
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
export default ModalInfo