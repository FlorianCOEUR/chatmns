import { useNavigate } from "react-router";
import useAuth from "../context/useAuth";

export default function handleLogout() {
  const context=useAuth();
  const navigate=useNavigate();
  if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      context.setData(null);
      navigate("/auth/login");
    }
}