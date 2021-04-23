import { IUser } from "../data-models/user";
import { IPagination } from "../data-models/pagination";

export interface IUserListReponse extends IPagination {
    data: IUser[];
}