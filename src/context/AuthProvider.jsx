import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.js";
import { api } from "../lib/api.js";
import Loading from "../chat/components/Loading.jsx";


export default function AuthProvider({children}){
    //Récupération du jwt dans le localstorage
  const [data, setData]=useState(()=>{
    const jwt=localStorage.getItem('jwt');
    return{
      user:{},
      jwt:jwt
    }
  });

  const [loading, setLoading]=useState(true);
  //définition de la fonction qui mettra a jour le context
  const setDataWithStorage=(data)=>{
    setData(data);
    if(!data){
      localStorage.removeItem('jwt');
    }else{
      localStorage.setItem('jwt', data.jwt);
    }
  }

useEffect(() => {
  
  async function verifyToken() {
    if (!data || !data.jwt) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(api + 'auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.jwt}`
        },
      });

      if (!response.ok) {
        setDataWithStorage(null);
      } else {
        const data = await response.json();
        console.log(data)
        if (data.status !== 'success') {
          setDataWithStorage(null);
        }else{
          setDataWithStorage({
            jwt: data.jwt,
            user: data.user
          })
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du JWT', error);
      setDataWithStorage(null);
    } finally {
      setLoading(false);
    }
  }

  verifyToken();
}, []);

    const value={
        data:data,
        setData:setDataWithStorage,
        isAuth:(data && data.jwt),
        loading
    }
    if(loading){
        return <Loading />
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}