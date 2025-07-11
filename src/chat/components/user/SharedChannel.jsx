import { Link } from "react-router";
import verifAvatar from "../../../utils/verifAvatar";
import classes from './infouser.module.css';
import Avatar from "../Avatar";


export default function SharedChannel({channel}){

    return(
        <Link className={classes.link} to={"/"+channel.id}>
            <Avatar src={channel.avatar} name={channel.name} />
            <div className="channel-info">
                <h3 className="channel-name">{channel.name}</h3>
            </div>
        </Link>
    )
}