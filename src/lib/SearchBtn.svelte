<script lang='ts'>
    import SearchResult from './SearchResult.svelte';
    import ArticleCheckBoxView from "./ArticleCheckBoxView.svelte";
    import { searchquery, currentArticleIndex, arrayOfArticleIndexTestInfoObj, counts } from './SearchStore.js';
    import { get } from 'svelte/store';
    import { addToast } from './store.js';
    import { goSearch } from './GoSearch.svelte.js';
    
    let { searchValue } = $props();
    let thissearchquery:string = $state('');
   
    let responseObj = $state();
    let aIndex = $state();
  
    $inspect(responseObj);
    $inspect(aIndex);

    function convertSearchValue(searchValue:string){
        let btnValuewospacebe = searchValue.trim();
        let btnvaluearray = btnValuewospacebe.split(' ');
        thissearchquery = btnvaluearray.join('+');
    }
   
</script>

<button 
    aria-label='search button'
    onclick={()=>{      
        convertSearchValue(searchValue);
        searchquery.set(thissearchquery);
        let startArticleIndex = '0';
        aIndex = startArticleIndex;
        currentArticleIndex.set(startArticleIndex);
        arrayOfArticleIndexTestInfoObj.set([]);
        counts.set('0');
        addToast({'message':`start search:${searchValue}`});
        goSearch(startArticleIndex,thissearchquery).then(((value)=> responseObj=value))
    }}
>搜尋</button> 

{#if responseObj}
    <SearchResult searchResult = {responseObj} />   
    
{#each { length: get(arrayOfArticleIndexTestInfoObj).length -1 }, index}
     <ArticleCheckBoxView index={index} />
{/each}

{/if}
 