import verifAvatar from "../../../utils/verifAvatar";
import StartConvButton from "../button/StartConversationButton";
import classes from './infouser.module.css';
import Role from "../role/Role";

export default function InfoUser({user}){
    return(
        <fieldset className={classes.content+' '+classes.col}>
            <legend>Info de l'utilisateur</legend>
            <div>
                <img
                className="avatar"
                src={verifAvatar(user.avatar)}
                alt={`Avatar de ${user.firstname} ${user.name}`}
                />
            </div>
            <Role nom={user.role} />
            <div className={classes.info}>
                <h2>{user.firstname} {user.name}</h2>
                <p><strong>Rôle :</strong> {user.role}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Bio :</strong> {user.bio || 'Aucune bio fournie.'}</p>
            </div>
            <div className={classes.actions}>
                <StartConvButton id={user.id} />
            </div>
        </fieldset>
    )
}