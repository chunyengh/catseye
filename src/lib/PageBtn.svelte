<script lang='ts'>
   // import ItemIdInput from "./ItemIDInput.svelte";
    import SearchResult from "./SearchResult.svelte";
    
    let { goPrePage, goNxtPage } = $props();
    let btnValue:string = $state(''); 
   
    function goPrePage(currentLoopIndex:string, loops:string){
        if (parseInt(currentLoopIndex) > 0){
            
        }
    }

    async function sendSearchQuery(searchQuery:string){
        let url= 'http://127.0.0.1:5000/search'
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body:'test'
                body: JSON.stringify({'s':searchQuery})
            }); 

            // focus on successful response; 
            // i.e response OK (200-299) 

            if (!response.ok){
                throw new Error(`${response.status} ${response.statusText}`);
            }
            //continue on processing successful response
            responseObj = await response.json();
   
        } catch (e){
        // response besides not ok, can also network errors 
        // (these are not listed in known status codes; ie < 599) 
        // use catch to catch errors     
            console.error(e);
        }
    }
    
</script>

<button 
    aria-label='search button'
    onclick={()=>{
        btnValue = searchValue;
        convertSearchValue();
        sendSearchQuery(search_query)
    }}
>搜尋</button>
<!-- <p>searchstring:{search_query}</p> -->
{#if responseObj}
  <SearchResult searchResult = {responseObj} />
{/if}


<style>
    button {
        background-color: 'red' ;
    }

</style>


 