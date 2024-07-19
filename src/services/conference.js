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


