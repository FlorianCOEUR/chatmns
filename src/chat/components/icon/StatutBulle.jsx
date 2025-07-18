import { useEffect, useState } from "react"
import classes from './statutbulle.module.css'

export default function StatutBulle({statut}){
    
    const [classStatut, setClassStatut]=useState("");
    useEffect(()=>{
        switch (String(statut)){
            case "1" :
                setClassStatut("online");
                break;
            case "2" : 
                setClassStatut("away");
                break;
            case "3":
                setClassStatut("offline");
                break;
            default : 
                setClassStatut("none");
        }
    },[statut]);
    return(
        <span className={` bulle ${classes.statut} ${classes[classStatut]}`}></span>
    )
}