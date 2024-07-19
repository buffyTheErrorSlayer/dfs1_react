import axios from "axios";

export async function getAllUsers(token){

    const res = await axios.get(`http://localhost:4555/users`, { 'headers': { 'Authorization': `Bearer ${token}`  } } )

    return res.data
}


// export async function addUser(id, password){

//     const res = await axios.post(`http://localhost:4555/signup/`, {
//         id : id, password : password
//     } )

//     return res
// }
// export async function addAdmin(id, password){

//     const res = await axios.post(`http://localhost:4555/signupadmin/`, {
//         id : id, password : password
//     } )

//     return res
// }


export async function login(id, password){
    const res = await axios.post(`http://localhost:4555/login`, {
        id : id, password : password
    })

    localStorage.setItem("token", res.data)
    return res.data
}

export async function isAdmin(token)
{
    const res = await axios.get(`http://localhost:4555/isadmin`, { 'headers': { 'Authorization': `Bearer ${token}`  } })
    return res.data.isAdmin
}

export async function changePermission(id, body, token)
{
    
    const res = await axios.patch(`http://localhost:4555/usertype/${id}`, body, { 'headers': { 'Authorization': `Bearer ${token}`  } } )

    return res.data
}


