import { createContext } from "react";



const AuthContext=createContext({
    data:null,
    setData:()=>null,
    isAuth:null
});
export default AuthContext;