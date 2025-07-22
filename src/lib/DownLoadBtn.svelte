<script lang='ts'>
    import type { ArticleIndexSelectedTestInfoObj }  from "./SearchType";
    import { arrayOfArticleIndexSelectedTestInfoObj, searchquery } from "./SearchStore";
    import { get } from "svelte/store";
    import { addToast } from "./store";

    let hasItemsToDownLoad = $state(false);
    
    async function goDownLoad(){
        let selectedArray = get(arrayOfArticleIndexSelectedTestInfoObj);
        let sq = get(searchquery);
        
        if (selectedArray.length != 0){
            hasItemsToDownLoad = true;
            await startDownLoad(sq, selectedArray);
        } else {
            addToast({'message':'no articles to download', 'timeout':2000});
        }
    }

    async function startDownLoad(searchquery:string, selectedObjArray:ArticleIndexSelectedTestInfoObj[]){
        let url= 'http://127.0.0.1:5000/download'
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'sq':searchquery,
                    'data':selectedObjArray,
                }),
            });
            if (!response.ok){
                throw new Error('Response status: ${response.status');
            }
           addToast({'message':'download success'});
        } catch (e){
            console.error(e)
        }
    }
    
</script>

<button onclick={()=> {goDownLoad()}}>
    下載文件
</button>

 

<style>
    button {
        background-color: 'red' ;
    }
</style>
