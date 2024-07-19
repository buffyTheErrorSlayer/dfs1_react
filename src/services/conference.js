import axios from "axios";

export async function getAllConferences(){

    const res = await axios.get(`http://localhost:4555/conferences`)
    return res.data
}  


export async function getConference(id){

    const res = await axios.get(`http://localhost:4555/conference/${id}`)

    return res.data
}


export async function addConference(conf){

    const res = await axios.post(`http://localhost:4555/signup/`, {
        conf
    } )

    return res
}

export async function deleteConference(id, token){

    const res = await axios.delete(`http://localhost:4555/conference/${id}`, { 'headers': { 'Authorization': `Bearer ${token}`  } })

    return res.data
}

export async function updateConference(id, conf, token){

    const res = await axios.patch(`http://localhost:4555/conference/${id}`, conf, { 'headers': { 'Authorization': `Bearer ${token}`  } })

    return res.data
}



