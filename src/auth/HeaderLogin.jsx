import { Link } from 'react-router';
import classes from './HeaderLogin.module.css';

export default function HeaderLogin(){
    return(
        <div className={classes.headerLogin}>
            <div >
                <Link to="/auth/" ><img src="/img/aMNS_logo.png" alt="logo Access MNS"/></Link>
                <div>
                    <span>Premier jour? </span>
                    <Link to="/auth/register">Démarrez ici!</Link>
                </div>
            </div>
        </div>
    );
}