import verifAvatar from "../../utils/verifAvatar";


export default function AvatarInput({avatar, setAvatar, name, avatarPreview}){
    return(
        <div style={{margin:'auto'}}>
            <label htmlFor="avatar">
            <img
                src={(avatarPreview) ? verifAvatar(avatarPreview) : verifAvatar(avatar)}
                alt={`Avatar de : ${name}`}
                className="avatar"
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