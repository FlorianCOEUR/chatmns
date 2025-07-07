import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function FaXMark({className,onClick}){
    return(
        <FontAwesomeIcon icon={faXmark} size="lg" className={className} onClick={onClick} />
    )
}