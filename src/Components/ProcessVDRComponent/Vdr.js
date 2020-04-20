import React from 'react';
import history from '../../History';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE, NOT_ACCEPTABLE, ALREADY_REPORTED } from '../../config';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default class VDR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamData: [],
            dataAvailable: "",
            userName: "",
            dataObject: {}
        }
        this.object = {}
        this.guidNo = sessionStorage.getItem("guidNo");
    }


    componentDidMount() {
        AuthService.dataDictionaryTeamView(this.guidNo).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                const teamList = data.data.data;
                this.setState({ teamData: teamList, dataAvailable: true });
            }

            else {

                let modal = document.getElementById("waringDataDictionaryModal");
                modal.style.display = "block";
                document.querySelector("#myForm").reset();

                this.setState({ dataAvailable: false })
            }
        });
    }
    showDataDictionaryModal = () => {

        document.querySelector("#dataDictionaryModal").style.display = "block";
    }
    closeDataDictionaryModal = () => {
        document.querySelector("#dataDictionaryModal").style.display = "none";
    }

    validateForm = () => {
        var vdrName = this.vdrName.value;
        var dlrName = this.dlrName.value;
        var keyword = this.keyword.value ? this.keyword.value : "none";
        var email = this.email.value;

        if (vdrName === "" || vdrName === null || dlrName === "" || dlrName === null || email === "" || email === null) {
            let modal = document.getElementById("myModal");
            modal.style.display = "block";
        } else {
            if (this.guidNo) {
                const obj = {}
                obj.guid = this.guidNo;
                obj.vdrLocation = vdrName;
                obj.drlLocation = dlrName;
                obj.keyword = keyword;
                obj.email = email;
                this.object = obj;
                AuthService.processValidation(obj.guid, obj.vdrLocation, obj.drlLocation, obj.keyword, obj.email).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        history.push({
                            pathname: "/processing",
                            state: { "userName": this.props.userName, "dataObject": this.object }
                        });
                    }
                    else if (data.data.status === NOT_ACCEPTABLE) {
                        let modal = document.getElementById("errorMsgforEmail");
                        modal.style.display = "block";
                        document.querySelector("#myForm").reset();
                    }
                    else if (data.data.status ===  ALREADY_REPORTED) {
                        let modal = document.getElementById("errorMsgforrequest");
                        modal.style.display = "block";
                        document.querySelector("#myForm").reset();
                    }
                    else {
                        let modal = document.getElementById("errorMsgforProcessVDR");
                        modal.style.display = "block";
                        document.querySelector("#myForm").reset();
                    }

                });

            }
        }
    }

    closeModal = () => {
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    closeerrorMsgforProcessVDR = () => {
        let modal = document.getElementById("errorMsgforProcessVDR");
        modal.style.display = "none";
    }

    closeerrorMsgforEmail = () => {
        let modal = document.getElementById("errorMsgforEmail");
        modal.style.display = "none";
    }
    closeerrorMsgforrequest = () => {
        let modal = document.getElementById("errorMsgforrequest");
        modal.style.display = "none";
        document.getElementById("validbtn").disabled = true;
    }

    waringDataDictionaryModal = () => {
        let modal = document.getElementById("waringDataDictionaryModal");
        modal.style.display = "none";
        document.getElementById("validbtn").disabled = true;
    }


    render() {
        const columns = [
            {
                label: 'Keyword',
                field: 'id',

            },
            {
                label: 'IT Category',
                field: 'itCat'

            }
        ];
        const rows = this.state.teamData;

        return (

            <React.Fragment>

                <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                    <h6 className="h6 a-pb-10">The Data Room Sweeper Tool (DRST) is a PwC-internal solution that allows teams to identify relevant documents (across a breadth of file extensions) based on keywords and phrases of interest.</h6>

                    <form id="myForm">

                        <div className="a-input-number-box pb-4">
                            <label className="a-input-label col-md-3">VDR Folder Location:<span>*</span></label>
                            <div className="col-md-9">
                                <div className="d-flex a-input-with-icon a-rt">
                                    <input className="a-text-input a-input-secondary" type="text" placeholder="Enter path" id="vdrName" ref={(c) => this.vdrName = c} />
                                    <div class="a-icon a-form-tooltip">
                                        <span class="appkiticon icon-information-fill d-inline-flex a-text-warning a-cursor-pointer"></span>
                                        <div class="a-tooltip-box" placement="right">
                                            <div class="a-tooltip-shadow">
                                                <div class="a-h6 font-weight-normal">Provide the workdocs URL for the VDR Folder</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="a-input-number-box pb-4">
                            <label className="a-input-label col-md-3">DRL Folder Location:<span>*</span></label>
                            <div className="col-md-9">
                                <div className="d-flex a-input-with-icon a-rt">
                                    <input className="a-text-input a-input-secondary" type="text" placeholder="Enter location" id="dlrName" ref={(c) => this.dlrName = c} />
                                    <div class="a-icon a-form-tooltip">
                                        <span class="appkiticon icon-information-fill d-inline-flex a-text-warning a-cursor-pointer"></span>
                                        <div class="a-tooltip-box" placement="right">
                                            <div class="a-tooltip-shadow">
                                                <div class="a-h6 font-weight-normal">Provide the workdocs URL for the DRL Folder. It has to be folder which contains a single xlsx file</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="a-input-number-box pb-2">
                            <label className="a-input-label col-md-3">Keywords:</label>
                            <div className="col-md-9">
                                <div className="d-flex">
                                    <div className="d-flex a-input-with-icon a-rt">
                                        <input className="a-text-input a-input-secondary" type="text" placeholder="Enter keyword" id="keyword" ref={(c) => this.keyword = c} />
                                        <div class="a-icon a-form-tooltip">
                                            <span class="appkiticon icon-information-fill d-inline-flex a-text-warning a-cursor-pointer"></span>
                                            <div class="a-tooltip-box" placement="right">
                                                <div class="a-tooltip-shadow">
                                                    <div class="a-h6 font-weight-normal">
                                                        <ol>
                                                            <li>Keywords can be added if the user believes that the keywords are not available in the existing data dictionary.</li>
                                                            <li>Refraing from entering common keywords such as A, The, One, An and so on. </li>
                                                            <li>Keywords have to be separated by comma (,) when entering more than one keyword and there shoould not be any character or space between two keywords apart from comma. This is also applicable when entering multi-word keywords. Example- Data Center, Infrastructure Planning, ER</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="a-input-number-box pb-4">
                            <label className="a-input-label col-md-3"></label>
                            <div className="col-md-9">
                                <span class="dataDictionaryHeading a-badge a-badge-dark" onClick={this.showDataDictionaryModal}>Data Dictionary</span>
                            </div>
                        </div>

                        <div className="a-input-number-box pb-2">
                            <label className="a-input-label col-md-3">Recipient's Email:<span>*</span></label>
                            <div className="col-md-9">
                                <div className="d-flex a-input-with-icon a-rt">
                                    <input className="a-text-input a-input-secondary" type="text" placeholder="e.g. xyz@pwc.com" id="email" ref={(c) => this.email = c} />
                                    <div class="a-icon a-form-tooltip">
                                        <span class="appkiticon icon-information-fill d-inline-flex a-text-warning a-cursor-pointer"></span>
                                        <div class="a-tooltip-box" placement="right">
                                            <div class="a-tooltip-shadow">
                                                <div class="a-h6 font-weight-normal">
                                                    <ol>
                                                        <li>Do not provide one's own email ID.</li>
                                                        <li>Emails have to be separated by comma(,) when entering more than one email address and there should not be any character or space between two email addresses apart from comma. Example- abc@pwc.com, xyz@pwc.com</li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center gutter-wrapper" id="showMsg">
                        <input type="button" value="Process VDR" className="a-btn a-btn-primary a-btn-lg" id="validbtn" onClick={this.validateForm} />
                    </div>

                </div>
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>The error occurred because of one of the following reasons:</p>
                        <ol>
                            <li>VDR and/or DRL folder location(s) not entered.</li>
                            <li>Please enter the email id(s) for recipient(s).</li>
                        </ol>
                        <p>Please enter the correct details and restart the process.</p>
                        <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeModal} /></div>
                    </div>
                </div>
                <div id="errorMsgforProcessVDR" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        <p>The error occurred because of one of the following reasons:</p>
                        <ol>
                            <li>VDR and/or DRL location was not valid.</li>
                            <li>The user doesn’t have access to the VDR.</li>
                            <li>There are no files in the VDR folder.</li>
                        </ol>
                        <p>Please provide correct details and restart the process.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeerrorMsgforProcessVDR} />
                        </div>
                    </div>
                </div>


                <div id="errorMsgforEmail" className="modal">
                    <div className="modal-content">
                        <h4 className="error">Warning:</h4>
                        <p>The error occurred because one or more email IDs are incorrect. Please provide emails in the correct format and restart the process.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeerrorMsgforEmail} />
                        </div>
                    </div>
                </div>

                <div id="errorMsgforrequest" className="modal">
                    <div className="modal-content">
                        <h4 className="error">Warning:</h4>
                        <p>Your previous request is still being processed. Please wait while the request is completed. Once you receive an email with the attached output, you can process your VDR again.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeerrorMsgforrequest} />
                        </div>
                    </div>
                </div>

                <div id="waringDataDictionaryModal" className="modal">
                    <div className="modal-content">
                        <h4 className="error">Warning:</h4>
                        <p>Currently, there is no Data Dictionary associated with your team (e.g., DDV, FDD). Hence, you will not be able to process the files. Please reach out to the DRST Admin of your team.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.waringDataDictionaryModal} />
                        </div>
                    </div>
                </div>



                <div id="dataDictionaryModal" className="modal">
                    <div className="modal-content lg-popup">
                        {this.state.dataAvailable ?
                            <div id="vdrDataDictionaryTable">
                                <MDBTable scrollY className="a-table popuptable">
                                    <MDBTableHead columns={columns} />
                                    <MDBTableBody rows={rows} />
                                </MDBTable></div> :
                            <p>No Data Dictionary Available</p>
                        }
                        <div className="d-flex justify-content-center gutter-wrapper"> <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeDataDictionaryModal} /></div>

                    </div>
                </div>


                {/* <section id="footer-copyright">
                    <div className="row">
                        <div className="col-xs-12">
                            <p>© {(new Date().getFullYear())} PwC.All rights reserved.</p>
                        </div>
                    </div>
                </section> */}

            </React.Fragment>


        );
    }
}