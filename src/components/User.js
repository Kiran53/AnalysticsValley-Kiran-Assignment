import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { user } from "../slices/auth";
import "../static/style.css"
function User() {
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(user())

    }, [])

    const userDetails = useSelector(state => state.auth.user)
    // console.log(userDetails)
    return (
        <div>
            {userDetails === undefined || userDetails === null?
                <center><h1>Not Logged In</h1></center>
                :
                <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white"
                                            style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                            <h5>{userDetails.username}</h5>
                                            <p>Web Developer</p>
                                            <i className="far fa-edit mb-5"></i>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">{userDetails.email}</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Date Joined</h6>
                                                        <p className="text-muted">{userDetails.date_joined}</p>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }



        </div>
    )
}

export default User
