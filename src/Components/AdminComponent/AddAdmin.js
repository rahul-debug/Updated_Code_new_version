import React from 'react';
import axios from 'axios';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE } from '../../config';

export default class AddAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showMessage: ""
        }
    }

    validateAdminForm = () => {
        var adminName = this.adminName.value;
        var adminGUID = this.adminGUID.value;
        var adminEmail = this.adminEmail.value;
        var selectedTeam = this.team;

        if (adminName !== "" && adminGUID !== "" && adminEmail !== "" && selectedTeam !== "" && selectedTeam !== null && selectedTeam !== undefined && selectedTeam !== "Select Team") {
            let modal = document.getElementById("confirmationModal");
            modal.style.display = "block";
        } else {
            let modal = document.getElementById("showErrorModal");
            modal.style.display = "block";
        }
    }
    selectTeam = (e) => {
        this.team = e.target.value;
    }
    closeshowErrorModal = () => {
        let modal = document.getElementById("showErrorModal");
        modal.style.display = "none";
    }
    closeConfirmationModal = () => {
        let modal = document.getElementById("confirmationModal");
        modal.style.display = "none";
    }
    showSuccessModal = () => {
        AuthService.addAdmin(this.adminName.value, this.adminGUID.value, this.adminEmail.value, this.team).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                let modal = document.getElementById("confirmationModal");
                modal.style.display = "none";
                let _modal = document.getElementById("showSuccessModal");
                _modal.style.display = "block";
            } else {
                let modal = document.getElementById("confirmationModal");
                modal.style.display = "none";
                let _modal = document.getElementById("showErrorModalforNewAdmin");
                _modal.style.display = "block";
                this.setState({ showMessage: data.data.message });
            }
        });
    }

    closeShowErrorModalforNewAdmin = () => {
        let modal = document.getElementById("showErrorModalforNewAdmin");
        modal.style.display = "none";
        document.getElementById("myForm").reset();
    }
    closeSuccessModal = () => {
        let modal = document.getElementById("showSuccessModal");
        modal.style.display = "none";
        document.getElementById("myForm").reset();
    }

    render() {
        let arrayOfData = this.props.adminList;
        let options = arrayOfData.map((data) =>
            <option>
                {data.team}
            </option>
        );
        return (
            <>
                <div className="d-flex w-100 flex-column">
                    <form id="myForm">
                        <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">

                            <h6 className="h6 a-pb-10">Provide the details for the new administrator below and click on add button:</h6>

                            <div className="a-input-number-box a-input-number-secondary pb-4">
                                <label className="a-input-label col-md-3">Name:<span>*</span></label>
                                <div className="a-input-container">
                                    <input className="a-text-input" type="text" placeholder="Enter name" id="" ref={(c) => this.adminName = c} />
                                </div>
                            </div>

                            <div className="a-input-number-box a-input-number-secondary pb-4">
                                <label className="a-input-label col-md-3">GUID:<span>*</span></label>
                                <div className="a-input-container">
                                    <input className="a-text-input" type="text" placeholder="Enter GUID" id="" ref={(c) => this.adminGUID = c} />
                                </div>
                            </div>

                            <div className="a-input-number-box a-input-number-secondary pb-4">
                                <label className="a-input-label col-md-3">Email ID:<span>*</span></label>
                                <div className="a-input-container">
                                    <input className="a-text-input" type="text" placeholder="Enter Email ID" id="" ref={(c) => this.adminEmail = c} />
                                </div>
                            </div>

                            <div className="a-input-number-box a-input-number-secondary pb-2">
                                <label className="a-input-label col-md-3">Team:<span>*</span></label>
                                <div className="a-input-container">
                                    <select className="teamDropDown a-text-input" onChange={(e) => this.selectTeam(e)} id="adminTeam" name="teamList"
                                        style={{ borderRadius: "0px !important" }}>
                                        <option>Select Team</option>
                                        {options}
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center gutter-wrapper" id="showMsg">
                                <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Add" onClick={this.validateAdminForm} />
                            </div>
                        </div>
                    </form>


                </div>
                <div id="confirmationModal" className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to add the admin?</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showSuccessModal} />
                            <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeConfirmationModal} /></div>
                    </div>

                </div>

                <div id="showErrorModal" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>The admin could not be added because of one of the following reasons:</p>
                        <ol>
                            <li>One or more of the fields was empty</li>
                            <li>Email ID format was incorrect</li>
                            <li>Incorrect team was selected (Individual doesn’t belong to the selected team)</li>
                            <li>Admin with the same name, GUID and Team already exists in the database</li>
                        </ol>

                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeshowErrorModal} />
                        </div>
                    </div>

                </div>
                <div id="showSuccessModal" className="modal">
                    <div className="modal-content">
                        <p>The new admin has been successfully added.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessModal} />
                        </div>

                    </div>

                </div>
                <div id="showErrorModalforNewAdmin" className="modal">
                    <div className="modal-content">
                        <p>{this.state.showMessage}</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeShowErrorModalforNewAdmin} />
                        </div>

                    </div>

                </div>

            </>

        );
    }
}