import { useNavigate } from "react-router";
import classes from './chatheader.module.css'
import AngleLeft from "./icon/AngleLeft";
import verifAvatar from "../../utils/verifAvatar";
import useConv from "../../context/conv/useConv";
import Loading from "./Loading";

export default function ChatHeader(){
    const navigate=useNavigate();
    const {conv}=useConv();
    if(!conv) (<Loading />)
    return(
        <div className={classes.header}>
            <div>
                <div>
                    <AngleLeft className="icon-white mobile-only" onClick={()=>{
                        console.log('je ferme');
                        navigate('/')}}/>
                    <img className='avatar' src={verifAvatar(conv.avatar)} alt="Avatar la conversation" />
                </div>
                <p>{conv.name}</p>
            </div>
        </div>
    )
}