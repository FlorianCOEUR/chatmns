import classes from './message.module.css'

export default function MessageSend({message}){
    return(
        <div className={classes.sent+' '+classes.message}>
            <span>{message.hour}</span>
            <p>{message.content}</p>
        </div>
    )
}