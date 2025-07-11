import { useEffect, useState } from "react";
import useAuth from "../../context/useAuth";
import classes from "./../search.module.css";
import Loading from "./Loading";
import { api } from "../../lib/api";


export default function SearchUserForm({ setUsers, isForm = true }) {
  const [searchUser, setSearchUser] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [roles, setRoles] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    fetch(api + "role/roles.php", {
      headers: {
        Authorization: `Bearer ${auth.data.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      });
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const formData = new FormData();

    if (searchUser.trim() !== "") {
      const input = searchUser.split(" ");
      formData.append("inputs", JSON.stringify(input));
    }

    if (searchRole !== "") {
      formData.append("role", searchRole);
    }

    fetch(api + "user/users.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.data.jwt}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  if (!roles) return <Loading />;

  const content = (
    <>
      <label htmlFor="searchUser">Nom d'utilisateur :</label>
      <input
        type="text"
        id="searchUser"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />

      <fieldset>
        <legend>Rôles :</legend>
        <div className={classes.roles}>
          <div>
            <input
              type="radio"
              value=""
              checked={searchRole === ""}
              onChange={(e) => setSearchRole(e.target.value)}
            />
            <label>Tous</label>
          </div>
          {roles.map((role) => (
            <div key={role.id_role}>
              <input
                type="radio"
                value={String(role.id_role)}
                checked={searchRole === String(role.id_role)}
                onChange={(e) => setSearchRole(e.target.value)}
              />
              <label>{role.role_nom}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <button className="button" type={isForm ? "submit" : "button"} onClick={!isForm ? handleSearch : undefined}>
        Rechercher
      </button>
    </>
  );

  return isForm ? (
    <form className={classes.form} onSubmit={handleSearch}>
      {content}
    </form>
  ) : (
    <div className={classes.form}>{content}</div>
  );
}
