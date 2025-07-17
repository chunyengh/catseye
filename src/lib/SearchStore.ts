import { writable } from "svelte/store";
import { myIndexStore } from './IndexStore.ts';
import { get } from 'svelte/store';

export const mySearchStore = writable({
    goSearch: async():Promise<undefined|string> => {
    
        let url= 'http://127.0.0.1:5000/search'
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'loopIndex': get(myIndexStore).loopIndex, 
                        'sq': get(myIndexStore).searchQuery,
                    }),
                }); 

                // focus on successful response;  i.e response OK (200-299) 
                if (!response.ok){
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                //continue on processing successful response
                let responseObj = await response.json(); 
                return responseObj;
            } catch (e){
        // response besides not ok, can also be network errors, use catch to catch errors     
                console.error(e);
            }
        }
    });
