import { useAtom } from 'jotai';
import { useState } from 'react';
import { restoAtom, restoId } from '~/Atom/atoms';
import axiosInstance from '~/axiosInstance';
import { database } from '~/firebaseConfig';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';

export const API_URL = 'https://backend.garista.com/api'; // Replace with your actual API URL

// export const fetchNotifications = async () => {
//     try{
//         const response = await axiosInstance.get(`/notifications`);
//         // console.log("Notification Results => ", response.data);
//         return response.data;
//     }
//     catch(err)
//     {
//         console.log("The Error => ", err);
//     }
// };

export const fetchRestoDetails = async (user_id) => {
    // const [resto, setResto] = useAtom(restoId);
    try {
      const response = await axiosInstance.get(`/getResto/${user_id}`);
      if(response)
      {
        console.log("The Fetched Restaurant => ", response.data);
      }
      const data = response.data
      return data[0];
    } catch (error) {
      console.error("Error fetching resto details: ", error.message);
      throw error;
    }
  };

export const fetchOrders = async (resto_id, page = 1, limit = 10) => {
    // const [resto, setResto] = useAtom(restoAtom);
    try {
      const response = await axiosInstance.get(`/order_resto/${resto_id}?page=${page}&limit=${limit}`);
    //   if(response)
    //   {
    //     console.log("The Fetched Order => ", response.data);
    //   }
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error fetching resto details: ", error.message);
      throw error;
    }
  };

export const fetchInfos = async (restoId) => {
  // const [resto, setResto] = useAtom(restoAtom);
  try {
    const response = await axiosInstance.get(`/infos/${restoId}`);
    if(response)
    {
      console.log("The Fetched Infos => ", response.data);
    }
    const data = response.data
    return data[0];
  } catch (error) {
    console.error("Error Info details: ", error.message);
    throw error;
  }
};

export const fetchDataFromFirebase = async (restoId) => {
  const ordersRef = ref(database, 'orders');
  const restoOrdersQuery = query(ordersRef, orderByChild('resto_id'), equalTo(restoId));

  const ordersList = [];
  onValue(restoOrdersQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (let id in data) {
        ordersList.push({ id, ...data[id] });
      }
    }
    // Here you can use ordersList as needed, for example, set it to state if using React
    console.log(ordersList);
  });

  return ordersList;
};

export const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/order/${orderId}`);
    //   console.log("The Item order => ", response.data);
      return response.data; // Assuming this returns the full order details including items
    } catch (error) {
      console.error("Failed to fetch order details:", error.message);
      return null; // Return null or appropriate error handling
    }
};


  export const fetchCategories = async (categorieId) => {
    try {
      const response = await axiosInstance.get(`/categories/${categorieId}`);
    //   console.log("The Item order => ", response.data);
      return response.data; // Assuming this returns the full order details including items
    } catch (error) {
      console.error("Failed to fetch order details:", error.message);
      return null; // Return null or appropriate error handling
    }
  };

 export const fetchDishes = async (restoId) => {
    // if (!restoId) return;
    // setLoading(true);
    try {
      // Fetch visible categories first
      const categoryResponse = await axiosInstance.get(`/categories/${restoId}`);
      const categoriesData = await categoryResponse.data;
      const visibleCategories = categoriesData.filter(cat => cat.visibility === 1);
      const visibleCategoryIds = visibleCategories.map(cat => cat.id);
  
      // Fetch dishes and drinks
      const [dishesResponse, drinksResponse] = await Promise.all([
        axiosInstance.get(`/getdishes/${restoId}`).catch(error => {
          console.log('Error fetching dishes:', error.message);
          return { data: [], status: 404 };
        }),
        axiosInstance.get(`/getdrinks/${restoId}`).catch(error => {
          console.log('Error fetching drinks:', error.message);
          return { data: [], status: 404 };
        })
      ]);
      
      if (dishesResponse.status === 404) {
        console.log('Dishes resource is empty');
      }
      
      if (drinksResponse.status === 404) {
        console.log('Drinks resource is empty');
      }
  
      const dishesData = dishesResponse.data;
      const drinksData = drinksResponse.data;
  
      // Filter dishes and drinks based on visible categories
      const filteredDishes = dishesData.filter(dish => visibleCategoryIds.includes(dish.category_id));
      const filteredDrinks = drinksData.filter(drink => visibleCategoryIds.includes(drink.category_id));
  
      // Combine and set the filtered data
      let combinedData = [];
      if (filteredDishes.length) {
        combinedData.push(...filteredDishes.map(item => ({ ...item, type: 'dish' })));
      }
      if (filteredDrinks.length) {
        combinedData.push(...filteredDrinks.map(item => ({ ...item, type: 'drink' })));
      }

  
     return combinedData;
    } catch (error) {
      console.error('Error fetching dishes and drinks:', error.message);
    } 
  };

  export const fetchTables = async (restoId) => {
    // const [resto, setResto] = useAtom(restoId);
    try {
      const response = await axiosInstance.get(`/tables/${restoId}`);
      if(response)
      {
        console.log("The Fetched Tables => ", response.data);
      }
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error fetching tables :", error.message);
      throw error;
    }
  };

 export const fetchNotifications = async (restoId) => {
    try {
        const response = await axiosInstance.get('/getNotifications/'+restoId);
        const data = response.data;
        // setNotificationData(data);
        // setNotification(data);
        return data;
    } catch (error) {
        console.error('Failed to fetch notifications', error);
    }
};

export const fetchUser = async (userId) => {
  try {
      const response = await axiosInstance.get('/users/'+userId);
      const data = response.data;
      // setNotificationData(data);
      // setNotification(data);
      return data?.users[0];
  } catch (error) {
      console.error('Failed to fetch notifications', error);
  }
};

export const fetchStaff = async (userId) => {
  try {
      const response = await axiosInstance.get('/staffs/'+userId);
      const data = response.data;
      // setNotificationData(data);
      // setNotification(data);
      return data;
  } catch (error) {
      console.error('Failed to fetch notifications', error);
  }
};