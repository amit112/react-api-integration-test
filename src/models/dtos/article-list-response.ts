import { IArticle } from "../data-models/article";
import { IPagination } from "../data-models/pagination";

export interface IArticleListReponse extends IPagination {
    data: IArticle[];
}