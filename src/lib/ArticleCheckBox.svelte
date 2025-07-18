
<script lang='ts'>
    import type { ArticleIdObj, AuthorObj } from "./SearchType";

    let { loopIndex, counts, testInfoObjArray } = $props();
    let totalSelectedArticleIdObjArray:ArticleIdObj[][] = $state([]);

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
        <button>上一頁</button>
    </prePage>
    <pageIndex>  第 {loopIndex + 1} 頁</pageIndex>
    <nxtPage>
        <button>下一頁</button>
    </nxtPage>
</pageOption>
<style>
    div {
        color:rgb(83, 206, 237);
        font-size: 1em;
    }
</style>

 <p>number of selected article:{totalSelectedArticleIdObjArray.length}</p>


