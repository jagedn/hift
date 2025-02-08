
import { defineStore } from 'pinia'
import {ref} from 'vue';

const SETTINGS_LOCAL_STORAGE = 'HIFT'

export const feelingStore = defineStore('feeling', () => {

    const initialFeeling = {
        a:3,
        b:3,
        c:3,
        d:3,
    }

    const getFeeling = ()=>{
        const settings = localStorage.getItem(SETTINGS_LOCAL_STORAGE)

        const ret = settings ? JSON.parse(settings) : initialFeeling
        return ret;
    }

    const updateFeeling = (settings)=>{
        localStorage.setItem(SETTINGS_LOCAL_STORAGE, JSON.stringify(settings))
        return getFeeling();
    }

    const removeFeeling = ()=>{
        localStorage.removeItem(SETTINGS_LOCAL_STORAGE);
    }

    return { getFeeling, updateFeeling, removeFeeling }
})