import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { orderAtom, restoAtom, restoId, staffs, userId } from "../Atom/atoms";
import { OrderItems, fetchCategories, fetchDataFromFirebase, fetchDishes, fetchInfos, fetchNotifications, fetchOrderDetails, fetchOrders, fetchRestoDetails, fetchStaff, fetchTables, fetchUser } from "../modules/ApiGestion";
import { getStaff, getUser } from "~/modules/StorageGestion";
import { useEffect, useState } from "react";
import queryClient from "~/QueryClients/queryClient";


export const useGetUserValue = () => {
  const [userID, setUserID] = useAtom(userId);

  useEffect(() => {
      const fetchUserId = async () => {
          try {
              setUserID(null);  // Clear previous userId before updating
              const resId = await getUser();
              const parsedId = JSON.parse(resId);
              console.log("The User RestoId => ", parsedId);
              setUserID(parsedId);
          } catch (error) {
              console.error("Error fetching user ID: ", error);
          }
      };

      fetchUserId();
  }, [setUserID]);

  return userID;
};

export const useGetStaffValue = () => {
  const [staffID, setStaffID] = useAtom(staffs);

  useEffect(() => {
      const fetchUserId = async () => {
          try {
            setStaffID(null);  // Clear previous userId before updating
              const resId = await getStaff();
              const parsedId = JSON.parse(resId);
              setStaffID(parsedId.id);
          } catch (error) {
              console.error("Error fetching user ID: ", error);
          }
      };

      fetchUserId();
  }, [setStaffID]);

  return staffID;
};
export const useRestoQuery = () => {
    // const [userID, setUderID] = useAtom(userId);
    const [restos, setRestos] = useAtom(restoAtom);
    const userID = useGetUserValue();

    console.log("The user Id of resto => ", userID);

    const user_id = userID
    const { data: resto, isLoading, error, refetch } = useQuery({
        queryKey: ['resto', user_id],
        queryFn: () => fetchRestoDetails(user_id),
      });

          
    setRestos(resto);

    return {  isLoading, error };
};


export const useUserQuery = () => {
  // const [userID, setUderID] = useAtom(userId);
  const userID = useGetUserValue();

  console.log("The user Id of resto => ", userID);

  const userId = userID
  const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['userQuey', userId],
      queryFn: () => fetchUser(userId),
    });

  return { data, isLoading, error };
};


export const useStaffsQuery = () => {
  // const [userID, setUderID] = useAtom(userId);
  const userID = useGetStaffValue();


  console.log("The user Id of staffs => ", userID);

  const userId = userID
  const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['staffsQuerys', userId],
      queryFn: () => fetchStaff(userId),
    });

  return { data, isLoading, error, refetch };
};

export const useOrderQuery = () => {
  const [restos, ] = useAtom(restoAtom);
  const [, setOrderResto] = useAtom(orderAtom);

  const resto_id = restos?.id;

    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['restoOrder', resto_id],
            queryFn: () => fetchOrders(resto_id),
            enabled: !!resto_id, // Ensure the query runs only if resto_id is available
            staleTime: Infinity, // Data is never considered stale
            cacheTime: Infinity, // Cache data indefinitely
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        });  
        
         // Filter orders to only include those from the current day
  const currentDate = new Date().toISOString().split('T')[0];
  const todayOrders = data?.data?.filter(order => order.created_at.startsWith(currentDate));
  console.log("The Today Orders => ", todayOrders);
  return { data , error, isLoading, refetch, };
};
export const useOrderFirebaseQuery = () => {
  const [restos, ] = useAtom(restoAtom);
  const [, setOrderResto] = useAtom(orderAtom);

  const resto_id = restos?.id;

    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['restoOrderFirebase', resto_id],
            queryFn: () => fetchDataFromFirebase(resto_id),
            enabled: !!resto_id, // Ensure the query runs only if resto_id is available
            staleTime: Infinity, // Data is never considered stale
            cacheTime: Infinity, // Cache data indefinitely
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        });  
        
         // Filter orders to only include those from the current day
  const currentDate = new Date().toISOString().split('T')[0];
  const todayOrders = data?.data?.filter(order => order.created_at.startsWith(currentDate));
  console.log("The Today Orders => ", todayOrders);
  return { data , error, isLoading, refetch, };
};

export const useOrderDetailQuery = (orderId) => {

      const { data, error, isLoading, refetch } = useQuery({
              queryKey: ['orderDetail', orderId],
              queryFn: () => fetchOrderDetails(orderId),
              enabled: !!orderId,
              staleTime: Infinity, // Data is never considered stale
              cacheTime: Infinity, // Cache data indefinitely
              refetchOnWindowFocus: false,
              refetchOnReconnect: false,
          });    
  
          return { data, error, isLoading, refetch };
  };

export const useCategoriesQuery = () => {
  const [restos, ] = useAtom(restoAtom);
  const categorieId = restos?.id;

    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['categorieDetail', categorieId],
            queryFn: () => fetchCategories(categorieId),
        });    

        return { data, error, isLoading, refetch };
};


export const useProductQuery = () => {
  const [restos, ] = useAtom(restoAtom);
  const restoId = restos?.id;
  // useWebSocket(restoId, queryClient);

    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['productsDetail', restoId],
            retryOnMount: false,
            queryFn: () => fetchDishes(restoId),
            // refetchInterval: 1000,
            refetchOnWindowFocus: true,
            retry: 3
        });    

        return { data, error, isLoading, refetch };
};

export const useTablesQuery = () => {
  const [restos, ] = useAtom(restoAtom);
  const restoId = restos?.id;
  // useWebSocket(restoId, queryClient);

    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['tablesDetail', restoId],
            retryOnMount: false,
            queryFn: () => fetchTables(restoId),
            // refetchInterval: 1000,
        });    

        return { data, error, isLoading, refetch };
};

export const useInfosQuery = (restoId) => {
  // const [restos, ] = useAtom(restoAtom);
  // const restoId = restos?.id;
  // useWebSocket(restoId, queryClient);

  // console.log("The Use Info => ", restoId);
    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['infoTable', restoId],
            retryOnMount: false,
            queryFn: () => fetchInfos(restoId),
            // refetchInterval: 1000,
        });    

        return { data, error, isLoading, refetch };
};


export const useNotificationQuery = (restoId) => {
  // const [restos, ] = useAtom(restoAtom);
  // const restoId = restos?.id;
  // useWebSocket(restoId, queryClient);

  // console.log("The Use Info => ", restoId);
    const { data, error, isLoading, refetch } = useQuery({
            queryKey: ['notifiTable', restoId],
            retryOnMount: false,
            queryFn: () => fetchNotifications(restoId),
            // refetchInterval: 1000,
        });    

        return { data, error, isLoading, refetch };
};