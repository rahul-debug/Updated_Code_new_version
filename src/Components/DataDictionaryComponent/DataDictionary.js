import React from 'react';
import DataDictionaryPage from './DataDictionaryPage';
import KeywordOperation from './KeywordOperation';
import CategoryOperation from './CategoryOperation';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE } from '../../config';


export default class DataDictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "DataDictionary",
            selectedMenuForOperation: "",
            dataAvailable: '',
            dataList: [],
            itCatList: [],
            itKeyword: []
        }
        this.guidNo = sessionStorage.getItem("guidNo");
    }
    componentDidMount() {
        if (this.guidNo) {
            this.updateDataDictionaryITCategoryView();
            this.updateITKeyword();
            this.updateDataDictionaryTeamView();
        }
    }
    updateDataDictionaryITCategoryView = () => {
        AuthService.dataDictionaryITCategoryView(this.guidNo).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                this.setState({ itCatList: data.data.data });
            } else {
                console.log('errors');

            }
        });
    }
    updateDataDictionaryTeamView = () => {
        AuthService.dataDictionaryTeamView(this.guidNo).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                this.setState({ dataAvailable: true, dataList: data.data.data })
            } else {
                this.setState({ dataAvailable: false })

            }
        });
    }

    updateITKeyword = (category, guid) => {
        let guidNumber = guid ? guid : this.guidNo
        AuthService.dataDictionaryITKeywordView(category ? category : "none", guidNumber).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                this.setState({ itKeyword: data.data.data });
            } else {
                console.log('errors');
            }
        });
    }

    showDataDictionary = () => {
        this.setState({ view: "DataDictionary" })
        /*if (this.state.selectedMenuForOperation !== "") {
            this.setState({ selectedMenuForOperation: "" })
        }*/
    }
    showKeywordOperation = () => {
        this.setState({ view: "KeywordOperation" })
        /*if (this.state.selectedMenuForOperation !== "") {
            this.setState({ selectedMenuForOperation: "" })
        }*/

    }
    showCategoryOperation = () => {
        this.setState({ view: "CategoryOperation" })
        /*if (this.state.selectedMenuForOperation !== "") {
            this.setState({ selectedMenuForOperation: "" })
        }*/
    }
    showDataDictionaryMenu = () => {

    }

    showKeywordOperationMenu = () => {

    }
    showCategoryOperationMenu = () => {

    }

    clickchangeDD = () => {
        this.showDataDictionary();
        
        let textnode = document.createTextNode("Select items");
        let item = document.getElementById("keywordOperation").childNodes[0].childNodes[0];
        item.replaceChild(textnode, item.childNodes[0]);

        let textnode1 = document.createTextNode("Select items");
        let item1 = document.getElementById("categoryoperation").childNodes[0].childNodes[0];
        item1.replaceChild(textnode1, item1.childNodes[0]);

        document.querySelectorAll('#showKeywordDropdown .a-dropdown-item, #categoryoperation .a-dropdown-item')
            .forEach(function (el) {
                el.classList.remove('active');
            })
    }
    clickchangeKO = () => {
        this.showKeywordOperation();

        let textnode = document.createTextNode("Select items");
        let item = document.getElementById("dataDictionary").childNodes[0].childNodes[0];
        item.replaceChild(textnode, item.childNodes[0]);

        let textnode1 = document.createTextNode("Select items");
        let item1 = document.getElementById("categoryoperation").childNodes[0].childNodes[0];
        item1.replaceChild(textnode1, item1.childNodes[0]);

        document.querySelectorAll('#myDropdown .a-dropdown-item, #categoryoperation .a-dropdown-item')
            .forEach(function (el) {
                el.classList.remove('active');
            })
    }

    clickchangeCO = () => {
        this.showCategoryOperation();

        let textnode = document.createTextNode("Select items");
        let item = document.getElementById("dataDictionary").childNodes[0].childNodes[0];
        item.replaceChild(textnode, item.childNodes[0]);

        let textnode1 = document.createTextNode("Select items");
        let item1 = document.getElementById("keywordOperation").childNodes[0].childNodes[0];
        item1.replaceChild(textnode1, item1.childNodes[0]);

        document.querySelectorAll('#myDropdown .a-dropdown-item, #showKeywordDropdown .a-dropdown-item')
            .forEach(function (el) {
                el.classList.remove('active');
            })
    }


    setView = (a) => {
        this.setState({ selectedMenuForOperation: a });
    }







    render() {
        return (
            <div className="">
                <div class="a-pb-20">
                    <div class="row justify-content-center">
                        <div class="col-md-2">
                            <div class="a-form-label">Data Dictionary</div>
                            {/* <div class="a-dropdown viewAdmin showDropdown" id="dataDictionary" onClick={this.showDataDictionary}> */}
                            <div class="a-dropdown viewAdmin showDropdown" id="dataDictionary">
                                <button aria-expanded="false" class="a-dropdown-toggle dropbtn" role="button" tabindex="0" onClick={this.showDataDictionaryMenu} id="dataDic">
                                    <div class="a-choosen-text">Select items</div>
                                    <span class="a-icon appkiticon icon-down-chevron-fill"></span>
                                </button>
                                <div id="myDropdown" className="dropdown-content a-dropdown-menu">
                                    {/* <div class="a-dropdown-item"><a onClick={() => this.setView("view")}>View</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => this.setView("replaceAdd")}>Replace/Add</a></div> */}

                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("view"); this.clickchangeDD(); }}>View</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("replaceAdd"); this.clickchangeDD(); }}>Replace/Add</a></div>


                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="a-form-label">Keyword Operation</div>
                            {/* <div class="a-dropdown addAdmin showDropdown" onClick={this.showKeywordOperation} id="keywordOperation"> */}
                            <div class="a-dropdown addAdmin showDropdown" id="keywordOperation">
                                <button aria-expanded="false" class="a-dropdown-toggle dropbtn" role="button" tabindex="0" onClick={this.showKeywordOperationMenu} id="keyOpe">
                                    <div class="a-choosen-text">Select items</div>
                                    <span class="a-icon appkiticon icon-down-chevron-fill"></span>
                                </button>
                                <div class="dropdown-content a-dropdown-menu" id="showKeywordDropdown">
                                    {/* <div class="a-dropdown-item"><a onClick={() => this.setView("add")}>Add</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => this.setView("delete")}>Delete</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => this.setView("modify")}>Modify</a></div> */}
                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("add"); this.clickchangeKO(); }}>Add</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("delete"); this.clickchangeKO(); }}>Delete</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("modify"); this.clickchangeKO(); }}>Modify</a></div>
                                </div>


                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="a-form-label">IT Category Operation</div>
                            {/* <div class="a-dropdown deleteAdmin showDropdown" onClick={this.showCategoryOperation} id="categoryoperation"> */}
                            <div class="a-dropdown deleteAdmin showDropdown" id="categoryoperation">
                                <button aria-expanded="false" class="a-dropdown-toggle dropbtn" role="button" tabindex="0" onClick={this.showCategoryOperationMenu} id="categoryOpe">
                                    <div class="a-choosen-text">Select items</div>
                                    <span class="a-icon appkiticon icon-down-chevron-fill"></span>
                                </button>
                                <div class="dropdown-content a-dropdown-menu" id="showCatOpeDropdown">
                                    {/* <div class="a-dropdown-item"><a onClick={() => this.setView("addCat")}>Add</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => this.setView("deleteCat")}>Delete</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => this.setView("modifyCat")}>Modify</a></div> */}

                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("addCat"); this.clickchangeCO(); }}>Add</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("deleteCat"); this.clickchangeCO(); }}>Delete</a></div>
                                    <div class="a-dropdown-item"><a onClick={() => { this.setView("modifyCat"); this.clickchangeCO(); }}>Modify</a></div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                {this.state.view === "DataDictionary" ?
                    <DataDictionaryPage selectedMenuForOperation={this.state.selectedMenuForOperation} dataAvailable={this.state.dataAvailable} dataList={this.state.dataList} />
                    :
                    <React.Fragment>
                        {this.state.view === "KeywordOperation" ?
                            <KeywordOperation selectedMenuForOperation={this.state.selectedMenuForOperation} itCatList={this.state.itCatList} itKeyword={this.state.itKeyword} updateDataDictionaryTeamView={this.updateDataDictionaryTeamView} updateITKeyword={this.updateITKeyword} updateDataDictionaryITCategoryView={this.updateDataDictionaryITCategoryView} /> :
                            <React.Fragment>
                                {this.state.view === "CategoryOperation" ?
                                    <CategoryOperation selectedMenuForOperation={this.state.selectedMenuForOperation} itCatList={this.state.itCatList} updateDataDictionaryTeamView={this.updateDataDictionaryTeamView} updateDataDictionaryITCategoryView={this.updateDataDictionaryITCategoryView} updateITKeyword={this.updateITKeyword} />
                                    : null} </React.Fragment>}
                    </React.Fragment>
                }

            </div>
        );
    }
}