import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "./Home.css"
import {getAllConferences} from '../../services/conference'
export function Home() {

    const [confList, setConfList] = useState([])
    const navigate = useNavigate();

    async function getAllConfs() {
        try {
          const res = await getAllConferences();
          setConfList(res);
        } catch (err) {
          console.error("Can't get conferences :", err);
        }
      }


    useEffect(() => {
        getAllConfs();
    }, []);


    return (
        <>
        <main className="conference">
            <h1>Liste des conférences</h1>
            <table>
                <thead>
                <tr>
                    <th>
                        Titre
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                <>
                {
                    confList.map((conf) => (
                        <tr key={conf.id}>
                            <td>
                                {conf.title}
                            </td>
                            <td className='buttons'>
                                <button onClick={() => {
                                    navigate(`conference/${conf.id}`)
                                }} className='default'>Détails</button>                  
                            </td>
                        </tr>
                    ))
                }
                </>
                </tbody>
            </table>
        </main>
        </>
    )
}