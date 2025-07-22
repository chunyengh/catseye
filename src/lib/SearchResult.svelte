<!-- svelte-ignore state_referenced_locally -->
<!-- display search result; 20 items per page -->
<script lang='ts'>
    //pubmed gives authorname like: {'LastName':'Szabo','Initials':'NJ'}
    import type { 
        TestInfoObj, AuthorObj, ArticleIdObj, ArticleIndexTestInfoObj
    } from "./SearchType";
      
    import { get } from "svelte/store";
    import {counts, searchquery, arrayOfArticleIndexTestInfoObj } from './SearchStore';

    let { searchResult } = $props();
    
    let thissearchquery = searchResult.searchquery;
    let thiscounts = searchResult.counts;
    counts.set(thiscounts);
    searchquery.set(thissearchquery);

    let articleList = searchResult.articleList;
    let articleListLength = articleList.length;
    let thisArrayOfArticleIndexTestInfoObj:ArticleIndexTestInfoObj[] = [];
    //[{articleIndex, TestInfoObj}]
    let testInfoObjArray:TestInfoObj[] = [];
    for (let i = 0; i < articleList.length; i++){
        let articleIndex = `${i + get(arrayOfArticleIndexTestInfoObj).length}`;
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
        let articleIndexTestInfoObj:ArticleIndexTestInfoObj = {
            articleIndex : articleIndex,
            testInfoObj : testInfoObj,
        }

        testInfoObjArray.push(testInfoObj);
        thisArrayOfArticleIndexTestInfoObj.push(articleIndexTestInfoObj);
    }

    let oldArrayOfArticleIndexTestInfoObj = get(arrayOfArticleIndexTestInfoObj);
    let newArray = oldArrayOfArticleIndexTestInfoObj.concat(thisArrayOfArticleIndexTestInfoObj);
    let newSet = new Set(newArray);
    arrayOfArticleIndexTestInfoObj.set([...newSet]);
   
</script>



