import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import {getAllConferences} from '../../../services/conference'
export function ConferenceDashboard() {

    const [confList, setConfList] = useState([])
    const navigate = useNavigate();


    async function getAllConfs(){
        const res = await getAllConferences();
        setConfList(res)
    }

    useEffect(() => {
        getAllConfs();
    }, []);


    return (
        <>
        <main className="conference">
            <h1>Liste des conférences</h1>
            <table>
                <tr>
                    <th>
                        Titre
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                <>
                {
                    confList.map((conf) => (
                        <tr key={conf.id}>
                            <td>
                                {conf.title}
                            </td>
                            <td className='buttons'>
                                <>
                                <button className='default' onClick={() =>{
                                    navigate(`/conference/${conf.id}`)}} >Voir les détails</button>
                                <button className='edit'>Modifier</button>
                <button className='delete' onClick={() => console.log("Supprimer la conférence :", conf)}>Supprimer</button></>              
                            </td>
                        </tr>
                    ))
                }
                </>
            </table>
        </main>
        </>
    )
}