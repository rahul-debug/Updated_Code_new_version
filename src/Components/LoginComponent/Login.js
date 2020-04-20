import React from 'react';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class Login extends React.Component {


    closeLoginErrorModal = () => {
        let modal = document.getElementById("loginErrorModal");
        modal.style.display = "none";
    }
    navigatetoRegistration = () => {
        this.props.history.push('/registration');
    }
    handleLogin = () => {
        var guidNo = this.guidNo.value;
        sessionStorage.setItem("guidNo", guidNo);
        if (guidNo !== "" && guidNo !== undefined) {
            AuthService.login(guidNo).then(resp => {
                if (resp.data.status === SUCCESS_CODE) {
                    this.props.history.push({
                        pathname: "/operations",
                        state: { "isAdmin": resp.data.message, "username": resp.data.user_name }
                    });
                    sessionStorage.setItem("accessToken", resp.data.token);
                } 
              
                else {
                    let modal = document.getElementById("loginErrorModal");
                    modal.style.display = "block";
                }
            })
        } else {
            let modal = document.getElementById("loginErrorModal");
            modal.style.display = "block";
        }
    }
    render() {
        return (
            <>

                <div class="login-page row no-gutters">
                    <div class="left-side">
                        <div class="bg-block text-center center-block">
                            <div class="notice-text">
                                <h2>Application Login Page</h2>
                                <p>Login from here to access.</p>
                            </div>
                        </div>
                    </div>

                    <div className="right-side d-flex justify-content-center align-items-center">
                        <div class="login-wrapper">
                            <div class="login" id="login">
                                <div class="login-logo">
                                    <span class="a-pwc-logo-grid a-lg"></span>
                                </div>
                                <div class="application-name">Data Room Sweeper Tool</div>
                                <div class="application-text">Hello. Great to see you again!</div>
                                <div class="user-fields">
                                    <div class="a-d-flex a-flex-column a-textarea-box">
                                        <div class="a-form-label">PWC GUID</div>
                                        <input type="text" className="a-text-input a-input-secondary" placeholder="GUID Number" ref={(c) => this.guidNo = c} />
                                        <div class="text-right a-textarea-footer">
                                            <button className="a-btn a-btn-primary a-btn-xl login-btn" type="submit" onClick={this.handleLogin}>Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div id="loginErrorModal" className="modal">
                        <div className="modal-content">
                            <h4 className="error">ERROR</h4>
                            <p>Please enter valid GUID Number</p>
                            <p style={{ color: "red" }}> New user....<a onClick={this.navigatetoRegistration}>Click here to register</a></p>
                            <div className="d-flex justify-content-center gutter-wrapper">
                                <input className="a-btn a-btn-primary a-btn-xl login-btn" type="button" value="OK" onClick={this.closeLoginErrorModal} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}