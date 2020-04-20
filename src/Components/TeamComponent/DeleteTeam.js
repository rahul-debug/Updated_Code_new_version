import React from 'react';
import axios from 'axios';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class DeleteTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamDetails: [],
            errorMsg: ""

        }
    }
    componentDidMount() {
        AuthService.getDeleteTeamDetailsView().then(data => {
            if (data.data.status === SUCCESS_CODE) {
                const teamDetails = data.data.data;
                    this.setState({ teamDetails: teamDetails });
                } else {
                    this.setState({ errorMsg: data.data.message })
                }
            })
    }

    selectTeam = (e) => {
        this.selectedTeam = e.target.value;
    }
    handleDeleteTeam = () => {
        console.log('kya vakue hai', this.selectedTeam);
        var selectedTeam = this.selectedTeam;
        if (selectedTeam !== "" && selectedTeam !== null && selectedTeam !== undefined) {
            let modal = document.getElementById("confirmationDeleteTeamModal");
            modal.style.display = "block";
        } else {
            let modal = document.getElementById("errorModalDeleteTeam");
            modal.style.display = "block";
        }
    }
    closeErrorModalDeleteTeam = () => {
        let modal = document.getElementById("errorModalDeleteTeam");
        modal.style.display = "none";
    }
    closeConfirmationDeleteTeamModal = () => {
        let modal = document.getElementById("confirmationDeleteTeamModal");
        modal.style.display = "none";
    }
    showDeleteTeamModal = () => {
        if (this.selectedTeam && this.selectedTeam !== "Select Team") {
            let GUID = sessionStorage.getItem("guidNo");
            AuthService.deleteTeamDetails(this.selectedTeam,GUID).then(data => {
                if (data.data.status === SUCCESS_CODE) {
                    let modal = document.getElementById("confirmationDeleteTeamModal");
                    modal.style.display = "none";
                    let _modal = document.getElementById("showSuccessTeamDeleteModal");
                    _modal.style.display = "block";
                    this.props.callTeamList();
                } else {
                    let modal = document.getElementById("confirmationDeleteTeamModal");
                    modal.style.display = "none";
                    let _modal = document.getElementById("errorModalDeleteTeam");
                    _modal.style.display = "block";
                }
            });

        } else {
            let modal = document.getElementById("confirmationDeleteTeamModal");
            modal.style.display = "none";
            let _modal = document.getElementById("errorModalDeleteTeam");
            _modal.style.display = "block";
        }
    }
    closeSuccessTeamDeleteModal = () => {
        let modal = document.getElementById("showSuccessTeamDeleteModal");
        modal.style.display = "none";
        document.getElementById("myform").reset();
    }
    render() {
        let arrayOfData = this.state.teamDetails;
        let options = arrayOfData.map((data) =>
            <option>
                {data.team}
            </option>
        );
        return (
            <>
                
                <div className="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">

                <h6 className="h6 a-pb-10">Provide select the team which needs to be deleted and click on delete button:</h6>

                    <form id="myform">
                        <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                            <label className="a-input-label col-md-3">Select Team:<span>*</span></label>
                            <div className="a-input-container">
                                <select className="a-text-input" onChange={(e) => this.selectTeam(e)} id="sel2" name="sellist1">
                                    <option>Select Team</option>
                                    {options}
                                </select>
                            </div>
                        </div>

                    </form>

                    <div className="d-flex justify-content-center gutter-wrapper" id="deleteTeam">
                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Delete" onClick={this.handleDeleteTeam} />
                </div>


                </div>
                
                <div id="errorModalDeleteTeam" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>The team could not be deleted because you don’t belong to this team or the team detail is not provided.</p>
                        <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeErrorModalDeleteTeam} /></div>
                    </div>

                </div>
                <div id="confirmationDeleteTeamModal" className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this team?</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showDeleteTeamModal} />
                        <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeConfirmationDeleteTeamModal} />
                        </div>
                    </div>

                </div>
                <div id="showSuccessTeamDeleteModal" className="modal">
                    <div className="modal-content">
                        <p>The team has been successfully deleted from existing records.</p>
                        <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessTeamDeleteModal} /></div>
                    </div>

                </div>
            </>
        );
    }
}