import React, {useState, useEffect} from 'react';
import { View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator  } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Input } from '~/components/ui/input';
import { useKeyboard } from '~/lib/keyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Label } from '~/components/ui/label';
import { router } from 'expo-router';
import { LoginProvider } from '~/modules/Login';
import { userId } from '~/Atom/atoms';
import { useAtom } from 'jotai';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';
  export default function Screen(){

    const [login, setLogin] = useState('admin@gmail.com');
    const [password, setPassword] = useState('password');
    const [loading, setLoading] = useState(false)


    // const { isKeyboardVisible, keyboardHeight, dismissKeyboard } = useKeyboard();

    // console.log({ isKeyboardVisible, keyboardHeight });
  
    // function onChangeText(text: string) {
    //   console.log("text", text);
    //   // if (text === 'dismiss') {
    //   //   dismissKeyboard();
    //   // }
    // }
    const [userID, setUderID] = useAtom(userId);

    const handleLogin = async () => {
      const res = await LoginProvider({
        login,
        password,
        setLoading,
        router
      })
      
      const {user} = res;
      setUderID(user.id)

      // loginMutation.mutate({ login, password });
      console.log("The Response => ", user.id);
      
    }
  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
          <Card className='w-full max-w-md p-6 rounded-2xl'>
            <CardHeader className='items-center'>
              <Avatar alt="Rick Sanchez's Avatar" className='w-20 h-20'>
                <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                <AvatarFallback>
                  <Text>RS</Text>
                </AvatarFallback>
              </Avatar>
              <View className='p-2' />
              <CardTitle className='pb-2 text-center'>Login</CardTitle>

            </CardHeader>
            <CardContent>
              <View className='w-full  gap-4' style={{flexDirection: "column"}}>
                <View className='w-full  gap-2' style={{flexDirection: "column"}}>
                <Label nativeID='email'>Email</Label>
                  <Input
                      placeholder='example@gmail.com'
                      value={login}
                      nativeID='email'
                      onChangeText={(text) => setLogin(text)}
                      aria-labelledbyledBy='inputLabel'
                      aria-errormessage='inputError'
                    />
                </View>
                <View className='w-full  gap-2' style={{flexDirection: "column"}}>
                <Label nativeID='password'>Password</Label>
                  <Input
                      placeholder='password'
                      value={password}
                      nativeID='password'
                      onChangeText={(text) => setPassword(text)}
                      aria-labelledbyledBy='inputLabel'
                      aria-errormessage='inputError'
                    />
                </View>
              </View>

              <View className='mt-6'>
                <Button onPress={() => handleLogin()} disabled={loading}> 
                {
                  loading
                  ?
                  <ActivityIndicator size={"small"} color={"#000"}/>
                  :
                   <Text>Connect</Text> 
                }
                </Button>
              </View>
            </CardContent>

          </Card>

      </View>

   </KeyboardAvoidingView> 

)
}

