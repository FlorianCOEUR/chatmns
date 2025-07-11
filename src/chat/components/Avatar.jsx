import verifAvatar from "../../utils/verifAvatar";


export default function Avatar({src, name, style}){
    return(
        <img
        src={verifAvatar(src)}
        className="avatar" 
        alt={`Avatar du canal ${name}`}
        style={style}
        />
    )
}