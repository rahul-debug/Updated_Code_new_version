import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class DeleteAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdminTeamList: [],
        }
        this.guid = sessionStorage.getItem("guidNo");
    }
    componentDidMount() {
        if (this.guid) {
            AuthService.getAdminList(this.guid).then(data => {
                if (data.data.status === SUCCESS_CODE) {
                            const adminList = data.data.data;
                            this.setState({ showAdminTeamList: adminList });
                        } else {
                            let modal = document.getElementById("deleteConfirmationErrorModal");
                            modal.style.display = "block";
                        }
                    });
        }
    }
    getSelectedIndex = (event) => {
        this.selectedAdmin = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            this.selectedAdmin.push(checkboxes[i].value)
        }
    }
    deleteAdmin = () => {
        if (document.querySelector('#action') && document.querySelector('#action').checked) {
            let modal = document.querySelector("#deleteConfirmationModal");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#warningModal");
            modal.style.display = "block";
        }
    }
    showDeleteConfirmationModal = () => {
        AuthService.deleteAdmin(this.selectedAdmin).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                let modal = document.getElementById("deleteConfirmationModal");
                modal.style.display = "none";
                let _modal = document.getElementById("deleteConfirmationSuccessModal");
                _modal.style.display = "block";
                AuthService.getAdminList(this.guid).then(res => {
                        if (res.data.status === SUCCESS_CODE) {
                            const adminList = res.data.data;
                            this.setState({ showAdminTeamList: adminList });
                        } else {
                            alert("Due to internal server error, the data is not available at the moment");
                        }
                    })
            } else {
                let modal = document.getElementById("deleteConfirmationModal");
                modal.style.display = "none";
                let modal2 = document.getElementById("deleteConfirmationErrorModal");
                modal2.style.display = "block";
            }
                });
    }

    closeDeleteConfirmationModal = () => {
        let modal = document.getElementById("deleteConfirmationModal");
        modal.style.display = "none";
    }
    closeDeleteConfirmationSuccessModal = () => {
        let modal = document.getElementById("deleteConfirmationSuccessModal");
        modal.style.display = "none";
    }
    closeDeleteConfirmationErrorModal = () => {
        let modal = document.getElementById("deleteConfirmationErrorModal");
        modal.style.display = "none";
    }
    closeWarningModal = () => {
        let modal = document.querySelector("#warningModal");
        modal.style.display = "none";
    }

    render() {

        const columns = [
            {
                label: 'Name',
                field: 'Name',

            },
            {
                label: 'Team',
                field: 'Team'

            },
            {
                label: 'Email',
                field: 'Email'
            },
            {
                label: 'Action',
                field: 'Action'
            }
        ];
        return (
            <>
                <div className="a-panel a-p-20 a-mb-10">
                    <h6 className="h6 a-pb-10">Provide the details of the admin whose privileges are to be revoked:</h6>
                    <MDBTable scrollY>
                        <MDBTableHead columns={columns} />
                        <MDBTableBody>
                            {this.state.showAdminTeamList.map(admin =>
                                <tr>
                                    <td>{admin.user_name}</td>
                                    <td>{admin.team}</td>
                                    <td>{admin.email}</td>
                                    <td className="tdClass">
                                        <label class="a-checkbox a-mx-10">
                                            <input type="checkbox" id="action" name="action" value={admin.email} onChange={(e) => this.getSelectedIndex(e)} />
                                            <span class="a-checkbox-mark">
                                                <span class="appkiticon icon-check-mark-fill"></span>
                                            </span>
                                        </label>
                                    </td>
                                </tr>)}

                        </MDBTableBody>
                    </MDBTable>
               


                <div className="d-flex justify-content-center gutter-wrapper" id="showMsg">
                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Delete" onClick={this.deleteAdmin} />
                </div>
                </div>

                <div id="deleteConfirmationModal" className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete the admin?</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showDeleteConfirmationModal} />
                            <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeDeleteConfirmationModal} />
                        </div>
                    </div>

                </div>
                <div id="deleteConfirmationSuccessModal" className="modal">
                    <div className="modal-content">
                        <p>Privileges for the admin have been successfully revoked.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeDeleteConfirmationSuccessModal} />
                        </div>
                    </div>

                </div>

                <div id="deleteConfirmationErrorModal" className="modal">
                    <div className="modal-content">
                        <p>Unable to execute the process at this moment.!!!!!</p>
                        <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeDeleteConfirmationErrorModal} />
                        </div>
                    </div>

                </div>

                <div id="warningModal" className="modal">
                    <div className="modal-content">
                        <p>Please select the admin(s).</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeWarningModal} />
                        </div>
                    </div>

                </div>




            </>
        );
    }
}