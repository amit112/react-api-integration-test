
import React from "react"
import { Modal } from "react-bootstrap";
import { INews } from "../../models/data-models/news";
import { IUserDetailsProps } from "../../models/props/UserDetailsProps";
import "./Users.css";
 
const UserDetails = ({userDetail,showDetailsPopUp, handleClose}: IUserDetailsProps) => {
    return (
        <>
          {userDetail.name && (
          <Modal
            show={showDetailsPopUp}
            
            aria-labelledby="contained-modal-title-vcenter"
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title> User Details </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card mb-2 ">
                <div>
                  <div className="d-inline-flex">
                    <img
                      src={userDetail.photo}
                      height="200px"
                      className="card-img-top w-50"
                      alt="..."
                    />

                    <div className="card-body">
                      <h5 className="card-title">{userDetail.name}</h5>{" "}
                      <div className="text-muted font-weight-light">
                        {userDetail.email} <br></br>
                        <b>Registered on:</b> {userDetail.registration_date}
                      </div>
                    </div>
                  </div>
                </div>
                {userDetail.news?.length > 0 && (
                  <>
                    <hr></hr>
                    <h6 className="h6 pt-2 pb-2 text-center">Articles</h6>

                    <div className="row mt-2">
                      {userDetail.news.map((row: INews) => {
                        return (
                          <div className="col-sm-4 ml-1 mt-2">
                            <div className="card">
                                <div className="ml-2">
                              <img
                                src={row.image}
                                className="card-img-top"
                                alt="..."
                              />
                              <div className="card-body">
                                <h5 className="card-title">{row.title}</h5>{" "}
                              </div>
                              <p className="card-text">{row.content}</p>
                              <p className="card-text">
                                <small className="text-muted">
                                  {row.creation_date}
                                </small>
                              </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        )}
        </>
      );
}
 
export default UserDetails;