
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function AngleLeft({className, onClick}){
    console.log(className);
    return (<FontAwesomeIcon icon={faAngleLeft} size="lg" className={className} onClick={onClick}/>)
}