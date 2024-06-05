import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { orderAtom, restoAtom, restoId, userId } from "../Atom/atoms";
import { OrderItems, fetchOrderDetails, fetchOrders, fetchRestoDetails } from "../modules/ApiGestion";
import { getUser } from "~/modules/StorageGestion";
import { useEffect, useState } from "react";


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
            queryKey: ['resto', resto_id],
            queryFn: () => fetchOrders(resto_id),
            onSuccess: (data) => {
            }
        });    
  return { data , error, isLoading, refetch  };
};

export const useOrderDetailQuery = (orderId) => {
    // const [restos, ] = useAtom(restoAtom);
    // const [, setOrderResto] = useAtom(orderAtom);
  
    // const resto_id = restos?.id;
      const { data, error, isLoading, refetch } = useQuery({
              queryKey: ['orderDetail', orderId],
              queryFn: () => fetchOrderDetails(orderId),
            //   onSuccess: (data) => {
            //   }
          });    
  
          return { data, error, isLoading, refetch };
  };
  