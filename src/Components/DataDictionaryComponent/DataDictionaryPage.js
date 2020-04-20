import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE } from '../../config';

export default class DataDictionaryPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('propsss in data ditcions', props);
    }
    handleReplaceAddFile = () => {
        let dataDictionaryPath = this.dataDictionaryPath.value;
        if (dataDictionaryPath === "" || dataDictionaryPath === null) {
            let modal = document.querySelector("#errorMsgforEmptyPath");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#confirmDataDictionary");
            modal.style.display = "block";
        }
    }
    closeErrorMsgforEmptyPath = () => {
        let modal = document.querySelector("#errorMsgforEmptyPath");
        modal.style.display = "none";
    }

    showSuccessDataDictionaryAdded = () => {
        let GUID = sessionStorage.getItem("guidNo");
        let dataDictionaryPath = this.dataDictionaryPath.value;
        AuthService.dataDictionaryUpload(dataDictionaryPath,GUID).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                let modal = document.querySelector("#confirmDataDictionary");
                modal.style.display = "none";
                let _modal = document.querySelector("#successDataDictionary");
                _modal.style.display = "block";
            } else {
                let modal = document.querySelector("#confirmDataDictionary");
                modal.style.display = "none";
                let _modal = document.querySelector("#errorMsgforEmptyPath");
                _modal.style.display = "block";
            }
        })
        this.dataDictionaryPath.value = "";
    }

    closeconfirmDataDictionary = () => {
        let modal = document.querySelector("#confirmDataDictionary");
        modal.style.display = "none";
        this.dataDictionaryPath.value = "";
    }
    closesuccessDataDictionary = () => {
        let _modal = document.querySelector("#successDataDictionary");
        _modal.style.display = "none";
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
        const rows = this.props.dataList;
        return (
            <>
                {this.props.selectedMenuForOperation === "view" ?
                    <>
                        {this.props.dataAvailable ?
                            <React.Fragment>

                                <div className="a-panel a-p-20">
                                    <h6 className="h6 a-pb-10">Data dictionary available for your team:</h6>
                                    <div class="a-pb-10">
                                        <MDBTable scrollY id="table-To-xls" >
                                            <MDBTableHead columns={columns} />
                                            <MDBTableBody rows={rows} />
                                        </MDBTable>
                                    </div>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button a-badge a-badge-dark"
                                        table="table-To-xls"
                                        filename="Data Dictionary"
                                        sheet="tablexls"
                                        buttonText="Export Data Dictionary" />
                                </div>
                            </React.Fragment> : 
                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block a-mb-20">
                                <p>Currently, there is no data dictionary available for your team.</p>
                                </div>}

                    </>
                    : this.props.selectedMenuForOperation === "replaceAdd" ?
                        <>


                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block a-mb-20">

                                <h6 className="h6 1-pb-10">If the data dictionary is already available for your team, the existing dictionary will be overwritten. In case no data dictionary is available for current team, the data dictionary will be added.</h6>
                                <p>Provide the file path for the data dictionary:</p>

                                <div className="a-input-number-box pb-2">
                                    <label className="a-input-label col-md-3">Data Dictionary Path:<span>*</span></label>
                                    <div className="col-md-9">

                                        <div className="d-flex a-input-with-icon a-rt">
                                            <input className="a-text-input a-input-secondary" ref={(c) => this.dataDictionaryPath = c} />
                                            <div class="a-icon a-form-tooltip">
                                                <span class="appkiticon icon-information-fill d-inline-flex a-text-warning a-cursor-pointer"></span>
                                                <div class="a-tooltip-box" placement="right">
                                                    <div class="a-tooltip-shadow">
                                                        <div class="a-h6 font-weight-normal">Upload the xlsx file from your local system.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="a-input-number-box pb-2">
                                    <label className="a-input-label col-md-3"></label>
                                    <div class="col-md-9">
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button a-badge a-badge-dark"
                                            table="table-to-xls"
                                            filename="Sample Data Dictionary"
                                            sheet="tablexls"
                                            buttonText="Sample Data Dictionary" />
                                        <table id="table-to-xls" style={{ display: "none" }}>
                                            <tr>
                                                <th>Keyword</th>
                                                <th>Category</th>
                                            </tr>
                                        </table>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-center gutter-wrapper" id="showMsg">
                                    <input type="button" value="Replace/Add" className="a-btn a-btn-primary a-btn-lg" onClick={this.handleReplaceAddFile} />
                                </div>

                            </div>




                        </>
                        :
                        <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block a-mb-20">
                            <h6 class="h6">Note: You will only be able to view/edit the data dictionary of your team. When making widespread updates, please replace the entire data dictionary. However, when making one-off changes to keywords or IT categories, please use the 'Keyword Operation' and 'Category Operation' sections</h6>
                        </div>
                }

                <div id="errorMsgforEmptyPath" className="modal">
                    <div className="modal-content">
                        <h4 class="error">ERROR</h4>
                        <p>The data dictionary could not be replaced/added because of one of the following reasons:</p>
                        <ol>
                            <li>The file path is incorrect/empty</li>
                            <li>The uploaded file is not in the correct format.</li>
                        </ol>

                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeErrorMsgforEmptyPath} /></div>

                    </div>

                </div>

                <div id="confirmDataDictionary" className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to replace/add the existing data dictionary?</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showSuccessDataDictionaryAdded} />
                            <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeconfirmDataDictionary} />
                        </div>
                    </div>

                </div>

                <div id="successDataDictionary" className="modal">
                    <div className="modal-content">
                        <p>The data dictionary has been successfully added/replaced.</p>
                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closesuccessDataDictionary} />
                        </div>
                    </div>

                </div>

            </>
        );
    }
}