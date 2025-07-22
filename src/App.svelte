<!-- 
  project:PubMed Search(App.svelte)
 
  B = {expression}; B gets set only once at the init stage, it won't be updated
  if expression value changes later
  B = $derived({expression}): svelte compiler makes expression a dependency of derived state;
  when the state changes, the derived will be marked as dirty and recalculated when
  it is next read (we always get updated B when expression value changes)
  -->
<script lang="ts">
    import Toasts from "./lib/Toasts.svelte";
    import SearchBtn from "./lib/SearchBtn.svelte";
    import DownLoadBtn from "./lib/DownLoadBtn.svelte";

      let searchValue:string = $state('');

</script>

<main>
  <Toasts />
  <h1>PubMed Search</h1>
  <div>
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
   
    <SearchBtn {searchValue}/>
  <DownLoadBtn /> 
  </div>
 

</main>

<style>

</style>
