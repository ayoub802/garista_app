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


//  export const OrderItems = ({orderId}) => {
//     const [items, setItems] = useState(null);
//     useEffect(() => {
//       fetchOrderDetails(orderId).then(data => {
//         setItems(data.dishes); // Assuming the API returns an object with a dishes array
//       });
//     }, [orderId]);
//     return items;
//   }
  