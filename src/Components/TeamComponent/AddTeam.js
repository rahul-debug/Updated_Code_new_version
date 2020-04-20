import React from 'react';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class AddTeam extends React.Component {

    constructor(props) {
        super(props);
    }

    addTeam = () => {
        let newTeamName = this.newTeam.value;
        console.log("newTeamName", newTeamName);
        if (newTeamName && newTeamName !== "") {
            let modal = document.getElementById("teamAddConfirmationModal");
            modal.style.display = "block";
        } else {
            let modal = document.getElementById("showErrorPopup");
            modal.style.display = "block";
        }
    }
    closeErrorPopUp = () => {
        let modal = document.getElementById("showErrorPopup");
        modal.style.display = "none";
    }
    closeTeamAddConfirmationModal = () => {
        let modal = document.getElementById("teamAddConfirmationModal");
        modal.style.display = "none";
    }
    showAddTeamConfirmationModal = () => {
        let addTeamName = this.newTeam.value;
        let GUID = sessionStorage.getItem("guidNo");
        console.log('fndnfdkdjs', addTeamName);
        if (addTeamName && addTeamName !== "") {

            AuthService.addTeamDetails(addTeamName,GUID).then(data => {
                if (data.data.status === SUCCESS_CODE) {
                    let modal = document.getElementById("teamAddConfirmationModal");
                    modal.style.display = "none";
                    let _modal = document.getElementById("showSuccessModal");
                    _modal.style.display = "block";
                    this.props.callTeamList();
                } else {
                    let modal = document.getElementById("teamAddConfirmationModal");
                    modal.style.display = "none";
                    let _modal = document.getElementById("showErrorPopup");
                    _modal.style.display = "block";
                }
            });
        } else {
            let modal = document.getElementById("teamAddConfirmationModal");
            modal.style.display = "none";
            let _modal = document.getElementById("showErrorPopup");
            _modal.style.display = "block";
        }


    }
    closeSuccessModal = () => {
        let modal = document.getElementById("showSuccessModal");
        modal.style.display = "none";
        document.getElementById("addTeamForm").reset();
    }

    render() {

        return (
            <>


                <div className="">

                    <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">

                        

                        <h6 className="h6 a-pb-10">Provide the name for the new team below and click on add button:</h6>
                        <form id="addTeamForm">
                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                                <label className="a-input-label col-md-3">Name:<span>*</span></label>
                                <div className="col-md-9">
                                    <div className="a-input-container">
                                        <input className="a-text-input" type="text" id="dictionaryKeyword" ref={(c) => this.newTeam = c} />
                                    </div>
                                </div>

                            </div>
                        </form>

                        <div className="d-flex justify-content-center gutter-wrapper" id="deleteTeam">
                            <input type="button" value="Add" className="a-btn a-btn-primary a-btn-lg" onClick={this.addTeam} />
                        </div>
                    </div>

                </div>


                <div id="showErrorPopup" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>The team could not be added because the name of the team was not provided.</p>
                        <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeErrorPopUp} /></div>

                    </div>

                </div>
                <div id="teamAddConfirmationModal" className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to add this team?</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showAddTeamConfirmationModal} />
                            <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeTeamAddConfirmationModal} />
                        </div>
                    </div>

                </div>
                <div id="showSuccessModal" className="modal">
                    <div className="modal-content">
                        <p>The new team has been successfully added.</p>
                        <div className="d-flex justify-content-center gutter-wrapper"> <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessModal} /></div>
                    </div>

                </div>
            </>
        );
    }
}