import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function FaPlus({className, onClick}){
    return (
        <FontAwesomeIcon icon={faPlus} size="lg" className={className} onClick={onClick} />
    )
}