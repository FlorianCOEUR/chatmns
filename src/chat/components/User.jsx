
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './user.module.css'
import { faCircleUser, faComment } from '@fortawesome/free-regular-svg-icons'
import Bulle from './Bulle'
import verifAvatar from '../../utils/verifAvatar'
import { Link, useNavigate } from 'react-router'
import { api } from '../../lib/api'
import useAuth from '../../context/useAuth'
import useConv from '../../context/conv/useConv'

export default function User({user}){
    const auth=useAuth();
    const {setConv}=useConv();
    const navigate=useNavigate();
    const handleClickStartConv=(id)=>{
        const formData=new FormData();
        formData.append("id_user", id)
        fetch(api+"/conv/check.php",{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${auth.data.jwt}`
            },
            body:formData
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.id_conv!==0){
                navigate('/'+data.id_conv);
            }else{
                setConv({
                    name:user.user_prenom+' '+user.user_nom,
                    avatar:user.user_avatar,
                    participants:[auth.data.user.id, user.id_users]
                });
                navigate('/newConvPrivee');
            }

        })
    }
    return(
        <li className={classes.user}>
            <div style={{position:"relative", height:"60px"}}>
                <img className="avatar" alt="" src={verifAvatar(user.user_avatar)} />
                <Bulle className={user['statut_nom']+" statut"} />
            </div>
            <div>
                <p>{user.user_nom}</p>
                <p>{user.user_prenom}</p>
            </div>
            <div>
                <button className={classes.button} onClick={()=>handleClickStartConv(user.id_users)}><FontAwesomeIcon icon={faComment} size="lg" className="fa-orange"/></button>
                <Link to={'user/'+user.id_users} style={{paddingRight:"5px"}}><FontAwesomeIcon icon={faCircleUser}  className="fa-orange"/></Link>
            </div>
        </li>
    )
}