import verifAvatar from '../../utils/verifAvatar'
import classes from './message.module.css'


export default function MessageReceive({message}){
    return(
        <div className={classes.message+' '+classes.receive}>
            <div><img className="avatar" src={verifAvatar(message.avatar)} /></div>
            <div>
                <span>{message.name}</span>
                <p>{message.content}</p>
            </div>
            <span>{message.hour}</span>
        </div>
    )
}