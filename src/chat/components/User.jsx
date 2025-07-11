
import classes from './user.module.css'
import Bulle from './Bulle'
import verifAvatar from '../../utils/verifAvatar'
import StartConvButton from './button/StartConversationButton'
import ToprofilButton from './button/ToProfileButton'

export default function User({user}){
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
                <StartConvButton id={user.id_users} />
                <ToprofilButton id={user.id_users} />
            </div>
        </li>
    )
}