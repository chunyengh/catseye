<script lang='ts'>
    import SearchResult from "./SearchResult.svelte";
    let responseObj = $state();
    $inspect(responseObj);
   
    export const myIndexState = $state({
        loopIndex: '0',
        searchQuery: 'sq',
    });

    export const myQueryStore = $state({
        goSearch: async() => {
            let url= 'http://127.0.0.1:5000/search'
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'loopIndex':myIndexState.loopIndex, 
                        'sq': myIndexState.searchQuery,
                    }),
                }); 

                // focus on successful response;  i.e response OK (200-299) 
                if (!response.ok){
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                //continue on processing successful response
                responseObj = await response.json(); 
            } catch (e){
        // response besides not ok, can also be network errors, use catch to catch errors     
                console.error(e);
            }
        }
    });
    
</script>

{#if responseObj}
  <SearchResult searchResult = {responseObj} />
{/if}



 