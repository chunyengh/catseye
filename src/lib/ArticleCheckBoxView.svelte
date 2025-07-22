
<!-- svelte-ignore state_referenced_locally -->
<script lang='ts'>
    import type { ArticleIdObj, AuthorObj, 
        ArticleIndexTestInfoObj, TestInfoObj, TypeSearchResult, ArticleIndexSelectedTestInfoObj,
        AISelectedInfoObjArray,
    } from "./SearchType";
    import { counts, currentArticleIndex,
        searchquery, arrayOfArticleIndexSelectedTestInfoObj, arrayOfArticleIndexTestInfoObj,
    } from './SearchStore.js';
    import { get } from "svelte/store";
    import { goSearch, storeSearchResult } from "./GoSearch.svelte.js";
    import { addToast } from "./store.js";

    let { index } = $props();
    let myIndex = $state(0);
    currentArticleIndex.set(`${index}`);
      
    let responseObj = $state();
    
    let thisSelectedTestInfoObjArray:TestInfoObj[] = $state([] as TestInfoObj[]);
    
    let testInfoObj:TestInfoObj = $state({} as TestInfoObj);
    testInfoObj = testInfoObjForCurrentArticleIndex(get(currentArticleIndex)) as TestInfoObj;
    
    //$inspect(testInfoObj);
   
    $inspect(thisSelectedTestInfoObjArray);
      
    function updateSelectedObjArray(newSelectedArray:AISelectedInfoObjArray){  
        //newSelectedArray:{articleIndex:'0', selectedTestInfoObjArray:TestInfoObj[]}  
        let thisarray:ArticleIndexSelectedTestInfoObj[] = [];
        let thisIndex = newSelectedArray['articleIndex'];
        let selectedObjArray = newSelectedArray['selectedTestInfoObjArray'];
        selectedObjArray.forEach((obj)=> {
            let ele:ArticleIndexSelectedTestInfoObj = {
                articleIndex:thisIndex,
                selectedTestInfoObj:obj,
            }
            thisarray.push(ele);
        });      
        let oa = get(arrayOfArticleIndexSelectedTestInfoObj);        
        oa.push(...thisarray);   
        arrayOfArticleIndexSelectedTestInfoObj.set(oa); 
    }

    function testInfoObjForCurrentArticleIndex(
        currentArticleIndex:string
    ):TestInfoObj{
        let thisArrayOfArticleIndexTestInfoObj:ArticleIndexTestInfoObj[] = 
            get(arrayOfArticleIndexTestInfoObj);
        
        let foundArticleIndexTestInfoObj = thisArrayOfArticleIndexTestInfoObj.find((value)=>
            value.articleIndex === currentArticleIndex
        )

        let undefinedTestInfoObj:TestInfoObj = {
            articleTitle:'aTitle',
            authorObjArray:[{'LastName':'lastname', 'Initials': 'initials'}],
            journalInfo:'journal(1)',
            articleIdObjArray:[{'type':'pubmed', 'id':'111'}],
            articleAbstract:'aAbstract',
        };

        let found = foundArticleIndexTestInfoObj?.testInfoObj;
        if (found === undefined){found = undefinedTestInfoObj};
        return found;
    }
  
    function namestr(authorObjArray:AuthorObj[]):string {
        let nameStrArray:string[]=[];
        authorObjArray.forEach((e:AuthorObj) => {
            let nstr = e.Initials + ' ' + e.LastName;
            nameStrArray.push(nstr);
        });
        return nameStrArray.join(', ');
    }

    function idstr(articleIdObjArray:ArticleIdObj[]):string {
        let idStrArray:string[] = [];
        articleIdObjArray.forEach((e:ArticleIdObj) => {
            let idstr = e.type + `:` + e.id;
            idStrArray.push(idstr);
        });
        return idStrArray.join(', ');
    }
    
    async function goNewPage(newArticleIndex:string, searchquery:string){
        let storeArticleLength = get(arrayOfArticleIndexTestInfoObj).length;
        if ((parseInt(newArticleIndex)) >= storeArticleLength){
            responseObj = await goSearch(newArticleIndex, searchquery);  
            storeSearchResult(responseObj as TypeSearchResult);
        }
        testInfoObj = testInfoObjForCurrentArticleIndex(newArticleIndex);       
    }
    
 
</script>



{#if parseInt(get(currentArticleIndex)) == index}

<p> 搜尋找到 {get(counts)} 筆資料</p>

<article>
        <ul>
            <article>
                <section>
                   {#each Object.entries(testInfoObj) as [key, value]}   
                        {#if key === 'authorObjArray'}
                            <div> {namestr(value as AuthorObj[])} </div>
                        {:else if key === 'articleIdObjArray'}
                            <div> {idstr(value as ArticleIdObj[])}</div>
                        {:else}
                            <div>{value}</div>
                        {/if}
                   {/each}
                </section>
                <label>
                    選取文章
                    <input 
                        type='checkbox'
                        id='selectArticle'
                        name = 'selectArticle'
                        value = {testInfoObj}
                        bind:group = {thisSelectedTestInfoObjArray}
                    />  
           
                </label>
            </article>
        </ul>
</article>

<pageOption>
    <preArticle>
        <button 
            aria-label='go previous page'
            disabled = {myIndex <= 0}
            onclick={()=>{
                let newArticleIndex = parseInt(get(currentArticleIndex)) -1;
                currentArticleIndex.set(`${newArticleIndex}`);   
                let thisArticleIndexSelectedTestInfoObjArray:AISelectedInfoObjArray = {
                    articleIndex:`${myIndex}`,
                selectedTestInfoObjArray: thisSelectedTestInfoObjArray,
                }
                updateSelectedObjArray(thisArticleIndexSelectedTestInfoObjArray);
                 goNewPage(`${newArticleIndex}`, get(searchquery));
                myIndex = newArticleIndex;
            }}
        >上一頁</button>
    </preArticle> 
    
    <articleIndex> {myIndex + 1}/{`${get(counts)}`} </articleIndex>
    <nxtArticle>
        <button 
            aria-label='go next page'
            disabled = {myIndex >= (parseInt(get(counts)) - 1)}
            onclick={ async () => {
                let newArticleIndex = parseInt(get(currentArticleIndex))+1;
                currentArticleIndex.set(`${newArticleIndex}`);
                let thisArticleIndexSelectedTestInfoObjArray:AISelectedInfoObjArray = {
                    articleIndex:`${myIndex}`,
                selectedTestInfoObjArray: thisSelectedTestInfoObjArray,
                }
                updateSelectedObjArray(thisArticleIndexSelectedTestInfoObjArray);
                goNewPage(`${newArticleIndex}`, get(searchquery));    
                myIndex = newArticleIndex;
            }}
        >下一頁</button> 
    </nxtArticle>
</pageOption>
{/if}

<style>
    div {
        color:rgb(83, 206, 237);
        font-size: 1em;
    }
</style>