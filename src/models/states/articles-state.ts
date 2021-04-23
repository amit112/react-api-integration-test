import { IArticleListReponse } from "../dtos/article-list-response";

export interface IArticlesState {
  articlesData: IArticleListReponse;
  pageNo: number;
  showDetailsPopUp: boolean;
  showAddEditPopUp: boolean;
  isDataLoaded:boolean; 
}