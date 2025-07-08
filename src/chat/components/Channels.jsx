import useAuth from "../../context/useAuth"
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-solid-svg-icons";
import classes from "./channel.module.css";
import Channel from "./Channel";
import verifAvatar from "../../utils/verifAvatar";
import useListConv from "../../context/listConv/useListConv";
import Loading from "./Loading";
import { Link } from "react-router";




export default function Channels(){
    const context=useAuth();
    const {channels}=useListConv()
    if(!channels){
        return (<Loading />)
    }
    return(
        <>
            <div className={classes.header}>
                <h2>Channels</h2>
                {[1, 2].includes(context.data.user.id_role) && <Link to="/channels/new" ><FontAwesomeIcon icon={faComments} size="lg" style={{color: "#fe4310",}} /> </Link>}
            </div>
            <ul>
                {channels && channels.filter(channel=>channel)
                .map(channel=>(
                    <Channel 
                    key={channel.id_conv} 
                    id={channel.id_conv} 
                    name={channel.conv_nom} 
                    avatar={verifAvatar(channel.conv_avatar)}
                    message={channel.message} 
                    date={channel.m_date} 
                    gerant={channel.gerant}
                    nb_non_lus={channel.nb_non_lus}/>
                ))}
            </ul>
        </>
    )
}