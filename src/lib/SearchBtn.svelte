<script lang='ts'>
  //  import { myIndexStore } from './IndexStore.ts';
    import SearchResult from './SearchResult.svelte';
  //  import { mySearchStore } from './SearchStore.ts';
 
    let { searchValue } = $props();
    let btnValue:string = $state(''); 
    let searchquery:string = $state('');
    let re = $state();
   
    let responseObj = $state();
    $inspect(searchquery);
    $inspect(responseObj);
    
    function convertSearchValue(){
        let btnValuewospacebe = btnValue.trim();
        let btnvaluearray = btnValuewospacebe.split(' ');
        searchquery = btnvaluearray.join('+');
    }
 
  
    async function goSearch(loopIndex:string, searchquery:string) {
        let url= 'http://127.0.0.1:5000/search'
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                       // 'loopIndex': get(myIndexStore).loopIndex, 
                       // 'sq': get(myIndexStore).searchQuery,
                       'loopIndex':loopIndex,
                       'sq':searchquery
                    }),
                }); 

                // focus on successful response;  i.e response OK (200-299) 
                if (!response.ok){
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                //continue on processing successful response
                responseObj = await response.json(); 
               // return responseObj;
            } catch (e){
        // response besides not ok, can also be network errors, use catch to catch errors     
                console.error(e);
            }
    }
          
</script>

<button 
    aria-label='search button'
    onclick={()=>{
        btnValue = searchValue;
        convertSearchValue();
        //$myIndexStore.loopIndex = '0';
        //$myIndexStore.searchQuery = search_query;
        //re=$mySearchStore.goSearch();
        goSearch('0', searchquery);

    }}
>搜尋</button>
<p>go search:{searchValue}</p> 

{#if responseObj}
  
    <SearchResult searchResult = {responseObj} /> 
{/if}
<!--p>i am not here</p> -->