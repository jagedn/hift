
import { defineStore } from 'pinia'
import {ref} from 'vue';

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

    return { currentUser, getUser, updateUser, removeUser }
})