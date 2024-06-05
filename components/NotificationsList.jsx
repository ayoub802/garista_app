import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { fetchNotifications } from "../modules/ApiGestion";

const NotificationsList = () => {
//   const [notifications, setNotifications] = useAtom(notificationsAtom);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    // onSuccess: (data) => {
    //   console.log("Setting Notifications with Data: ", data);
    //   setNotifications(data);
    // },
  });

//   console.log("The Notifications => ", data);

    useEffect(() => {
      const interval = setInterval(() => {
        refetch();
      }, 1000); // Polling every 5 seconds

      return () => clearInterval(interval);
    }, [refetch]);

    // if (data){
    //     return(
    //         <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red"}} className="flex h-screen items-center justify-center">
    //            <ActivityIndicator size={"small"} color={"#000"}/>       
    //         </View>
    //     )
    
    // } 

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>Status: {item.status}</Text>
          <Text style={styles.details}>Resto: {item.resto.name}</Text>
          <Text style={styles.details}>Created At: {item.created_at}</Text>
        </View>
      )}
      numColumns={3}
    />
    // <>
    //   <View>
    //     <View style={styles.card}>
    //        <Text style={styles.title}>{item.title}</Text>
    //        <Text style={styles.details}>Status: {item.status}</Text>
    //        <Text style={styles.details}>Resto: {item.resto.name}</Text>
    //        <Text style={styles.details}>Created At: {item.created_at}</Text>
    //      </View>
    //   </View>
    // </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 5,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
});

export default NotificationsList;
