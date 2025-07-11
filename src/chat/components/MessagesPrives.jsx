import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../context/useAuth"
import Channel from "./Channel";
import { api } from "../../lib/api";
import classes from "./channel.module.css";
import verifAvatar from "../../utils/verifAvatar";
import useListConv from "../../context/listConv/useListConv";
import Loading from "./Loading";



export default function MessagesPrivees(){
    const {mps}=useListConv()
    if(!mps)
        return (<Loading />)
    return (
        <>
            <div className={classes.header}>
                <h2>Messages Privés</h2>
                <Link to="search" ><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#fe4310",}} /></Link>
            </div>
            <ul>
                {mps && mps
                    .filter(mp=>mp)
                    .map(mp=>(
                        <Channel 
                        key={mp.id_conv} 
                        id={mp.id_conv} 
                        name={mp.nom+' '+mp.prenom} 
                        avatar={verifAvatar(mp.user_avatar)}
                        message={mp.message} 
                        date={mp.m_date} 
                        nb_non_lus={mp.nb_non_lus}
                        id_user={mp.id_user}
                        />
                    ))}
            </ul>
        </>
    )
}
