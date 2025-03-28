
import { defineStore } from 'pinia'
import {ref} from 'vue';
import {createRestAPIClient} from "masto";

const SETTINGS_LOCAL_STORAGE_INSTANCE = 'HIFT_INSTANCE'

export const instanceStore = defineStore('instance', () => {

    const currentUser = ref(null)

    const getUser = ()=>{
        const settings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_INSTANCE)

        currentUser.value = settings ? JSON.parse(settings) : null
        return currentUser.value
    }

    const updateUser = (settings)=>{
        localStorage.setItem(SETTINGS_LOCAL_STORAGE_INSTANCE, JSON.stringify(settings))
        return getUser();
    }

    const removeUser = ()=>{
        localStorage.removeItem(SETTINGS_LOCAL_STORAGE_INSTANCE);
        currentUser.value = null;
    }

    const createAPI = ()=>{
        const accessToken = getUser().accessToken;
        const url = getUser().url;
        const masto = createRestAPIClient({
            url: url,
            accessToken: accessToken,
        });
        return masto;
    }

    const validUser = async ()=>{
        if (!(getUser() || {} ).accessToken) {
            return false;
        }
        try {
            const creds = await createAPI().v1.accounts.verifyCredentials();
            console.log(creds);
            return true;
        }catch (e){
            return false;
        }
    }

    return { currentUser, getUser, updateUser, removeUser, createAPI, validUser }
})