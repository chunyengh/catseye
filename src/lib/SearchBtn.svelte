<script lang='ts'>
    import { myIndexStore } from './IndexStore.ts';
    import SearchResult from './SearchResult.svelte';
    import { mySearchStore } from './SearchStore.ts';

    let { searchValue } = $props();
    let btnValue:string = $state(''); 
    let search_query:string = $state('');
    let re = $state();
    let responseObj = $state();

    $inspect(responseObj);
 
    function convertSearchValue(){
        let btnValuewospacebe = btnValue.trim();
        let btnvaluearray = btnValuewospacebe.split(' ');
        search_query = btnvaluearray.join('+');
    }
  
</script>

<button 
    aria-label='search button'
    onclick={()=>{
        btnValue = searchValue;
        convertSearchValue();
        $myIndexStore.loopIndex = '0';
        $myIndexStore.searchQuery = search_query;
        re=$mySearchStore.goSearch();
    }}
>搜尋</button>

{#if re}
<SearchResult searchResult={re} />
{/if}



 