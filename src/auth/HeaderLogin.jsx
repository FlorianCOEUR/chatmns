import classes from './HeaderLogin.module.css';

export default function HeaderLogin(){
    return(
        <div className={classes.headerLogin}>
            <div >
                <img src="/img/aMNS_logo.png" alt="logo Access MNS"/>
                <div>
                    <span>Premier jour? </span>
                    <a href="#" id="starting">Démarrez ici!</a>
                </div>
            </div>
        </div>
    );
}