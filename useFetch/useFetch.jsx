import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { orderAtom, restoAtom, restoId, userId } from "../Atom/atoms";
import { OrderItems, fetchCategories, fetchDishes, fetchOrderDetails, fetchOrders, fetchRestoDetails, fetchTables } from "../modules/ApiGestion";
import { getUser } from "~/modules/StorageGestion";
import { useEffect, useState } from "react";
import queryClient from "~/QueryClients/queryClient";


export const GetUserValue = async () => {
    // const [userId, setUserId] = useState(null);
   const [userID, setUderID] = useAtom(userId);
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const resId = await getUser();
          const parsedId = JSON.parse(resId);
          console.log("The User RestoId => ", parsedId);
          setUderID(parsedId);
        } catch (error) {
          console.error("Error fetching user ID: ", error);
        }
      };
    
      fetchUserId();
    }, []);

    return userId;
}
export const useRestoQuery = () => {
    const [userID, setUderID] = useAtom(userId);
    const [restos, setRestos] = useAtom(restoAtom);

    const user_id = userID
    const { data: resto, isLoading, error, refetch } = useQuery({
        queryKey: ['resto', user_id],
        queryFn: () => fetchRestoDetails(user_id),
      });

          
    setRestos(resto);

    return {  isLoading, error };
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
  const todayOrders = data?.filter(order => order.created_at.startsWith(currentDate));

  return { data , error, isLoading, refetch, data: todayOrders  };
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

