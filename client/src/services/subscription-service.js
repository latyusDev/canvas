import { fetchWithAuth } from "./base-service";

export async function getUserSubscription(){
    return fetchWithAuth('/api/subscription');
}

export async function createPaypalOrder(){
    return fetchWithAuth('/api/subscription/create-order',{
        method:'post'
    });
}

