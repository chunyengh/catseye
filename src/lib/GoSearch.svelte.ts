import { get } from "svelte/store";
import { counts, searchquery, arrayOfArticleIndexTestInfoObj } from './SearchStore';
import type { 
     TestInfoObj, AuthorObj, ArticleIdObj, ArticleIndexTestInfoObj, TypeSearchResult
} from "./SearchType";

export function storeSearchResult(searchResult:TypeSearchResult) {
  //pubmed gives authorname like: {'LastName':'Szabo','Initials':'NJ'}
  let thissearchquery = searchResult.searchquery;
  let thiscounts = searchResult.counts;
  let oldarrayOfArticleIndexTestInfoObj = get(arrayOfArticleIndexTestInfoObj);
  counts.set(thiscounts);
  searchquery.set(thissearchquery);

  let articleList = searchResult.articleList;
  let thisArrayOfArticleIndexTestInfoObj:ArticleIndexTestInfoObj[] = [];
  //[{articleIndex, TestInfoObj}]

  let articleIndexTestInfoObj = $state({} as ArticleIndexTestInfoObj);
 
  for (let i = 0; i < articleList.length; i++){
    let articleIndex = `${oldarrayOfArticleIndexTestInfoObj.length}`;
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
    
    articleIndexTestInfoObj = {
        articleIndex: articleIndex,
        testInfoObj: testInfoObj,
    }
    thisArrayOfArticleIndexTestInfoObj.push(articleIndexTestInfoObj);
    articleIndex = `${parseInt(articleIndex) + 1}`;
 
  }
  
  let newArray = oldarrayOfArticleIndexTestInfoObj.concat(thisArrayOfArticleIndexTestInfoObj);
  let newSet = new Set(newArray);

  arrayOfArticleIndexTestInfoObj.set([...newSet]);
}

    export async function goSearch(articleIndex:string, searchQuery:string) {
        let url= 'http://127.0.0.1:5000/search'
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                       'startArticleIndex':articleIndex,
                       'sq':searchQuery
                       
                    }),
                }); 
                if (!response.ok){
                    throw new Error(`${response.status} ${response.statusText}`);
                }       
                let responseObj = await response.json();        
                return responseObj;
            } catch (e){ 
                console.error(e);
            }
    }


  