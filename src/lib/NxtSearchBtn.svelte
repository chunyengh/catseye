<script lang='ts'> 
    import { goSearch } from "./GoSearch";
    import SearchResult from './SearchResult.svelte';
  //  import { mySearchStore } from './SearchStore.ts';
 
    let { currentLoopIndex, loops, searchquery } = $props();
  //  let btnValue:string = $state(''); 
  //  let search_query:string = $state('');
  //  let re = $state();
    let hasNxt = $state(false);
    let responseObj = $state();
  //  $inspect(search_query);
    $inspect(responseObj);
    

    async function goNxtPage(currentLoopIndex:string, loops:string, searchquery:string){
        //currentLoopIndex min=0; max=loops 
        if (parseInt(currentLoopIndex) < parseInt(loops)) {
            hasNxt = true;
            let nxtLoopIndex:number = parseInt(currentLoopIndex) + 1 ;
            responseObj = await goSearch(`${nxtLoopIndex}`, searchquery);
        } 
     }

     function hasNxtPage(){
        return !(parseInt(currentLoopIndex) < parseInt(loops));
     }
        
</script>


<button 
    aria-label='go next page'
    disabled = {hasNxtPage()}
    onclick={ async () => {
        await goNxtPage(currentLoopIndex, loops, searchquery);
    }}
>下一頁</button> 



{#if responseObj}
  <SearchResult searchResult = {responseObj} /> 
{/if}
