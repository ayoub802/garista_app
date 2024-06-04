import axiosInstance from "../axiosInstance";

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
            router.push('/(tabs)')
        }
        return res.data;
   }
   catch(err)
   {
    console.log("The Error => ", err.message);
   }    
}