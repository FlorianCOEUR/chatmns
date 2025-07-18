import classes from './menu.module.css';
import ListConv from './ListConv';
import MenuHead from './components/menu/MenuHead';

export default function Menu(){
    return (
        <div className={classes.menu}>
            <MenuHead />
            <ListConv />
        </div>
    )
}