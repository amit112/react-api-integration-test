/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Articles.css";
import { IArticlesState } from "../../models/states/articles-state";
import api from "../../services/api";
import { ApiUrls } from "../../constants/api-urls";
import { IArticleListReponse } from "./../../models/dtos/article-list-response";
import { IArticle } from "./../../models/data-models/article";
import moment from "moment";

class Articles extends React.Component {
  state: IArticlesState = {
    articlesData: {
      data: [],
      page: 0,
      pages: 0,
    },
    pageNo: 1,
    showDetailsPopUp: false,
    showAddEditPopUp: false,
    isDataLoaded: false
  };

  componentDidMount = () => {
    this.getArticles();
  };

  showDetails = (articleId: number): void => {
    this.setState({ showDetailsPopUp: !this.state.showDetailsPopUp }, () => {
      this.getArticleDetails(articleId);
    });
  };

  getArticles = async () => {
    this.setState({isDataLoaded: false})
    const articlesData: IArticleListReponse = await api.get(
      `${ApiUrls.NEWS}?page=${this.state.pageNo}`
    );
    if (articlesData.data.length > 0) {
      articlesData.data = articlesData.data.map((item: IArticle) => {
        item.author_registration_date = moment(
          item.author_registration_date
        ).format("MMM Do YYYY, h:mm a");
        item.creation_date = moment(item.creation_date).format(
          "MMM Do YYYY, h:mm a"
        );

        return item;
      });
    }

    this.setState({ articlesData , isDataLoaded: true});
  };

  getArticleDetails = async (articleId: number) => {
    try {
      const response: any = await api.get(`${ApiUrls.NEWS}/${articleId}/`);
      if (response.message === "Network Error") {
        alert("You are not authorize to view details");
        return;
      }
    } catch (error) {
      alert(error);
    }
  };

  deleteArticle = async (articleId: number) => {
    try {
      const response: any = await api.delete(`${ApiUrls.NEWS}/${articleId}/`);
      if (response.message === "Network Error") {
        alert("You are not authorize to delete this article");
        return;
      } else {
        alert(response);
      }
    } catch (error) {
     
      alert(error);
    }
  };

  handleClickPreviousPage = () => {
    let pageNo = this.state.pageNo;
    pageNo--;
    this.setState({ pageNo }, () => {
      this.getArticles();
    });
  };

  handleClickNextPage = () => {
    let pageNo = this.state.pageNo;
    pageNo++;
    this.setState({ pageNo }, () => {
      this.getArticles();
    });
  };

  render() {
   
    const {
      articlesData: { data },
      pageNo,
      isDataLoaded
    } = this.state;
    return (
      <div className="container">
        <h4 className="h4 text-center mt-2">Articles</h4>

        <nav aria-label="" className="mt-2">
          <ul className="pagination justify-content-start">
            <li className={`page-item ${pageNo === 1 ? `disabled` : ""}`}>
              <span
                onClick={this.handleClickPreviousPage}
                className="page-link"
              >
                Previous
              </span>
            </li>
            <li className="page-item">
              <span onClick={this.handleClickNextPage} className="page-link">
                Next
              </span>
            </li>
          </ul>
        </nav>

        <div className="row mt-2">
          {data.length >0 && data.map((row: IArticle) => {
            return (
              <div className="col-sm-4">
                <div className="card mb-2">
                  <img src={row.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{row.title}</h5>{" "}
                    <div className="text-muted font-weight-light">
                      <div className="d-inline-flex">
                        <img
                          src={row.author_photo}
                          className={"avatar mr-2"}
                          alt="..."
                        />
                        <div className="small">
                          {row.author_name} <br></br>
                          {row.author_email} <br></br>
                          <b>Registered on:</b> {row.author_registration_date}
                        </div>
                      </div>
                    </div>
                    <p className="card-text">{row.content}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        <b>Created on:</b> {row.creation_date}
                      </small>
                      <div className="float-right d-inline-flex">
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="View details"
                          onClick={() => this.showDetails(row.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Click here to edit data"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className=" ml-2 bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </a>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Click here to delete data"
                          onClick={() => this.deleteArticle(row.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="ml-2 bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </a>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
             {
isDataLoaded && data?.length ===0 &&

                <h6 className="h6"> No data Found!. Please click on next or previous to load data</h6>
              }
        </div>
      </div>
    );
  }
}

export default Articles;
