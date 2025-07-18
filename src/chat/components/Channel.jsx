import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import classes from './../menu.module.css';
import useAuth from '../../context/useAuth';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useNavigate } from 'react-router';
import StatutBulle from './icon/StatutBulle';

export default function Channel({name, avatar, message, date, gerant, id, nb_non_lus, id_user, statut}){
    const [showed, setShowed]=useState(false);
    const context=useAuth();
    const menuRef=useRef()
    const navigate=useNavigate();
    const handleClickNav=(to, e)=>{
        e.stopPropagation();
        e.preventDefault();
        navigate(to);
        setShowed(false)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowed(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return(
        <li >
            <NavLink to={`/${id}`} className={`${classes.channel} `} >
                <img className='avatar'  src={avatar} alt={`Avatar de : ${name}`} />
                <StatutBulle statut={statut} />
                {(nb_non_lus!==0) && <span className={"bulle "+classes.unread}>{nb_non_lus}</span>}
                <div>
                    <div className={classes.channel_head}>
                        <p style={{ fontWeight: 'bold' }}>{name}</p>
                        <div>
                            <FontAwesomeIcon ref={menuRef} icon={faEllipsisVertical} size="lg" onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                setShowed(!showed);
                                }}/>
                            <ul  ref={menuRef} style={{right: '0'}} className={`${classes.nav} ${showed ? classes.nav_show : classes.nav_hide}`}>
                                {gerant
                                    ? (
                                        <>
                                        {context.data.user.id === gerant && <li onClick={(e)=>{
                                            handleClickNav(`/channels/update/${id}`, e);
                                        }}>Gérer la conversation</li>}
                                        <li>Voir les infos</li>
                                        </>
                                    )
                                    : (<li onClick={(e)=>{
                                        handleClickNav(`/profil/${id_user}`,e);
                                    }}>Voir le profil</li>)
                                }
                                
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className={classes.preview}>{message}</p>
                        <span className={classes.time}>{date}</span>
                    </div>
                </div>
            </NavLink>
        </li>
    )
}