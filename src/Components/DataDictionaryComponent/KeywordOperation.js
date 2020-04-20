import React from 'react';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class KeywordOperation extends React.Component {
    constructor(props) {
        super(props);
        this.guidNo=sessionStorage.getItem("guidNo");
        console.log('keywrd',props);
    }

    selectCategory = (e) => {
        this.selectedCategory = e.target.value;
        if (document.getElementById("selKey") && document.getElementById("selKey").disabled === true) {
            document.getElementById("selKey").disabled = false;
        }
        this.props.updateITKeyword(this.selectedCategory ? this.selectedCategory: "none", this.guidNo);
    }
    selectKeyword = (e) => {
        this.selectedKeyword = e.target.value;
    }
    selectNewCategory = (e) => {
        this.selectedNewCategory = e.target.value;
    }
    handleKeywordAddOperation = () => {
        let dictionarykeyword = this.dictionarykeyword.value;
        let category = this.selectedCategory;
        if (dictionarykeyword !== "" && category !== "" && category !== "Select Category" && category !== undefined && category !== null) {
            let modal = document.querySelector("#addKeywordOperation");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#errorMsgforEmptyValues");
            modal.style.display = "block";
        }
    }
    handleKeywordDeleteOperation = () => {
        // let dictionarykey = this.dictionarykeyword.value;
        let dictionarykey = this.selectedKeyword;
        let category = this.selectedCategory;
        if (dictionarykey !== "" && dictionarykey !== "Select Category" && dictionarykey !== undefined && dictionarykey !== null && category !== "" && category !== "Select Category" && category !== undefined && category !== null) {
            let modal = document.querySelector("#addKeywordOperation");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#errorMsgforEmptyValues");
            modal.style.display = "block";
        }
        console.log('valuesssss', this.selectedCategory, dictionarykey);
    }
    handleKeywordModifyOperation = () => {
        let category = this.selectedCategory;
        let selectedKeyword = this.selectedKeyword;
        if (selectedKeyword !== "" && selectedKeyword !== "Select Category" && selectedKeyword !== undefined && selectedKeyword !== null && category !== "" && category !== "Select Category" && category !== undefined && category !== null) {
            let modal = document.querySelector("#addKeywordOperation");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#errorMsgforEmptyValues");
            modal.style.display = "block";
        }
        console.log('valuesssss', category);
    }
    closeErrorMsgforEmptyValues = () => {
        let modal = document.querySelector("#errorMsgforEmptyValues");
        modal.style.display = "none";
        if (document.querySelector("#keyForm")) {
            document.querySelector("#keyForm").reset();
        }
        if (document.querySelector("#keyFormModify")) {
            document.querySelector("#keyFormModify").reset();
        }
    }
    closeAddKeywordOperationModal = () => {
        let modal = document.querySelector("#addKeywordOperation");
        modal.style.display = "none";
        if (document.querySelector("#keyForm")) {
            document.querySelector("#keyForm").reset();
        }
        if (document.querySelector("#keyFormModify")) {
            document.querySelector("#keyFormModify").reset();
        }
    }
    showSuccessAddKeywordOperation = () => {
        if (this.props.selectedMenuForOperation === "add") {
            let dictionarykeyword = this.dictionarykeyword.value;
            let category = this.selectedCategory;
            if (category !== "" && dictionarykeyword && category !== "Select Team") {

                AuthService.dataDictionaryAddITCategoryKeyword(category,dictionarykeyword,this.guidNo).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        let modal = document.querySelector("#addKeywordOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#successAddKeywordOperation");
                        _modal.style.display = "block";
                        this.props.updateDataDictionaryTeamView();
                        this.props.updateITKeyword(this.selectedCategory,this.guidNo);
                        this.props.updateDataDictionaryITCategoryView();
                        if (document.querySelector("#keyForm")) {
                            document.querySelector("#keyForm").reset();
                        }
                        
                    } else {
                        let modal = document.querySelector("#addKeywordOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#errorMsgforEmptyValues");
                        _modal.style.display = "block";
                    }
                })
            }
        } else if (this.props.selectedMenuForOperation === "delete") {
            let dictionarykeyword = this.selectedKeyword;
            let category = this.selectedCategory;
            if (category !== "" && category !== "Select Team" && dictionarykeyword !== "" && dictionarykeyword !== "Select Team") {
                AuthService.dataDictionaryDelete(category,dictionarykeyword,this.guidNo).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        let modal = document.querySelector("#addKeywordOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#successAddKeywordOperation");
                        _modal.style.display = "block";
                        this.props.updateDataDictionaryTeamView();
                        this.props.updateITKeyword(this.selectedCategory,this.guidNo);
                        this.props.updateDataDictionaryITCategoryView();
                        if (document.querySelector("#keyForm")) {
                            document.querySelector("#keyForm").reset();
                        }
                        

                    } else {
                        let modal = document.querySelector("#addKeywordOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#errorMsgforEmptyValues");
                        _modal.style.display = "block";
                    }
                })
            }
        } else if (this.props.selectedMenuForOperation === "modify") {
            let category = this.selectedCategory;
            let selectedKeyword = this.selectedKeyword;
            let selectedNewCategory = this.selectedNewCategory ?this.selectedNewCategory : "none";
            let newKeyName = this.newkeyName.value ? this.newkeyName.value : "none";
            if (category !== "" && selectedKeyword && selectedKeyword !== "Select Team") {
                AuthService.dataDictionaryUpdateKeyword(category,selectedKeyword,this.guidNo,selectedNewCategory,newKeyName).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        let modal = document.querySelector("#addKeywordOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#successAddKeywordOperation");
                        _modal.style.display = "block";
                        this.props.updateDataDictionaryTeamView();
                        this.props.updateITKeyword(this.selectedCategory,this.guidNo);
                        this.props.updateDataDictionaryITCategoryView();
                        if (document.querySelector("#keyFormModify")) {
                            document.querySelector("#keyFormModify").reset();
                        }
                        
                    } else {
                        let modal = document.querySelector("#addKeywordOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#errorMsgforEmptyValues");
                        _modal.style.display = "block";
                    }
                })
            }
        } else {
            let modal = document.getElementById("addKeywordOperation");
            modal.style.display = "none";
            let _modal = document.getElementById("errorMsgforEmptyValues");
            _modal.style.display = "block";
        }
               
    }
    closeSuccessAddKeywordOperation = () => {
        let _modal = document.querySelector("#successAddKeywordOperation");
        _modal.style.display = "none";
    }


    render() {
        let arrayOfData = this.props.itCatList;
        let optionsforITCategory = arrayOfData.map((data) =>
            <option>
                {data.category}
            </option>
        );
        let arrayOfData2 = this.props.itKeyword;
        let optionsforITKeyword = arrayOfData2.map((data) =>
            <option>
                {data.keyword}
            </option>
        );
        return (
            <>
                {this.props.selectedMenuForOperation === "add" ?
                    <React.Fragment>
                        <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block a-mb-20">
                            <h6 class="h6 a-pb-10">Provide the details of the keyword that is to be added to the data dictionary:</h6>
                            <div className="addKey">

                                <form id="keyForm">
                                    <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                        <label className="a-input-label col-md-3">Choose IT Category:<span>*</span></label>
                                        <div className="a-input-container">
                                            <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectCategory(e)} id="catList" name="catList">
                                                <option>Select Category</option>
                                                {optionsforITCategory}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                                        <label className="a-input-label col-md-3">Keyword:<span>*</span></label>
                                        <div className="a-input-container">
                                            <input className="a-text-input" type="text" id="dictionaryKeyword" ref={(c) => this.dictionarykeyword = c} />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="d-flex justify-content-center gutter-wrapper">
                                <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Add" onClick={this.handleKeywordAddOperation} />
                            </div>
                        </div>
                    </React.Fragment>

                    : this.props.selectedMenuForOperation === "delete" ?
                        <React.Fragment>
                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                <h6 className="h6 a-pb-10">Provide the details of the keyword that is to be deleted from the data dictionary:</h6>
                                <div className="addKey">
                                    <form id="keyForm">

                                        <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                            <label className="a-input-label col-md-3">Choose IT Category:<span>*</span></label>
                                            <div className="a-input-container">

                                                <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectCategory(e)} id="catList" name="catList">
                                                    <option>Select Category</option>
                                                    {optionsforITCategory}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                                            <label className="a-input-label col-md-3">Keyword:<span>*</span></label>
                                            <div className="a-input-container">
                                            <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectKeyword(e)} id="selKey" name="selKey" disabled
                                            >
                                            <option>Select Keyword</option>
                                            {optionsforITKeyword}
                                        </select>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Delete" onClick={this.handleKeywordDeleteOperation} />
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        this.props.selectedMenuForOperation === "modify" ?
                            <>
                                <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                    <h6 className="h6 a-pb-10">Provide the details of the keyword that is to be updated in the data dictionary:</h6>
                                    <div className="addKey2">
                                        <form id="keyFormModify">

                                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                                <label className="a-input-label col-md-3">Choose IT Category:<span>*</span></label>
                                                <div className="a-input-container">
                                                    <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectCategory(e)} id="catList" name="catList">
                                                        <option>Select Category</option>
                                                        {optionsforITCategory}
                                                    </select>
                                                </div>
                                            </div>


                                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                                <label className="a-input-label col-md-3">Keyword:<span>*</span></label>
                                                <div className="a-input-container">
                                                    <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectKeyword(e)} id="selKey" name="selKey">
                                                        <option>Select Keyword</option>
                                                        {optionsforITKeyword}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                                <label className="a-input-label col-md-3">New IT Category:</label>
                                                <div className="a-input-container">
                                                    <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectNewCategory(e)} id="selNewKey" name="selNewKey"
                                                        style={{ borderRadius: "0px !important" }}>
                                                        <option>Select Category</option>
                                                        {optionsforITCategory}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                                <label className="a-input-label col-md-3">New Keyword Name:</label>
                                                <div className="a-input-container">
                                                    <input className="a-text-input KeyAddDropDown" type="text" id="dictionaryKeyword" ref={(c) => this.newkeyName = c} />
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="a-form-label">
                                        Note: At least one of two fields (New IT Category and New Keyword Name) has to be populated for updating the keyword
                                    </div>
                                    <div className="d-flex justify-content-center gutter-wrapper">
                                        <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Modify" onClick={this.handleKeywordModifyOperation} />
                                    </div>
                                </div>
                            </>

                            :

                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                <h6 class="h6">Note: You will only be able to view/edit the data dictionary of your team.When making widespread updates, please replace the entire data dictionary. However, when making one-off changes to keywords or IT categories, please use the 'Keyword Operation' and 'Category Operation' sections</h6>

                            </div>
                }
                <div id="errorMsgforEmptyValues" className="modal">
                    <div className="modal-content">
                        <h4 class="error">ERROR</h4>
                        {this.props.selectedMenuForOperation === "add" ?
                            <>
                             <p>The keyword could not be added because of one of the following reasons:</p>
                            <ol>
                                <li>IT Category is empty</li>
                                <li>Keyword field is empty</li>
                                <li>Same keyword is available in the existing data dictionary</li>
                            </ol>
                               </> : null}

                        {this.props.selectedMenuForOperation === "delete" ?
                            <>
                                <p>The keyword could not be deleted because of one of the following reasons:</p>
                                <ol>
                                    <li>IT Category is empty</li>
                                    <li>Keyword field is empty</li>
                                    <li>No keyword is available in the existing data dictionary under provided category</li>
                                </ol>
                                </> : null}

                        {this.props.selectedMenuForOperation === "modify" ?
                            <>
                                <p>The keyword could not be updated because of one of the following reasons:</p>
                                <ol>
                                    <li>IT Category/Keyword field is empty</li>
                                    <li>Both New IT Category and New Keyword Name fields are empty</li>
                                </ol>
                                
                            </> : null}

                            <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeErrorMsgforEmptyValues} />
                        </div>

                    </div>

                </div>

                <div id="addKeywordOperation" className="modal">
                    <div className="modal-content">
                        {this.props.selectedMenuForOperation === "add" ?
                            <>
                                <p>Are you sure you want to add the keyword to the existing data dictionary?</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showSuccessAddKeywordOperation} />
                                    <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeAddKeywordOperationModal} />
                                </div>
                            </> : null}

                        {this.props.selectedMenuForOperation === "delete" ?
                            <>
                                <p>Are you sure you want to delete the keyword to the existing data dictionary?</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showSuccessAddKeywordOperation} />
                                    <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeAddKeywordOperationModal} />
                                </div>
                            </> : null}

                        {this.props.selectedMenuForOperation === "modify" ?
                            <>
                                <p>Are you sure you want to update the keyword in the existing data dictionary?</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showSuccessAddKeywordOperation} />
                                    <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeAddKeywordOperationModal} />
                                </div>
                            </> : null}
                    </div>

                </div>

                <div id="successAddKeywordOperation" className="modal">
                    <div className="modal-content">
                        {this.props.selectedMenuForOperation === "add" ?
                            <>
                                <p>The keyword has been added successfully.</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessAddKeywordOperation} /></div>
                            </> : null}
                        {this.props.selectedMenuForOperation === "delete" ?
                            <>
                                <p>The keyword has been deleted successfully.</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessAddKeywordOperation} /></div>
                            </> : null}

                        {this.props.selectedMenuForOperation === "modify" ?
                            <>
                                <p>The keyword has been updated successfully.</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessAddKeywordOperation} /></div>
                            </> : null}
                    </div>

                </div>
            </>
        );
    }
}