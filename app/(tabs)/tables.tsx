import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function Tab() {

  const tables = [
    { id: 14, occupied: false },
    { id: 15, occupied: false },
    { id: 16, occupied: false },
    { id: 17, occupied: true },
    { id: 18, occupied: true },
    { id: 21, occupied: false },
    { id: 24, occupied: true },
    { id: 26, occupied: false },
  ];
    const renderTable = (number: number, selected: any) => (
        <TouchableOpacity className='relative'>
            <View className='w-36 h-16 border-[3px] border-white rounded-xl items-center justify-center bg-[#212121] relative z-10'>
            <Text style={styles.tableText}>1</Text>
            </View>
            <View className='absolute -top-5 w-7 h-7 left-5 bg-[#212121] rounded-full -z-10'></View>
            <View className='absolute -top-5 w-7 h-7 left-[78px] bg-[#212121] rounded-full -z-10'></View>
            <View className='absolute top-14 w-7 h-7 left-5 bg-[#212121] rounded-full -z-10'></View>
            <View className='absolute top-14 w-7 h-7 left-[78px] bg-[#212121] rounded-full -z-10'></View>
       </TouchableOpacity>
      );  

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text>Main hall</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>Terrace</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>Backyard</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        {tables.map((table) => (
          <TouchableOpacity
            key={table.id}
            style={[styles.table, table.occupied ? styles.occupied : styles.available]}
            // onPress={() => navigation.navigate('ManageOrder', { tableId: table.id })}
            disabled={table.occupied}
          >
            <Text style={styles.tableText}>{table.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { padding: 10, backgroundColor: '#ccc', borderRadius: 5 },
  tableContainer: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  table: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center', margin: 10, borderRadius: 5 },
  available: { backgroundColor: '#0f0' },
  occupied: { backgroundColor: '#f00' },
  tableText: { color: '#fff' }
});
