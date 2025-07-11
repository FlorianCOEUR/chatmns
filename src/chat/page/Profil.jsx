import { useEffect, useState } from "react";
import HeaderPge from "../components/HeaderPge";
import Loading from "../components/Loading";
import { api } from "../../lib/api";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../context/useAuth";
import InfoUser from "../components/user/InfoUser";
import SharedChannels from "../components/user/SharedConversations";


export default function Profil(){
    const [user, setUser] = useState(null);
    const [channelsShared, setChannelsShared]=useState(null);
    const auth=useAuth();
    const {id}=useParams();
    useEffect(()=>{
        fetch(api+"user/user.php?id="+id,{
            headers : {
                'Authorization': `Bearer ${auth.data.jwt}`
            }
        })
        .then(async res=>{
            const data=await res.json();
            if(!res.ok){
                throw new Error(data.message || "Une erreur est survenue");
            }
            return data;
        })
        .then(data=>{
            setUser(data.user);
            setChannelsShared(data.channels);
        })
        .catch(err=>{
            toast.error(err.message);
        })
    },[id])


    if(!user){
        return(
            <Loading />
        )
    }
    return(
        <div className="container">
            <HeaderPge title={`Profil de ${user.name} ${user.firstname}` } />
            <InfoUser user={user} />
            <SharedChannels channels={channelsShared} />
        </div>
    )
}