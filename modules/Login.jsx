import axiosInstance from "../axiosInstance";
import { fetchRestoDetails } from "./ApiGestion";
import { useRestoQuery } from "../useFetch/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoAtom, userId } from "~/Atom/atoms";
import { useAtom } from "jotai";
import { saveStaff, saveUser } from "./StorageGestion";

export const LoginProvider = async ({
  login, 
  password,
  setLoading,
  router,
  expoPushToken
}) => {
  
  setLoading(true)
  try{
    const res = await axiosInstance.post("/auth/login", {
      login: login,
      password: password
    })
    console.log("Updating Expo Token: ", expoPushToken);

        if(res)
        {
            const {role, user} = res.data
            if(role == "staff" && user.role.name == "Waiter")
            {
              saveUser(JSON.stringify(user.user_id))
              saveStaff(JSON.stringify(user))
              const id = JSON.stringify(user.id)
              UpdateExpoPushToken(id, expoPushToken)
              router.push('/(tabs)')
            }
            // else{
            //   saveUser(JSON.stringify(user.id))
            //   // const id = JSON.stringify(user.id)
            //   // UpdateExpoPushToken(id, expoPushToken)
            //   router.push('/(tabs)')
            // }

            console.log("The User => ", JSON.stringify(user.user_id));
        }
        return res.data;
   }
   catch(err)
   {
    console.log("The Error => ", err.message);
   }   
   finally{
    setLoading(false)
   } 
}


export const UpdateExpoPushToken = async (id, expoPushToken) => {
  try{
    const formData = new FormData();
    formData.append('expoPushToken', expoPushToken);  
    console.log("Updating Expo Token for ID: ", id, " Token of All: ", formData);

    const res = await axiosInstance.put('/staffs/' + id, {
      expoPushToken: expoPushToken
    });

     if(res)
     {
      console.log("Update Successfully => ", res.data);
     }
  }
  catch(err){
    console.log("The Error of Update => ", err);
  };
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