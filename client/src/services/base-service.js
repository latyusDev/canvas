import axios from 'axios';
import {getSession} from 'next-auth/react';
import Error from 'next/error';


const API_URL = process.env.API_URL||'http://localhost:5000';


export async function fetchWithAuth(endpoint,options={}){
    const session = await getSession();

    if(!session){
        throw new Error('You are not authenticated')
    }

    try{
        console.log(options)
        const response = await axios({
            url:`${API_URL}${endpoint}`,
            method:options.method||'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${session.idToken}`,
                ...options.headers
            },
            data:options?.body,
            params:options?.params
        })
        return response.data;

    }catch(e){
        console.log(e)
        throw new Error('Api request failed')

    }
}