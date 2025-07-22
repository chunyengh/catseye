
    import { writable } from 'svelte/store';
    import type { ArticleIndexTestInfoObj, ArticleIndexSelectedTestInfoObj,
        TestInfoObj } from './SearchType';

    export const counts = writable('0');
    export const searchquery = writable('');
    export const selectedTestInfoObjArray = writable(
        [] as TestInfoObj[]
    );
    export const currentArticleIndex = writable('0');
    export const arrayOfArticleIndexTestInfoObj = writable(
        [] as ArticleIndexTestInfoObj[]
    );
   
    export const arrayOfArticleIndexSelectedTestInfoObj = writable(
        [] as ArticleIndexSelectedTestInfoObj[]
    );
    //[{articleIndex, selectedTestInfoObj}]