import { useAtom } from 'jotai';
import { useState } from 'react';
import { restoAtom, restoId } from '~/Atom/atoms';
import axiosInstance from '~/axiosInstance';
export const API_URL = 'https://backend.garista.com/api'; // Replace with your actual API URL

export const fetchNotifications = async () => {
    try{
        const response = await axiosInstance.get(`/notifications`);
        // console.log("Notification Results => ", response.data);
        return response.data;
    }
    catch(err)
    {
        console.log("The Error => ", err);
    }
};

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

export const fetchOrders = async (resto_id) => {
    // const [resto, setResto] = useAtom(restoAtom);
    try {
      const response = await axiosInstance.get(`/order_resto/${resto_id}`);
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
          console.error('Error fetching dishes:', error.message);
          return { data: [], status: 404 };
        }),
        axiosInstance.get(`/getdrinks/${restoId}`).catch(error => {
          console.error('Error fetching drinks:', error.message);
          return { data: [], status: 404 };
        })
      ]);
      
      if (dishesResponse.status === 404) {
        console.error('Dishes resource is empty');
      }
      
      if (drinksResponse.status === 404) {
        console.error('Drinks resource is empty');
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