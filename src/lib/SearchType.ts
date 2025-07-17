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
