    //pubmed gives authorname like: {'LastName':'Szabo','Initials':'NJ'}
  export interface StrObj {
        [key:string]: string
    }
   export interface AuthorObj {
        LastName:string,
        Initials:string,
    }
    export interface ArticleIdObj {
        type:string,
        id:string,
    }

    export interface TestInfoObj {
        articleTitle:string,
        authorObjArray:AuthorObj[],
        journalInfo:string,
        articleIdObjArray:ArticleIdObj[],
        articleAbstract:string,
    }

    export interface ArticleIndexTestInfoObj {
        articleIndex:string,
        testInfoObj:TestInfoObj,
    }

    export interface ArticleIndexSelectedTestInfoObj {
        articleIndex:string,
        selectedTestInfoObj:TestInfoObj,
    }

     export interface AISelectedInfoObjArray {
        articleIndex:string,
        selectedTestInfoObjArray:TestInfoObj[],
    }
    export interface MyToast {
        message:string,
        id:string,
        type:string,
        dismissible:boolean,
        timeout:number,
    }

    export interface ArticleDic {
        articleIdList:ArticleIdObj[],
        journalIssueTitle:string,
        journalIssueVolume:string,
        journalIssuePubDateYear:string,
        title:string,
        abstract:string,
        authorList:AuthorObj[],
    }
    export interface TypeSearchResult {
        searchquery:string;
       // loops:string;//number of loops to retrieve all counts
       // articleIndex:string;
        counts:string;
        articleList:ArticleDic[];
    }
    