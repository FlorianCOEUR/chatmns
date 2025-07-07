import useConv from "../context/conv/useConv"
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import Loading from "./components/Loading";
import classes from './window.module.css';


export default function NewConvPrivee(){
    const {conv}=useConv();
    if(!conv){
        return (<Loading />)
    }
    return(
        <div className={classes.window} >
            <ChatHeader avatar={conv.avatar} name={conv.name} />
            <div className={classes.history}>
                
            </div>
            <ChatInput id={0}/>
        </div>
    )
}