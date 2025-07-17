import { useNavigate } from 'react-router';
import useConv from '../../../context/conv/useConv';
import useAuth from '../../../context/useAuth';
import CommentIcon from '../icon/FaComment';
import classes from './button.module.css';
import { api } from '../../../lib/api';


export default function StartConvButton({user}){
    const auth=useAuth();
    const {setConv}=useConv();
    const navigate=useNavigate();
    const handleClickStartConv=(user)=>{
        const formData=new FormData();
        formData.append("id_user", user.id_user)
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
                    participants:[auth.data.user.id, user.id_user]
                });
                navigate('/newConvPrivee');
            }

        })
    }
    return(
        <button className={classes.button} onClick={()=>handleClickStartConv(user)}><CommentIcon className={"fa-orange"} /></button>
    )
}