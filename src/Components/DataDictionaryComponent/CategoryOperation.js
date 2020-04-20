import React from 'react';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class CategoryOperation extends React.Component {
    constructor(props){
        super(props);
        this.guidNo=sessionStorage.getItem("guidNo");
    }

    handleCategoryAddition = () => {
        let newItCategory = this.newItCategory.value;
        let newDictionaryKeyword = this.newDictionaryKeyword.value;
        if (newItCategory !== "" && newDictionaryKeyword !== "") {
            let modal = document.querySelector("#CategoryOperation");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#errorMsgforEmptyValues");
            modal.style.display = "block";
        }
    }
    selectCategory = (e) => {
        this.selectedCategory = e.target.value;
    }
    selectNewITCategory = (e) => {
        this.selectednewITCategory = e.target.value;
    }
    handleCategoryDeleteOperation = () => {
        let category = this.selectedCategory;
        if (category !== "" && category !== "Select Category" && category !== undefined && category !== null) {
            let modal = document.querySelector("#CategoryOperation");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#errorMsgforEmptyValues");
            modal.style.display = "block";
        }
    }
    handleCategoryUpdate = () => {
        let category = this.selectedCategory;
        let newItCategory = this.selectednewITCategory;
        if (category !== "" && category !== "Select Category" && category !== undefined && category !== null
            && newItCategory !== "" && newItCategory !== "Select Category" && newItCategory !== undefined && newItCategory !== null
            && category !== newItCategory) {
            let modal = document.querySelector("#CategoryOperation");
            modal.style.display = "block";
        } else {
            let modal = document.querySelector("#errorMsgforEmptyValues");
            modal.style.display = "block";
        }
    }
    closeErrorMsgforEmptyValues = () => {
        let modal = document.querySelector("#errorMsgforEmptyValues");
        modal.style.display = "none";
    }
    showsuccessCategoryOperation = () => {
        if (this.props.selectedMenuForOperation === "addCat") {
            let newItCategory = this.newItCategory.value;
            let newDictionaryKeyword = this.newDictionaryKeyword.value;
            if (newItCategory !== "" && newDictionaryKeyword !== "") {
                AuthService.dataDictionaryAddITCategoryKeyword(newItCategory,newDictionaryKeyword,this.guidNo).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        let modal = document.querySelector("#CategoryOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#successCategoryOperation");
                        _modal.style.display = "block";
                        this.props.updateDataDictionaryTeamView();
                        this.props.updateITKeyword(newItCategory, this.guidNo);
                        this.props.updateDataDictionaryITCategoryView();
                        if (document.querySelector("#catFormAdd")) {
                            document.querySelector("#catFormAdd").reset();
                        }
                        
                    } else {
                        let modal = document.querySelector("#CategoryOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#errorMsgforEmptyValues");
                        _modal.style.display = "block";
                    }

                });
            }
        } else if (this.props.selectedMenuForOperation === "deleteCat") {
            let itCategory = this.selectedCategory;
            if (itCategory && itCategory !== "Select Category") {

                AuthService.dataDictionaryDeleteCategory(itCategory,this.guidNo).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        let modal = document.querySelector("#CategoryOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#successCategoryOperation");
                        _modal.style.display = "block";
                        this.props.updateDataDictionaryTeamView();
                        this.props.updateDataDictionaryITCategoryView();
                        this.props.updateITKeyword(this.selectedCategory,this.guidNo);
                        if (document.querySelector("#catFormAdd")) {
                            document.querySelector("#catFormAdd").reset();
                        }
                       
                    } else {
                        let modal = document.querySelector("#CategoryOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#errorMsgforEmptyValues");
                        _modal.style.display = "block";
                    }


                });
            }
        } else if (this.props.selectedMenuForOperation === "modifyCat") {
            let category = this.selectedCategory;
            let newItCategory = this.selectednewITCategory;
            if (category && category !== "Select Category" && newItCategory && newItCategory !== "Select Category") {
                AuthService.dataDictionaryUpdateCategory(category,this.guidNo,newItCategory).then(data => {
                    if (data.data.status === SUCCESS_CODE) {
                        let modal = document.querySelector("#CategoryOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#successCategoryOperation");
                        _modal.style.display = "block";
                        this.props.updateDataDictionaryITCategoryView();
                        this.props.updateDataDictionaryTeamView();
                        this.props.updateITKeyword( this.selectedCategory,this.guidNo);
                        if (document.querySelector("#catFormAdd")) {
                            document.querySelector("#catFormAdd").reset();
                        }
                      
                    } else {
                        let modal = document.querySelector("#CategoryOperation");
                        modal.style.display = "none";
                        let _modal = document.querySelector("#errorMsgforEmptyValues");
                        _modal.style.display = "block";
                    }

                });
            }
        } else {
            let modal = document.querySelector("#CategoryOperation");
            modal.style.display = "none";
            let _modal = document.querySelector("#errorMsgforEmptyValues");
            _modal.style.display = "block";
        }

    }
    closeCategoryOperationModal = () => {
        let modal = document.querySelector("#CategoryOperation");
        modal.style.display = "none";
        if (document.querySelector("#catFormAdd")) {
            document.querySelector("#catFormAdd").reset();
        }
        if (document.querySelector("#keyFormModify")) {
            document.querySelector("#keyFormModify").reset();
        }

    }
    closeSuccessCategoryOperation = () => {
        let modal = document.querySelector("#successCategoryOperation");
        modal.style.display = "none";
        if (document.querySelector("#catFormAdd")) {
            document.querySelector("#catFormAdd").reset();
        }
        if (document.querySelector("#keyFormModify")) {
            document.querySelector("#keyFormModify").reset();
        }

    }

    render() {
        let arrayOfData = this.props.itCatList;
        let optionsforITCategory = arrayOfData.map((data) =>
            <option>
                {data.category}
            </option>
        );
        let arrayOfData2 = this.props.itCatList;
        let optionsforITNewCategory = arrayOfData2.map((data) =>
            <option>
                {data.category}
            </option>
        );
        return (
            <>
                {this.props.selectedMenuForOperation === "addCat" ?
                    <>
                        <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                            <h6 className="h6 a-pb-10">Provide the new IT category details for the data dictionary:</h6>
                            <div className="addKey">
                                <form id="catFormAdd">

                                    <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                        <label className="a-input-label col-md-3">New IT Category:<span>*</span></label>
                                        <div className="a-input-container d-flex">
                                            <input className="a-text-input" type="text" id="dictionaryKeyword" ref={(c) => this.newItCategory = c} />
                                        </div>
                                    </div>

                                    <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                                        <label className="a-input-label col-md-3">Keyword:<span>*</span></label>
                                        <div className="a-input-container d-flex">
                                            <input className="a-text-input" type="text" id="dictionaryKeyword" ref={(c) => this.newDictionaryKeyword = c} />
                                        </div>
                                    </div>

                                </form>

                            </div>

                            <div className="d-flex justify-content-center gutter-wrapper">
                                <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Add" onClick={this.handleCategoryAddition} />
                            </div>
                        </div>




                    </> : this.props.selectedMenuForOperation === "deleteCat" ?
                        <>
                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">

                                <h6 className="h6 a-pb-10">Provide the IT category details which needs to be deleted from the data dictionary:</h6>
                                <div className="addKey">
                                    <form id="catFormAdd">

                                        <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                                            <label className="a-input-label col-md-3">IT Category:<span>*</span></label>
                                            <div className="a-input-container d-flex">
                                                <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectCategory(e)} id="catList" name="catList">
                                                    <option>Select Category</option>
                                                    {optionsforITCategory}
                                                </select>
                                            </div>
                                        </div>


                                    </form>
                                </div>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input type="button" value="Delete" className="a-btn a-btn-primary a-btn-lg" onClick={this.handleCategoryDeleteOperation} />
                                </div>


                            </div>


                        </> : this.props.selectedMenuForOperation === "modifyCat" ?
                            <>

                                <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                    <h6 className="h6 a-pb-10">Provide the IT Category details which needs to be updated in the data dictionary:</h6>
                                    <div className="addKey2">
                                        <form id="keyFormModify">




                                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-4">
                                                <label className="a-input-label col-md-3">IT Category:<span>*</span></label>
                                                <div className="a-input-container d-flex">
                                                    <select className="a-text-input KeyAddDropDown" onChange={(e) => this.selectCategory(e)} id="catList" name="catList">
                                                        <option>Select Category</option>
                                                        {optionsforITCategory}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                                                <label className="a-input-label col-md-3">New IT Category:<span>*</span></label>
                                                <div className="a-input-container d-flex">
                                                    <select className="a-text-input  KeyAddDropDown" onChange={(e) => this.selectNewITCategory(e)} id="selKey" name="selKey">
                                                        <option>Select Category</option>
                                                        {optionsforITNewCategory}
                                                    </select>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="d-flex justify-content-center gutter-wrapper">
                                        <input type="button" value="Modify" className="a-btn a-btn-primary a-btn-lg" onClick={this.handleCategoryUpdate} />
                                    </div>

                                </div>

                            </> : <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">

                                <h6 class="h6">Note: You will only be able to view/edit the data dictionary of your team. When making widespread updates, please replace the entire data dictionary. However, when making one-off changes to keywords or IT categories, please use the 'Keyword Operation' and 'Category Operation' sections</h6>

                            </div>}

                {/* Modals */}

                <div id="errorMsgforEmptyValues" className="modal">
                    <div className="modal-content">
                        <h4 className="error">ERROR</h4>
                        {this.props.selectedMenuForOperation === "addCat" ?
                            <>
                                <p>The category could not be added because of one of the following reasons:</p>
                                <ol>
                                    <li>New IT Category/Keyword field is empty</li>
                                    <li>IT Category/Keyword with the same name is available in the existing data dictionary</li>
                                </ol>
                            </> : null}

                        {this.props.selectedMenuForOperation === "deleteCat" ?
                            <>
                                <p>The category could not be deleted because of one of the following reasons:</p>
                                <ol>
                                    <li>IT Category field is empty</li>
                                    <li>IT Category with the same name is unavailable in the existing data dictionary</li>
                                </ol>

                            </> : null}

                        {this.props.selectedMenuForOperation === "modifyCat" ?
                            <>
                                <p>The category could not be updated because of the reason referenced below:</p>
                                <ol><li>IT Category and New IT Category can not be the same</li></ol>
                            </> : null}

                        <div className="d-flex justify-content-center gutter-wrapper">
                            <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeErrorMsgforEmptyValues} />
                        </div>

                    </div>

                </div>

                <div id="CategoryOperation" className="modal">
                    <div className="modal-content">
                        {this.props.selectedMenuForOperation === "addCat" ?
                            <>
                                <p>Are you sure you want to add the category to the existing data dictionary?</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showsuccessCategoryOperation} />
                                    <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeCategoryOperationModal} />
                                </div>
                            </> : null}

                        {this.props.selectedMenuForOperation === "deleteCat" ?
                            <>
                                <p>Are you sure you want to delete the category to the existing data dictionary?</p>
                                <p clsss="error">Deleting the category will delete all the keywords under this IT Category</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showsuccessCategoryOperation} />
                                    <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeCategoryOperationModal} />
                                </div>
                            </> : null}

                        {this.props.selectedMenuForOperation === "modifyCat" ?
                            <>
                                <p>Are you sure you want to update the category to the existing data dictionary?</p>
                                <p clsss="error">Updating the category will move all the keywords under the existing IT category to the new category</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="Yes" onClick={this.showsuccessCategoryOperation} />
                                    <input className="a-btn a-btn-primary a-btn-lg a-btn-gray" type="button" value="No" onClick={this.closeCategoryOperationModal} />
                                </div>
                            </> : null}
                    </div>

                </div>

                <div id="successCategoryOperation" className="modal">
                    <div className="modal-content">
                        {this.props.selectedMenuForOperation === "addCat" ?
                            <>
                                <p>The category has been updated successfully.</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessCategoryOperation} />
                                </div>
                            </> : null}
                        {this.props.selectedMenuForOperation === "deleteCat" ?
                            <>
                                <p>The category has been deleted successfully.</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessCategoryOperation} />
                                </div>
                            </> : null}

                        {this.props.selectedMenuForOperation === "modifyCat" ?
                            <>
                                <p>The category has been updated successfully. All keywords are moved under the new category.</p>
                                <div className="d-flex justify-content-center gutter-wrapper">
                                    <input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeSuccessCategoryOperation} />
                                </div>
                            </> : null}
                    </div>

                </div>

            </>
        );
    }
}