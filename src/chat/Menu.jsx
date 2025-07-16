import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../context/useAuth';
import classes from './menu.module.css';
import verifAvatar from '../utils/verifAvatar';
import ListConv from './ListConv';

export default function Menu(){
    const [isShowed, setIsShowed]=useState(false);
    const context=useAuth();
    const navigate=useNavigate();
    const menuRef=useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsShowed(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    function handleLogout() {
        if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            context.setData(null);
            navigate("/auth/login");
        }
    }
    return (
        <div className={classes.menu}>
            <div className={classes.menu_chat_head}>
                <nav ref={menuRef}>
                    <img 
                    className='avatar'
                        src={verifAvatar(context.data.user.avatar)}
                        alt="Mon avatar" onClick={()=>setIsShowed(!isShowed)}/>
                    <span className="bulle statut en_Ligne"></span>
                    <ul className={`${classes.nav} ${isShowed ? classes.nav_show : classes.nav_hide}`}>
                        <li>{context.data.user.name}
                        </li>
                        <li><Link to="/profil">Mon Profil</Link></li>
                        <li><a href="">Activer mon message
                                d'absence</a></li>
                        <li><a href="backOffice/index.php">Panneau d'administration</a></li>

                        <li><a href="#" onClick={(e)=>{
                            e.preventDefault();
                            handleLogout();
                        }}>Se déconnecter</a></li>
                    </ul>
                </nav>
                <div>
                    <img src="/img/aMNS_logo.png" alt="logo Access MNS" />
                </div>
            </div>
            <ListConv />
        </div>
    )
}