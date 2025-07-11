import { useParams } from "react-router";
import HeaderPge from "../components/HeaderPge";
import { api } from "../../lib/api";
import useAuth from "../../context/useAuth";
import { useEffect, useState } from "react";
import ChannelForm from "../components/channel/ChannelForm";
import toast from "react-hot-toast";


export default function UpdateChannel(){
    const {id}=useParams();
    const [channel, setChannel]=useState(null);
    const auth=useAuth()
    const formData=new FormData();
    formData.append('id', id);
    useEffect(()=>{
        fetch(api+"conv/conv.php",{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${auth.data.jwt}`
            },
            body: formData
        })
        .then(async res=>{
            const data=await res.json();
            if(!res.ok){
                throw new Error(data.message || "Une erreur est survenue");
            }
            return data;
        })
        .then(data=>{
            setChannel(data);
        })
    },[id]);
    const updateChannel=(data)=>{
        const formData=new FormData();
        formData.append('id', id)
        formData.append('name', data.name);
        formData.append('participants', JSON.stringify(data.participants));
        if(data.avatar!==null){
            formData.append('avatar', data.avatar);
            formData.append('old_avatar', channel.avatar);
        }
        toast.promise(
            fetch(api+"conv/update.php",{
                method: 'POST',
                headers:{
                    'Authorization': `Bearer ${auth.data.jwt}`
                },
                body: formData
            })
            .then(async res=>{
                const data=await res.json();
                if(!res.ok){
                    throw new Error(data.message || "Une erreur est survenue");
                }
                return data
            }),
            {
                loading:"Mise à jour en cours",
                success:(res)=>{
                    console.log(res);
                    return "Mise à jour du Channel réussie";
                },
                error: (err)=>{
                    console.log(err);
                    return "Mise à jour impossible!"
                }
            }
        )


    }
    return(
        <div className="container">
            <HeaderPge title="Modification de channel" />
            <ChannelForm channel={channel} update={true} onSubmit={updateChannel}/>
        </div>
    )
}