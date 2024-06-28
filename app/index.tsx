import React, {useState, useEffect, useRef} from 'react';
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
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';
  export default function Screen(){

    const [login, setLogin] = useState('anas@gmail.com');
    const [password, setPassword] = useState('password');
    const [loading, setLoading] = useState(false)


 const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  // const [pusherData, setPusherData] = useState<any>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  
  React.useEffect(() => {
    async function getPermissions() {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
        },
      });
      if (status === 'granted') {
        registerForPushNotificationsAsync();
      } else {
        alert('Failed to get push token for push notification!');
      }
    }
  
    getPermissions();
    registerForPushNotificationsAsync().then(
      (token) => {token && setExpoPushToken(token); console.log("The Token => ", token);}
      
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("The REsponse =>",response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
    };


  }, []);
    const [userID, setUderID] = useAtom(userId);

    console.log("The Token of All => ", expoPushToken);
    

    const handleLogin = async () => {

    
      const res = await LoginProvider({
        login,
        password,
        setLoading,
        router,
        expoPushToken
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

async function schedulePushNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: "goes here" },
      sound: "app_voice.wav",
    },
    trigger: {},
  });
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        // alert("Failed to get push token for push notification!");
        return;
      }
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);

    // Set up notification channels for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: "app_voice.wav",  // Ensure the sound file is correctly named and placed.
      });
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}