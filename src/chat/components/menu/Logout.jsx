import toast from "react-hot-toast";
import useAuth from "../../../context/useAuth";
import { api } from "../../../lib/api";
import useWebSocket from "../../../context/websocket/useWebSocket";

export default function Logout(){
    const ws=useWebSocket();
    const auth=useAuth();
    function handleLogout() {
        if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            toast.promise(
                fetch(api+"user/logout.php",{
                    headers:{
                    'Authorization': `Bearer ${auth.data.jwt}`
                    },
                })
                .then(async res=>{
                    const data=await res.json();
                    if(!res.ok){
                        throw new Error(data.message || "Une erreur est survenue");
                    }
                    return data;
                }),
                {
                    loading : 'Déconnexion en cours',
                    success : res=>{
                        auth.setData(null);
                        return res.message;
                    },
                    error : err=>{
                        return err.message;
                    }
                }
            )

            
        }
    }
    return (
        <li><a href="#" onClick={(e)=>{
            e.preventDefault();
            handleLogout();
        }}>Se déconnecter</a></li>
    );
}