import FaXMark from "./../icon/FAxMark";
import FaPlus from "./../icon/FaPlus";

export default function UserListItem({user, action= "add", onClick }){

    return(
        <li key={user.id}>
            <p>{user.user_nom+" "+user.user_prenom}</p>
            {action==="add" && (<FaPlus className="fa-orange" onClick={()=>onClick(user.id_user)} />)}
            {action ==="delete" && <FaXMark className="fa-orange" onClick={()=>{onClick(user.id_user) }} />}
            
        </li>
    )
}