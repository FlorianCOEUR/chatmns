import { useState } from "react"
import classes from './chatinput.module.css'
import { api } from "../../lib/api";
import useAuth from "../../context/useAuth";
import toast from "react-hot-toast";
import useWebSocket from "../../context/websocket/useWebSocket";
import useConv from "../../context/conv/useConv";
import { useNavigate } from "react-router";

export default function ChatInput({id}){
    const [message, setMessage]=useState("");
    const context=useAuth();
    const {conv}=useConv();
    const navigate=useNavigate();
    const ws=useWebSocket();
    function sendMessage(e){
        const formData= new FormData();
        formData.append('id', id);
        formData.append('message', message);
        formData.append('participants', JSON.stringify(conv.participants))
        e.target.value="";
        fetch(api+'conv/message.php',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.data.jwt}`
            },
            body:formData
        })
        .then(async (response)=>{
            // if(!response.ok){
            //     const error=await response.text();
            //     throw new Error(`Erreur serveur: $response.status} - ${error}`)
            // }
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
                    from:context.data.user.id,
                    name:context.data.user.name+' '+context.data.user.firstname,
                    avatar: context.data.user.avatar,
                },
                participants:data.participants
            }
            ws.sendMessage(content);
            if(id===0){
                navigate('/'+data.id_conv)
            }
        })
        .catch(err=>{
            toast.error('une erreur est survenue')
        })
    }
    return(
        <div className={classes.input}>
            <form className={classes.form} onSubmit={(e)=>{
                if(message!==""){
                    sendMessage();
                }else{
                    e.preventDefault();
                }
                }}>
                <textarea  type="text" className={classes.textarea} onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                            if(message!==""){
                                sendMessage(e);
                            }
                        }
                    }}></textarea>
                <div>
                    <button type="submit"><img src="img/icon/sendMessage.png"
                            alt="icon d'envoi de message"/></button>
                </div>
            </form>            
        </div>
    )
}