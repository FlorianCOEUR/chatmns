import { faComment } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function CommentIcon({className}){
    return(
        <FontAwesomeIcon icon={faComment} size="lg" className={className}/>
    )
}