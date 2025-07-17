<!-- 
  project:PubMed Search(App.svelte)
  children components:
    input.svelte (input search keyword)
    searchBtn.svelte (btn onclick:{get inputvalue, fetch search})
    searchResult.svelte (display returned found items)
    ArticleCheckBox.svelte(to select individual article)
    selectAllBtn.svelte (btn onclick:{select all returned search results, pmcID/doi})
    CollectSelectedArticle.svelte(collect selected article ids)
   
    downloadBtn.svelte (action to download all selected articles)
    listDoiBtn.svelte (action to list all selected doi)
  $prop : usually used in child waiting for parent input
  bind: can bind to component props using the same syntax as for elements
  bind:property = {variable} 
  usually used in parent to bound child prop, notify child of value change
    like in Input.svelte use child input element 
    <input bind:childprop(like value) = {expression} />
    parent: {expression} like {'go'}, 'go' is set to child Input prop:value)
 
  B = {expression}; B gets set only once at the init stage, it won't be updated
  if expression value changes later
  B = $derived({expression}): svelte compiler makes expression a dependency of derived state;
  when the state changes, the derived will be marked as dirty and recalculated when
  it is next read (we always get updated B when expression value changes)
  -->
<script lang="ts">
  import Input from "./lib/Input.svelte";
  
</script>

<main>
  <h1>PubMed Search</h1>
  <div>
    <Input />
 </div> 
 

</main>

<style>

</style>
