import { INews } from "../data-models/news";

export interface IUserDetailsReponse {
    id: number;
    name: string;
    email: string;
    photo: string;
    registration_date: string;
    news: INews[];
}