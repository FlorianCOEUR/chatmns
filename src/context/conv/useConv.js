import { useContext } from "react";
import { ConvContext } from "./ConvContext";


export default function useConv(){
    return useContext(ConvContext);
}