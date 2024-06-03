import * as React from "react";
import { View, Platform, Button } from "react-native";
import { Text } from "~/components/ui/text";
import Pusher from "pusher-js/react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
  //   []
  // );
  // const [notification, setNotification] = useState<
  //   Notifications.Notification | undefined
  // >(undefined);

  // const [pusherData, setPusherData] = useState<any>(null);
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();
  // React.useEffect(() => {
  //   registerForPushNotificationsAsync().then(
  //     (token) => {token && setExpoPushToken(token); console.log("The Token => ", token);}
      
  //   );

  //   if (Platform.OS === "android") {
  //     Notifications.getNotificationChannelsAsync().then((value) =>
  //       setChannels(value ?? [])
  //     );
  //   }
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log("The REsponse =>",response);
  //     });
  //   // Replace these with your actual Pusher credentials
  //   const pusher = new Pusher("84cd32aea0c4b858f18e", {
  //     cluster: "eu",
  //   });

  //   const channel = pusher.subscribe("my-channel");
  //   channel.bind("form-submited", function (data: any) {
  //     // Alert(JSON.stringify(data));
  //     setPusherData(data);
  //     const Title = data.post.title + " from " + data.post.table;
  //     schedulePushNotification(Title, data.post.status);
  //     console.log("The data => ", data);
  //   });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //     pusher.unsubscribe("my-channel");
  //   };
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#000",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: 
        </Text>
        <Text>Body: </Text>
      </View>
    </View>
  );
}

// async function schedulePushNotification(title: string, body: string) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: title,
//       body: body,
//       data: { data: "goes here" },
//       sound: "app_voice.wav",
//     },
//     trigger: {},
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     // EAS projectId is used here.
//     try {
//       const projectId =
//         Constants?.expoConfig?.extra?.eas?.projectId ??
//         Constants?.easConfig?.projectId;
//       if (!projectId) {
//         throw new Error("Project ID not found");
//       }
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(token);
//     } catch (e) {
//       token = `${e}`;
//     }
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }
