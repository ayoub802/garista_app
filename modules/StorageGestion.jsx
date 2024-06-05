import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (userId) => {
    try{
         const res = await AsyncStorage.setItem(
            'userId',
            userId,
          );

        return res;
    }
    catch(err)
    {
        console.log("The error => ", err);
    }
}

export const getUser = async () => {
    try{
         const res = await AsyncStorage.getItem(
            'userId'
          );

        return res;
    }
    catch(err)
    {
        console.log("The error => ", err);
    }
}

