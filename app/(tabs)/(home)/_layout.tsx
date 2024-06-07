import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function HomeLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
       <Stack.Screen name="index" />
       <Stack.Screen name="addOrder" />
       <Stack.Screen name="cartScreen" />
    </Stack>
  );
}
