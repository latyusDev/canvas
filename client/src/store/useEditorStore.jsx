'use client';

import { centerCanvas } from "@/fabric/fabric-utils";
import { saveCanvasState } from "@/services/design-service";
import { debounce } from "lodash";
import { create } from "zustand";


export const useEditorStore = create((set,get)=>({
    canvas:null,
    setCanvas:(canvas)=>{
        set({canvas})
        if(canvas){
            centerCanvas(canvas)
        }
    },
    isEditing:true,
    setIsEditing:(isEditing)=>{
            set({isEditing})
    },
    name:'Untitled design',
    setName:(name)=>{
        set({name})
    },
    saveStatus:'saved',
    setSaveStatus:(saveStatus)=>{
        set({saveStatus})
    },
    lastModified:Date.now(),
    isModified:false,
    markAsModified:()=>{
        const {designId,debounceSaveToServer} = get();
        if(designId){
            set({
                lastModified:Date.now(),
                saveStatus:'Saving...',
                isModified:true,

            })
            debounceSaveToServer();
        }else{
            console.error('No design Id available')
        }
    },
    saveToServer:async()=>{
        const {designId,canvas,name} = get(); 
        if(!canvas||!designId){
            console.log('no design id or canvas instance is not available');
            return null;
        }

        try{
            const  saveDesign = await saveCanvasState(canvas,designId,name)
            set({
                saveStatus:'Saved',
                isModified:false,
            })
            return saveDesign

        }catch(e){
            set({saveStatus:'error'})
            return null
        }
    },
    debounceSaveToServer: debounce(()=>{
        get().saveToServer();
    },500),
    userSubscription:null,
    setUserSubscription:(userSubscription)=>set({userSubscription}),
    showDesignModal:false,
    setShowDesignModal:(showDesignModal)=>set({showDesignModal}),
    showPremiumModal:false,
    setShowPremiumModal:(showPremiumModal)=>set({showPremiumModal}),
    userDesigns:[],
    setUserDesigns:(userDesigns)=>set({userDesigns}),
    showProperties:false,
    setShowProperties:(showProperties)=>{
            set({showProperties})
    },
    designId:null,
    setDesignId:(designId)=>set({designId}),
    resetStore:()=>{
        set({
            canvas:null,designId:null,isEditing:true,
            name:'Untitled design',saveStatus:'Saved',
            isModified:false,lastModified:Date.now()
        })
        
    }
})) 