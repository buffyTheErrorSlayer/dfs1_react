import {useState, useEffect} from 'react'
import {getAllConferences} from '../../../services/conference'
export function ConferenceDashboard() {

    const [confList, setConfList] = useState([])

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
                            <td>
                                <button className='default'>Voir les détails</button>
                                <button className='edit' onClick={() => console.log( "Modifier la conférence :", conf)}>Modifier</button>
                <button className='delete' onClick={() => console.log("Supprimer la conférence :", conf)}>Supprimer</button>                  
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