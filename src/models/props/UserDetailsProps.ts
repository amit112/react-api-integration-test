import { IUserDetailsReponse } from "../dtos/user-details-response";

export interface IUserDetailsProps {
    userDetail: IUserDetailsReponse
    showDetailsPopUp: boolean,
    handleClose:Function
}