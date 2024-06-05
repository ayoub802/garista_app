import axiosInstance from "../axiosInstance";
import { fetchRestoDetails } from "./ApiGestion";
import { useRestoQuery } from "../useFetch/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoAtom, userId } from "~/Atom/atoms";
import { useAtom } from "jotai";
import { saveUser } from "./StorageGestion";

export const LoginProvider = async ({
  login, 
  password,
  setLoading,
  router
}) => {
  
  setLoading(true)
  try{
    const res = await axiosInstance.post("/auth/login", {
      login: login,
      password: password
    })
        if(res)
        {
            setLoading(false)
            const {user} = res.data
            saveUser(JSON.stringify(user.id))
            router.push('/(tabs)')
        }
        return res.data;
   }
   catch(err)
   {
    console.log("The Error => ", err.message);
   }    
}

// export const useLoginAndFetchResto = () => {
//     const [, setResto] = useAtom(restoAtom);
//     const queryClient = useQueryClient();
  
//     const loginMutation = useMutation(loginProvider, {
//       onSuccess: async (data) => {
//         const { user } = data;
//         const { id: user_id } = user;
  
//         // Fetch resto details
//         const restoData = await fetchRestoDetails(user_id);
//         setResto(restoData);
  
//         // Optionally, invalidate or refetch queries related to resto
//         queryClient.invalidateQueries(['resto', user_id]);
//       },
//     });
  
//     return loginMutation;
//   };