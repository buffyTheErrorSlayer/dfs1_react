import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getConference } from '../../services/conference'

import './Conference.css'

export function Conference() {

    const { id } = useParams();
    const [conf, setConf] = useState({})

    async function getConf() {
        const res = await getConference(id)
        setConf(res)
        console.log(conf)
    }

    const bgMainColor = {
        backgroundColor : conf.design?.mainColor ?? 'black'
    }

    useEffect(() => {
        getConf();
    }, []);

    return (
        <div className="conf-container">
            <div>
                <div className="cover">
                    <img src={conf.img ? conf.img : ""} alt="" />
                </div>
                <div>
                    {conf.title}
                </div>
                <div className='content mt-3'>
                    <div className='title'  style={bgMainColor}>
                        Contenu
                    </div>
                    <div className='content-text mt-3'>
                        {conf.content}
                    </div>
                </div>

            </div>
            <div className='info-container'>
                <div>Date : {conf.date}</div>
                <div>Durée : {conf.duration} </div>
                <div className='title mt-3' style={bgMainColor}>
                    Speakers :
                </div>
                <div className='list-container'>
                {
                        conf?.speakers?.map((sp) =>(
                            <>
                             <div key={sp.id}>
                             {sp.firstname} {sp.lastname}
                             </div>
                            </>
                           
                        ))
                    }
                </div>

                <div className='title mt-3' style={bgMainColor}>
                    Stakeholders :
                </div>
                <div className='list-container'>
                {
                        conf?.stakeholders?.map((sh) =>(
                            <>
                             <div key={sh.id}>
                             {sh.firstname} {sh.lastname} - {sh.job}
                             </div>
                            </>
                           
                        ))
                    }
                </div>
            </div>
        </div>

    )
}