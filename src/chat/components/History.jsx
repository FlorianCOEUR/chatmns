import { useEffect, useRef } from "react";
import MessageReceive from "./MessageReceive"
import MessageSend from "./MessageSend"
import classes from './history.module.css'
import useAuth from "../../context/useAuth";
import useConv from "../../context/conv/useConv";
import Loading from "./Loading";

export default function History(){
    const historyRef=useRef(null);
    const context=useAuth();
    const {conv, messages}=useConv();
    
    useEffect(()=>{
        if(conv && historyRef.current){
            historyRef.current.scrollTop=historyRef.current.scrollHeight;
        }
    },[conv, messages])
    return(
        <div className={classes.history} ref={historyRef}>
            {(!messages)?<Loading/> : messages.map(message=>{
                if(message){
                    if(message.from===context.data.user.id){
                        return <MessageSend key={message.id} message={message} />
                    }else{
                        return <MessageReceive key={message.id} message={message} />
                    }
                }
            })}
        </div>
    )
}