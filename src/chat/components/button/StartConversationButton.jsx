import { useNavigate } from 'react-router';
import useConv from '../../../context/conv/useConv';
import useAuth from '../../../context/useAuth';
import CommentIcon from '../icon/FaComment';
import classes from './button.module.css';
import { api } from '../../../lib/api';


export default function StartConvButton({id}){
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
        <button className={classes.button} onClick={()=>handleClickStartConv(id)}><CommentIcon className={"fa-orange"} /></button>
    )
}