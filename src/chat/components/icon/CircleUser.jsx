import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from '@fortawesome/free-regular-svg-icons'



export default function CircleUser({className}){

    return (
        <FontAwesomeIcon icon={faCircleUser} size="lg"  className={className}/>
    )
}