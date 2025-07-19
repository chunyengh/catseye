
<script lang='ts'>
    //import { goSearch } from "./GoSearch";
    import type { ArticleIdObj, AuthorObj } from "./SearchType";
    import PreSearchBtn from "./PreSearchBtn.svelte";
    import NxtSearchBtn from "./NxtSearchBtn.svelte";

    let { loops, loopIndex, counts, searchquery, testInfoObjArray } = $props();
   
    let totalSelectedArticleIdObjArray:ArticleIdObj[][] = $state([]);
   // let reobj = $state();
   // $inspect(reobj)
    
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
    
    //async function thisgosearch(){
    //    reobj = await goSearch('0', 'caffe');

    //}
    
    $inspect(totalSelectedArticleIdObjArray);
</script>

<foundCount> 搜尋找到 {counts} 筆資料</foundCount> 

<article>
    {#each testInfoObjArray as testInfoObjElement}
        <ul>
            <article>
                <section>
                   {#each Object.entries(testInfoObjElement) as [key, value]}
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
                        name = 'checkedArticleIdArray'
                        value = {testInfoObjElement.articleIdObjArray}
                        bind:group = {totalSelectedArticleIdObjArray}
                    />                  
                </label>
            </article>
        </ul>
    {/each}
</article>
<pageOption>
    <prePage>
        <PreSearchBtn currentLoopIndex={loopIndex} searchquery={searchquery}
        />
    </prePage> 
    <pageIndex>第 {`${parseInt(loopIndex)+1}`}/{`${parseInt(loops)+1}`} 頁</pageIndex>
    <nxtPage>
        <NxtSearchBtn currentLoopIndex={loopIndex} loops = {loops} searchquery={searchquery}
        />
    </nxtPage>
</pageOption>
<style>
    div {
        color:rgb(83, 206, 237);
        font-size: 1em;
    }
</style>

 <p>number of selected article:{totalSelectedArticleIdObjArray.length}</p>


