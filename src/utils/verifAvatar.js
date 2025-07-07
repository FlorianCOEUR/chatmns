export default function verifAvatar(avatar){
    let img=import.meta.env.VITE_CHAT_MNS+'img/avatar/Avatar.png';
    if(avatar!=null){
        img=import.meta.env.VITE_AVATAR_URL+avatar;
    }
    if(avatar && avatar instanceof File){
        img=URL.createObjectURL(avatar);
    }
    return img;
}
