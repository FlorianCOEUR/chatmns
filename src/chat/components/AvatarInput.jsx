import verifAvatar from "../../utils/verifAvatar";
import Avatar from "./Avatar";


export default function AvatarInput({avatar, setAvatar, name, avatarPreview}){
    return(
        <div style={{margin:'auto'}}>
            <label htmlFor="avatar">
            <Avatar src={(avatarPreview) ? avatarPreview : avatar}
                name={name}
                style={{ cursor: 'pointer' }}
            />
            </label>

            <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            style={{ display: 'none' }}
            />
        </div>
    )
}