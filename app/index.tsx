import React from 'react';
import { View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
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

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';
  export default function Screen(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    


    // const onChangeText = (text: string) => {
    //   setValue(text);
    // };

    const { isKeyboardVisible, keyboardHeight, dismissKeyboard } = useKeyboard();

    console.log({ isKeyboardVisible, keyboardHeight });
  
    function onChangeText(text: string) {
      console.log("text", text);
      // if (text === 'dismiss') {
      //   dismissKeyboard();
      // }
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
                      value={email}
                      nativeID='email'
                      onChangeText={(text) => setEmail(text)}
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
                <Button onPress={() => router.push('/(tabs)')}> 
                  <Text>Connect</Text>
                  </Button>
              </View>
            </CardContent>

          </Card>

      </View>

   </KeyboardAvoidingView> 

)
}

