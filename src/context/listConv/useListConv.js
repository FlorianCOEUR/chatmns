import { useContext } from "react";
import { ListConvContext } from "./ListConvContext";


export default function useListConv(){
    return useContext( ListConvContext);
}