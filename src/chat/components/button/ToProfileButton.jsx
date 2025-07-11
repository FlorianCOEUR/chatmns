import { useNavigate } from 'react-router';
import classes from './button.module.css';
import CircleUser from '../icon/CircleUser';

export default function ToprofilButton({id}){
    const navigate=useNavigate();
    return(
        <button className={classes.button} onClick={()=>navigate('/profil/'+id)}><CircleUser className="fa-orange" /> </button>
    )
}