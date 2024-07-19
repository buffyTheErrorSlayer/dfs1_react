import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllConferences,
  deleteConference,
} from "../../../services/conference";
export function ConferenceDashboard() {
  const [confList, setConfList] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function getAllConfs() {
    const res = await getAllConferences();
    setConfList(res);
  }

  async function deleteConf(id) {
    const res = await deleteConference(id, token);
    if (res.status === 200) {
      console.log("Conference supprimée avec succès");
      getAllConfs();
    }
  }

  useEffect(() => {
    getAllConfs();
  }, [confList]);

  return (
    <>
      <main className="conference">
        <h1>Liste des conférences</h1>
        <table>
          <tr>
            <th>Titre</th>
            <th>Actions</th>
          </tr>
          <>
            {confList.map((conf) => (
              <tr key={conf.id}>
                <td>{conf.title}</td>
                <td className="buttons">
                  <>
                    <button
                      className="default"
                      onClick={() => {
                        navigate(`/conference/${conf.id}`);
                      }}
                    >
                      Détails
                    </button>

                    <button
                      className="edit"
                      onClick={() => {
                        navigate(`/conference/${conf.id}`, {
                          state: { edit: true },
                        });
                      }}
                    >
                      Modifier
                    </button>
                    
                    <button
                      className="delete"
                      onClick={() => {
                        deleteConf(conf.id, token);
                      }}
                    >
                      Supprimer
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </>
        </table>
      </main>
    </>
  );
}
