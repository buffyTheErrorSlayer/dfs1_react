import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllUsers, changePermission } from "../../../services/user";
export function UserDashboard() {
  const [userList, setUserList] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function getAll() {
    try {
      const res = await getAllUsers(token);
      setUserList(res);
    } catch (err) {
      console.error("Can't get users", err);
    }
  }

  async function updatePermission(id)
  {
    try{
        const res = await changePermission(id, {newType : "admin"}, token);
        if(res.success){
            getAll()
        }
    } catch (err) {
        console.error("Can't change permission", err);
    }
  }

  useEffect(() => {
    getAll();
  }, [userList]);

  return (
    <>
      <main className="conference">
        <h1>Liste des utilisateurs</h1>

        <table>
          <thead>
          <tr>
            <th>Titre</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
          </thead>
          <>
            <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.type}</td>
                <td className="buttons">
                  <>
                    <button
                      className="default"
                      onClick={() => {updatePermission(user.id)}}
                    >
                      Passer en admin
                    </button>

                  </>
                </td>
              </tr>
            ))}
            </tbody>
          </>
        </table>
      </main>
    </>
  );
}
