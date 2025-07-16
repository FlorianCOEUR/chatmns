import { Outlet } from "react-router";
import HeaderLogin from "./HeaderLogin";


export default function Auth(){
    return(
        <>
            <HeaderLogin />
            <Outlet />
        </>
    )
}