import { useNavigate } from "react-router";
import AngleLeft from "./icon/AngleLeft";


export default function HeaderPge({title}){
    const navigate=useNavigate();
    return (
        <div className="header">
            <div>
                <AngleLeft className="fa-orange mobile-only" onClick={()=>{
                    console.log('je ferme');
                    navigate('/')}}/>
                <h2>{title}</h2>
            </div>
        </div>
    )
}