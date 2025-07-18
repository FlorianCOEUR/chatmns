import { useEffect, useRef, useState } from 'react';
import verifAvatar from '../../../utils/verifAvatar';
import classes from './../../menu.module.css'
import useAuth from '../../../context/useAuth';
import { Link} from 'react-router';
import Logout from './Logout';

export default function MenuHead(){
    const [isShowed, setIsShowed]=useState(false);
    const context=useAuth();
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
    return (
        
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

                    <Logout />
                </ul>
            </nav>
            <div>
                <img src="/img/aMNS_logo.png" alt="logo Access MNS" />
            </div>
        </div>
    );
}