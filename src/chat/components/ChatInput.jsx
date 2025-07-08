import { useState } from "react"
import classes from './chatinput.module.css'
import useConv from "../../context/conv/useConv";
import useSendMessage from "../../utils/sendMessage";

export default function ChatInput({id}){
    const [message, setMessage]=useState("");
    const {conv}=useConv();
    const sendMessage= useSendMessage();
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
                                sendMessage(id, message, conv.participants);
                                e.target.value = "";
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