import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function Tab() {
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
    <SafeAreaView style={styles.container}>
{/* 
    <ScrollView contentContainerStyle={styles.tableContainer}>
      <View style={styles.row}>
        {renderTable(1, false)}
        {renderTable(2, false)}
        {renderTable(3, false)}
      </View>
      <View style={styles.row}>
        {renderTable(4, false)}
        {renderTable(5, false)}
        {renderTable(6, true)}
      </View>
      <View style={styles.row}>
        {renderTable(7, false)}
        {renderTable(8, false)}
        {renderTable(9, false)}
      </View>
      <View style={styles.row}>
        {renderTable(10, false)}
        {renderTable(11, false)}
        {renderTable(12, false)}
      </View>
      <View style={styles.row}>
        {renderTable(13, false)}
        {renderTable(14, false)}
      </View>
    </ScrollView> */}


  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
     justifyContent: "center",
     alignItems: "center"
    },
    blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',

    overflow: 'hidden',
    borderRadius: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    overly: {
     backgroundColor: 'rgba(0,0,0,0.5)'
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    tableContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    table: {
      width: 95,
      height: 60,
      backgroundColor: '#444',
      opacity: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: "relative"
    },
    selectedTable: {
      backgroundColor: '#D32F2F',
    },
    tableText: {
      color: 'white',
      fontSize: 18,
    },
    nextButton: {
      backgroundColor: '#333',
      padding: 16,
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 16,
    },
    nextButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
