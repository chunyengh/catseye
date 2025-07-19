<!-- svelte-ignore state_referenced_locally -->
<!-- display search result; 20 items per page -->
<script lang='ts'>
    import ArticleCheckBox from "./ArticleCheckBox.svelte";
    //pubmed gives authorname like: {'LastName':'Szabo','Initials':'NJ'}
    import type { 
        TestInfoObj, AuthorObj, ArticleIdObj
    } from "./SearchType";
      
    let { searchResult } = $props();
    let searchquery = searchResult.searchquery;
    let loops = searchResult.loops;//number of loops to retrieve all counts
    let loopIndex = searchResult.loopIndex;
    let counts = searchResult.counts;
    let articleList = searchResult.articleList;
    let articleListLength = articleList.length;
   
    let testInfoObjArray:TestInfoObj[] = [];
    
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

</script>
<p>articleListLength:{articleListLength}</p>
<ArticleCheckBox 
    loops={loops} 
    loopIndex={loopIndex} 
    counts={counts} 
    searchquery={searchquery}
    testInfoObjArray={testInfoObjArray} 
/>
