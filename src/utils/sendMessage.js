import { useNavigate } from "react-router";
import useAuth from "../context/useAuth";
import useConv from "../context/conv/useConv";
import useWebSocket from "../context/websocket/useWebSocket";
import { api } from "../lib/api";
import toast from "react-hot-toast";

export default function useSendMessage(){
    const auth = useAuth();
    const {conv}=useConv();
    const ws=useWebSocket();
    const navigate= useNavigate();
    const sendMessage = (id, message, participants)=>{
        const formData= new FormData();
        formData.append('id', id);
        formData.append('message', message);
        formData.append('participants', JSON.stringify(participants));
        fetch(api+'conv/message.php',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.data.jwt}`
            },
            body:formData
        })
        .then(async (response)=>{
            if(!response.ok){
                const error=await response.text();
                throw new Error(`Erreur serveur: $response.status} - ${error}`)
            }
            const data= await response.json();
            return data;
        })
        .then(data=>{
            const content={
                message:{
                    id_conv:data.id_conv,
                    id:data.id_message,
                    content:message,
                    hour:data.heure,
                    date:data.date,
                    type:data.type,
                    from:auth.data.user.id,
                    name:auth.data.user.name+' '+auth.data.user.firstname,
                    avatar: auth.data.user.avatar,
                },
                participants:data.participants
            }
            console.log(content);
            ws.sendMessage(content);
            if(id===0){
                navigate('/'+data.id_conv)
            }
        })
        .catch(err=>{
            toast.error(err.message || 'Une erreur est survenue');
        })
    }
    return sendMessage;
}