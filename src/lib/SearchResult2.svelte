<!-- svelte-ignore state_referenced_locally -->
<!-- display search result; 20 items per page -->
<script lang='ts'>
    //import ArticleCheckBox from "./ArticleCheckBox.svelte";
    //pubmed gives authorname like: {'LastName':'Szabo','Initials':'NJ'}
    import type { 
        TestInfoObj, AuthorObj, ArticleIdObj
    } from "./SearchType";
   
    let { searchResult} = $props();
    
    let loops = searchResult.loops;//number of loops to retrieve all counts
    let counts = searchResult.counts;
    let articleList = searchResult.articleList;
    
    let testInfoObjArray:TestInfoObj[] = [];
    let totalSelectedArticleIdObjArray:ArticleIdObj[][]=$state([]);
    for (let i = 0; i < articleList.length; i++){
        let article = articleList[i];
        let articleTitle:string = article.title;
        let authorObjArray:AuthorObj[] = article.authorList;
    //authorList is like:[{"LastName":"Lee", "Initials":"RJ"}] 
    //authorStrArray is like:['RJ Lee',..] 
     
        let articleIdObjArray:ArticleIdObj[] = article.articleIdList;
   //articleIdList is like:[{'type':'pubmed', 'id'='123'}]
   //articleIdStrArray is like:['pubmed:123',...]
     
        let journalIssueTitle = article.journalIssueTitle;
        let journalIssuePubDateYear = article.journalIssuePubDateYear;
        let journalInfo:string = journalIssueTitle + '(' + journalIssuePubDateYear + ')';
        let articleAbstract:string = article.abstract;
        let testInfoObj:TestInfoObj = {
            articleTitle:articleTitle,
            authorObjArray:authorObjArray,
            journalInfo:journalInfo,
            articleIdObjArray:articleIdObjArray,
            articleAbstract:articleAbstract,
        }
    
        testInfoObjArray.push(testInfoObj);
     
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

   // $inspect(testInfoObjArray);
   // $inspect(testInfoStrArray);

    //testInfoObjArray=[{title:t, id:{type:pubmed,id:123}}]
    //testInfoStryArray=[{title:t,id:{pubmed:123}}]
</script>

<!-- <p>search result:{searchResultStr}</p> -->

<p> 搜尋結果，總共發現 {counts} 筆資料</p> 
<p> 第幾頁，共 {loops} 頁</p> 

<article>
    {#each testInfoObjArray as testInfoObjElement}
        <ul>
            <article>
                <section>
                   {#each Object.entries(testInfoObjElement) as [key, value]}
                        {#if key === 'authorObjArray'}
                            <div> {namestr(value)} </div>
                        {:else if key === 'articleIdObjArray'}
                            <div> {idstr(value)}</div>
                        {:else}
                            <div>{value}</div>
                        {/if}
                   {/each}
                </section>
                <label>
                <!-- <ArticleCheckBox checkedArticleIdObjArray = {testInfoObjElement.articleIdObjArray}
                   totalSelectedArticleIdObjArray = {totalSelectedArticleIdObjArray} /> 
                -->
                    <input 
                        type='checkbox'
                        id='selectArticle'
                        name = 'checkedArticleIdArray'
                        value = {testInfoObjElement.articleIdObjArray}
                        bind:group = {totalSelectedArticleIdObjArray}
                    />                  
                </label>
     <p>number of selected article:{totalSelectedArticleIdObjArray.length}</p>
            </article>
        </ul>
    {/each}
</article>
<style>
    div {
        color:rgb(83, 206, 237);
        font-size: 1em;
    }
</style>