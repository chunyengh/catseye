<script lang='ts'>
    import KeywordInput from "./Input.svelte";
    let sharedValue:string = $state('');
    let {stringFromApp} = $props();
    let searchTermFromInput = $state();
    let searchTerm = {searchKey: "searchValue",};    
    let url = $state('pubmedURL');
    //let searchTerm:JSON= {} as JSON;
    const handleClick = () => {
        console.log(searchTerm);
       // console.log('inputTextValue=');
        searchTermFromInput = (JSON.stringify(searchTerm));
    }

   /* async function sendSearchTermToParent(searchTerm:JSON){
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchTerm)
            });
            if (!response.ok){
                throw new Error('Response status: ${response.status');
            }
            const responseObj:JSON = await response.json();
            console.log(responseObj);
        } catch (e){
            console.error(e)
        }
    */
</script>

<button onclick={handleClick}>
    搜尋
</button>

 <p>Message:{stringFromApp}</p>

<style>
    button {
        background-color: 'red' ;
    }

</style>
