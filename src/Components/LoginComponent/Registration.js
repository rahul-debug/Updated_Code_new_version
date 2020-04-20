import React from 'react';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamData: [],
            error: ""
        }
    }

    componentDidMount() {

        AuthService.getTeamDetailsView().then(data => {
            if (data.data.status === SUCCESS_CODE) {
                const teamList = data.data.data;
                    this.setState({ teamData: teamList });
            } else {
                let modal = document.getElementById("errorModalDuringRegistration");
                    modal.style.display = "block";
                    this.setState({ error: "Please try again later" })
            }
        });
    }
    selectTeam = (e) => {
        this.selectedTeam = e.target.value;
    }
    handleRegister = () => {
        let user_name = this.user_name.value;
        let guid = this.guid.value;
        let email = this.email.value;

        if (user_name && user_name !== "" && guid && guid !== "" && email && email !== "" && this.selectedTeam && this.selectedTeam !== "Select Team" && this.selectedTeam !== null && this.selectedTeam !== undefined) {
            
            AuthService.registration(user_name,guid,email,this.selectedTeam).then(data => {
                if (data.data.status === SUCCESS_CODE) {
                    this.props.history.push({
                        pathname: "/operations",
                        state: { "isAdmin": data.data.message, "username": data.data.user_name }
                    });
                    sessionStorage.setItem("accessToken", data.data.token);
                } else {
                    let modal = document.getElementById("errorModalDuringRegistration");
                    modal.style.display = "block";
                    this.setState({ error: data.data.message })
                }
            });

        } else {
            document.querySelector("#RegistrationErrorModal").style.display = "block";
        }
    }
    closeRegistrationErrorModal = () => {
        if (document.querySelector("#RegistrationErrorModal")) {
            document.querySelector("#RegistrationErrorModal").style.display = "none";
        }
        if (document.querySelector("#errorModalDuringRegistration")) {
            document.querySelector("#errorModalDuringRegistration").style.display = "none";
        }
    }
    render() {

        let arrayOfData = this.state.teamData;
        let optionsforTeamList = arrayOfData.map((data) =>
            <option>
                {data.team}
            </option>
        );
        return (
            <>
                <div class="login-page row no-gutters">
                    <div class="left-side">
                        <div class="bg-block text-center center-block">
                            <div class="notice-text">
                                <h5>The Data Room Sweeper Tool (DRST) is a PwC-internal solution that allows teams to identify relevant documents
                            (across a breadth of file extensions) based on keywords and phrases of interest.</h5>
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
                                    <div class="application-text">User Registration- Please provide your details below:</div>
                                    <div class="user-fields">
                                        <div class="a-d-flex a-flex-column a-textarea-box">
                                            <input className="a-text-input a-input-secondary" placeholder="Name*" type="text" ref={(c) => this.user_name = c} />
                                            <input className="a-text-input a-input-secondary" placeholder="GUID*" type="text" ref={(c) => this.guid = c} />
                                            <input className="a-text-input a-input-secondary" placeholder="Email*" type="text" ref={(c) => this.email = c} />
                                            <select className="a-text-input a-input-secondary" onChange={(e) => this.selectTeam(e)} id="sel2" name="sellist1">
                                                <option>Select Team*</option>
                                                {optionsforTeamList}
                                            </select>
                                            <div class="a-form-label"><b>Note:</b> Please do not choose the team to which you do not belong.If you are unable to see your team in the dropdown field, please reach out to the admin at <a style={{ "text-decoration": " underline", "color": "#9e9e9e", "cursor":"pointer" }}>data.room.sweeper@pwc.com</a>.</div>
                                           
                                            <div class="text-right a-textarea-footer">
                                            <input className="a-btn a-btn-primary a-btn-xl login-btn" type="button" value="Register" onClick={this.handleRegister} />
                                            </div>

                                            
                                        </div>

                                    </div>
                                </div>
                            </div>


                        

                    </div>
                </div>
                <div>

                </div>

                <div className="row container registerDiv">


                </div>

                <div id="RegistrationErrorModal" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>Please fill all the details.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeRegistrationErrorModal} />
                        </div>
                    </div>
                </div>
                <div id="errorModalDuringRegistration" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>{this.state.error}</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeRegistrationErrorModal} />
                        </div>
                    </div>
                </div>

            </>
        );
    }
}