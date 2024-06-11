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

export const saveCart = async (cartProducts) => {
    try{
      await AsyncStorage.setItem('cart', JSON.stringify(cartProducts));
    }
    catch(err)
    {
        console.log("The error => ", err);
    }
}

export const getCart = async () => {
    try{
        const cart = await AsyncStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    catch(err)
    {
        console.log("The error => ", err);
    }
}

export const removeCart = async () => {
    try{
        const cart = await AsyncStorage.removeItem('cart');
        return "remove success";
    }
    catch(err)
    {
        console.log("The error => ", err);
    }
}

