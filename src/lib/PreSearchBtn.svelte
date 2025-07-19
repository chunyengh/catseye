<script lang='ts'> 
    import { goSearch } from "./GoSearch";
    import SearchResult from './SearchResult.svelte';
  //  import { mySearchStore } from './SearchStore.ts';
 
    let { currentLoopIndex, searchquery } = $props();
  //  let btnValue:string = $state(''); 
  //  let search_query:string = $state('');
  //  let re = $state();
    let hasPrevious = $state(false);
    let responseObj = $state();
  //  $inspect(search_query);
    $inspect(responseObj);
    

    async function goPreviousPage(currentLoopIndex:string, searchquery:string){
        //currentLoopIndex min=0; max=loops 
        if (parseInt(currentLoopIndex) > 0) {
            hasPrevious = true;
            let preLoopIndex:number = parseInt(currentLoopIndex) -1 ;
            responseObj = await goSearch(`${preLoopIndex}`, searchquery);
        } 
     }

     function hasPreviousPage(){
        return !(parseInt(currentLoopIndex) > 0);
     }
        
</script>


<button 
    aria-label='go previous page'
    disabled = {hasPreviousPage()}
    onclick={ async () => {
        await goPreviousPage(currentLoopIndex, searchquery);
    }}
>上一頁</button> 



{#if responseObj}
  <SearchResult searchResult = {responseObj} /> 
{/if}
