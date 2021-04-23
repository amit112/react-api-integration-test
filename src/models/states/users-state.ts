import { IUserListReponse } from "../dtos/user-list-response";
import { IUserDetailsReponse } from "../dtos/user-details-response";

export interface IUsersState {
  usersData: IUserListReponse;
  userDetail: IUserDetailsReponse;
  pageNo: number;
  showDetailsPopUp: boolean;
  showAddEditPopUp: boolean;
  isDataLoaded:boolean; 
}