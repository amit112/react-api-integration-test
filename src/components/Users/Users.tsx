/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Users.css";
import api from "../../services/api";
import { ApiUrls } from "../../constants/api-urls";
import moment from "moment";
import { IUsersState } from "../../models/states/users-state";
import { IUser } from "./../../models/data-models/user";
import { IUserListReponse } from "./../../models/dtos/user-list-response";
import { IUserDetailsReponse } from "./../../models/dtos/user-details-response";
import UserDetails from "./User.Details";
import { INews } from "./../../models/data-models/news";

class Users extends React.Component {
  state: IUsersState = {
    usersData: {
      data: [],
      page: 0,
      pages: 0,
    },
    userDetail: {
      id: 0,
      name: "",
      email: "",
      photo: "",
      registration_date: "",
      news: [],
    },
    pageNo: 1,
    showDetailsPopUp: false,
    showAddEditPopUp: false,
    isDataLoaded: false
  };

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = async () => {
    this.setState({isDataLoaded: false})
    const usersData: IUserListReponse = await api.get(
      `${ApiUrls.USERS}?page=${this.state.pageNo}`
    );
    if (usersData.data.length > 0) {
      usersData.data = usersData.data.map((item: IUser) => {
        item.registration_date = moment(item.registration_date).format(
          "MMM Do YYYY, h:mm a"
        );
        return item;
      });
    }

    this.setState({ usersData ,isDataLoaded: true });
  };

  getUserDetails = async (userId: number) => {
    try {
      const userDetail: IUserDetailsReponse = await api.get(
        `${ApiUrls.USERS}/${userId}/`
      );
      if (userDetail.name) {
        userDetail.registration_date = moment(
          userDetail.registration_date
        ).format("MMM Do YYYY, h:mm a");
        if (userDetail.news.length > 0) {
          userDetail.news = userDetail.news.map((item: INews) => {
            item.creation_date = moment(item.creation_date).format(
              "MMM Do YYYY, h:mm a"
            );
            return item;
          });
        }
        this.setState({ userDetail, showDetailsPopUp: true });
      } else {
        this.setState({ userDetail: {} });
      }
    } catch (error) {
     
      alert(error);
    }
  };

  handleClickPreviousPage = () => {
    let pageNo = this.state.pageNo;
    pageNo--;
    this.setState({ pageNo }, () => {
      this.getUsers();
    });
  };

  handleClickNextPage = () => {
    let pageNo = this.state.pageNo;
    pageNo++;
    this.setState({ pageNo }, () => {
      this.getUsers();
    });
  };
  handleClose = () => {
    this.setState({
      showDetailsPopUp: !this.state.showDetailsPopUp,
      userDetail: {},
    });
  };

  render() {
   
    const {
      usersData: { data },
      pageNo,
      showDetailsPopUp,
      userDetail,
      isDataLoaded
    } = this.state;
    return (
      <>
        {userDetail.name && showDetailsPopUp && (
          <UserDetails
            userDetail={userDetail}
            showDetailsPopUp={showDetailsPopUp}
            handleClose={this.handleClose}
          />
        )}

       {   <div className="container">
          <h4 className="h4 text-center mt-2">Users</h4>

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
            {data?.length > 0 &&
              data.map((row: IUser) => {
                return (
                  <div className="col-sm-4">
                    <div className="card mb-2">
                      <img
                        src={row.photo}
                        height="300px"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{row.name}</h5>{" "}
                        <div className="text-muted font-weight-light">
                          {row.email} <br></br>
                          <b>Registered on:</b> {row.registration_date}
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="float-right d-inline-flex">
                          <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="View details"
                            onClick={() => this.getUserDetails(row.id)}
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
                        </div>
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
  }
      </>
    );
  }
}

export default Users;
