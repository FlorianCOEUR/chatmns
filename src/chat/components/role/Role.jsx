import classes from "./role.module.css";

export default function Role({nom}){

    return (
        <span className={classes.role}>{nom}</span>
    )
}