import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { login,user } from "../../slices/auth";
import { clearError } from '../../slices/error';
import "../../static/loginStyle.css"

function Login() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const error = useSelector(state => state.error.error)
    useEffect(() => {
        // console.log(error)
        alert(error, 'danger')
    }, [error])

    const [passError,setPassError]=useState('');
    const [password,setPassword]=useState('');
    //state variables

    const nav = useNavigate();
    const dispatch = useDispatch()
    const handleChange = (event) => {
      event.preventDefault();
      const {value}=event.target
      let cnt=0;
      // console.log(value)
      for(let i=0;i<value.length;i++){
        if(value.charCodeAt(i)<58 && value.charCodeAt(i)>47)
          cnt++;
      }
      // console.log(cnt)
      if(value.length<=8 || cnt<=3){
       
        setPassError('Password length more than 8 & more than 3 numbers required')
      }
      else{
        setPassError('');
      }
      setPassword(value)
    }
    let LoginSubmit = async (e) => {
        e.preventDefault()


        const LoginDetails = {
            username: document.getElementById("username").value,
            password: document.getElementById("pass").value
        }
        if (LoginDetails.username.length < 1 || LoginDetails.password.length < 1) {
            // console.log("fill")
            alert('Fill all details', 'danger')
            return;
        }

        dispatch(login(LoginDetails))

    }
    let alert = (message, type) => {
        // console.log(message)
        if (typeof message === 'undefined' || message.length === 0) return;

        // console.log("hhihihi")
       
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible fade show" role="alert">`,
            `${message}`,
            `<button type="button" id="close" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
          `</div>`
        ].join('')

        alertPlaceholder.append(wrapper)
        setTimeout(() => {
            document.getElementById("close").click();
            if (message.dis) dispatch(clearError())
        }, 1500)

    }
   
    useEffect(() => {
        if (isLoggedIn === true){
            dispatch(user()).then(()=>nav('/user'))   
        }
    }, [isLoggedIn])
    return (
        <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <form>
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="username" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">User Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" onChange={(e) => handleChange(e)} className="form-control" id="pass" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                    {passError.length > 0 && <span style={{color:"red"}}>{passError}</span>}
                  </div>
    
                 
                  <div className="d-grid">
                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={LoginSubmit}>Sign
                      in</button>
                  </div>
                  
                  <div id="liveAlertPlaceholder" style={{padding:"20px"}}></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    )
}

export default Login
