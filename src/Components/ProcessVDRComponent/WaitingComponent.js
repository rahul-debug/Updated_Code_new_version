import React from 'react';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';

export default class WaitingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            showCompletion: false,
            isError: false
        }
        this.callApi = this.callApi.bind(this);
    }
    callApi = () => {
        let obj = this.props.location.state.dataObject;
        let GUID = sessionStorage.getItem("guidNo");
        obj.guid = GUID;
        AuthService.processVDR(obj).then(data => {
            if (data.data.status === SUCCESS_CODE) {
                this.setState({ showCompletion: true })
            } else {
                this.setState({ isError: true, isSuccess: false })
            }
        });
    }
    processing = () => {
        this.setState({
            isSuccess: true,
        });
        if (this.state.isSuccess) {
            this.callApi();
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.processing()
        }, 6000);
    }

    handlePageRefresh = () => {
        this.props.history.push("/");
    }

    render() {

        return (
            <>
                {this.state.showCompletion ?
                    <React.Fragment>
                        <div class="a-header a-hfn-header-container d-flex align-items-center justify-content-between a-px-20">
                            <div class="d-flex align-items-center">
                                <div class="a-pwc-logo-grid a-md"></div>
                                <span class="divider a-mx-20"></span>
                                <div class="font-weight-medium a-nowrap logo" onClick={this.handlePageRefresh}>Data Room Sweeper Tool</div>
                                <span class="divider a-mx-20"></span>
                            </div>
                            <div class="d-flex align-items-center a-pl-10 userlogin">
                                <span>Hi, {this.props.location.state.userName}</span>
                            </div>
                        </div>
                        <div class="a-template-content">
                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                <h4>Congratulations! VDR Processing is completed</h4>
                                <p>Please check your email for the output.</p>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {this.state.isSuccess ?
                            <React.Fragment>

                                <div class="a-header a-hfn-header-container d-flex align-items-center justify-content-between a-px-20">
                                    <div class="d-flex align-items-center">
                                        <div class="a-pwc-logo-grid a-md"></div>
                                        <span class="divider a-mx-20"></span>
                                        <div class="font-weight-medium a-nowrap logo" onClick={this.handlePageRefresh}>Data Room Sweeper Tool</div>
                                        <span class="divider a-mx-20"></span>
                                    </div>
                                    <div class="d-flex align-items-center a-pl-10 userlogin">
                                        <span>Hi, {this.props.location.state.userName}</span>
                                    </div>
                                </div>


                                <div class="a-template-content">
                                    <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                        <h4>The files are getting processed right now. It might take a while.</h4>
                                        <p>The files are getting processed right now. It might take a while. The output file will be sent to the recipient(s) after processing is completed. You can wait for the completion message or close the browser.</p>
                                    </div>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {this.state.isError && !this.state.isSuccess ?
                                    <React.Fragment>

                                        <div class="a-header a-hfn-header-container d-flex align-items-center justify-content-between a-px-20">
                                            <div class="d-flex align-items-center">
                                                <div class="a-pwc-logo-grid a-md"></div>
                                                <span class="divider a-mx-20"></span>
                                                <div class="font-weight-medium a-nowrap logo" onClick={this.handlePageRefresh}>Data Room Sweeper Tool</div>
                                                <span class="divider a-mx-20"></span>
                                            </div>
                                            <div class="d-flex align-items-center a-pl-10 userlogin">
                                                <span>Hi, {this.props.location.state.userName}</span>
                                            </div>
                                        </div>


                                        <div class="a-template-content">
                                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                                <h4>Error! VDR could not be processed because of technical reasons.</h4>
                                                <p>Please restart the process. In case the problem persists, please reach out to our admin team through <u>data.room.sweeper@pwc.com.</u></p>
                                            </div>
                                        </div>
                                    </React.Fragment>

                                    :
                                    <React.Fragment>
                                        <div class="a-header a-hfn-header-container d-flex align-items-center justify-content-between a-px-20">
                                            <div class="d-flex align-items-center">
                                                <div class="a-pwc-logo-grid a-md"></div>
                                                <span class="divider a-mx-20"></span>
                                                <div class="font-weight-medium a-nowrap logo" onClick={this.handlePageRefresh}>Data Room Sweeper Tool</div>
                                                <span class="divider a-mx-20"></span>
                                            </div>
                                            <div class="d-flex align-items-center a-pl-10 userlogin">
                                                <span>Hi, {this.props.location.state.userName}</span>
                                            </div>
                                        </div>
                                        <div class="a-template-content">
                                            <div class="a-bg-light a-p-20 col-md-8 offset-md-2 form-block">
                                                <h4>Please Wait...</h4>
                                            </div>
                                        </div>
                                    </React.Fragment>}
                            </React.Fragment>
                        }
                    </React.Fragment>}
            </>
        );
    }
}