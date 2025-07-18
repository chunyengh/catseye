<script lang='ts'>
    import SearchBtn from "./SearchBtn.svelte";
    let searchValue = $state('');
</script>

<label for = 'searchInput'>
    搜尋關鍵字輸入
</label>

<input 
    type='text'
    id='searchInput'
    bind:value={searchValue}
    placeholder='Enter Search Keyword'
    minlength='1'
    maxlength='45'
    size='50'
 />

<!-- <p>input component says searchText : {searchValue}</p> -->
<!-- SearchBtn bind:searchValue 
 no need to use bind, (searchText follows the rule of data flowing from top to bottom in a component)
 further, and do not want (searchValue from SearchBtn flows back to this component) to update searchText if(in case) searchValue changes -->
<SearchBtn {searchValue} /> 
<!--p>in input component searchValue:{searchValue}</p> -->