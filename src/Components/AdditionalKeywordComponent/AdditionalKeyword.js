import React from 'react';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE } from '../../config';
export default class AdditionalKeyword extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         additionalKeyword: [],
         noKeywordFound: "",
      }
   }
   componentDidMount() {

      AuthService.getadditionalDataDictonaryList().then(res => {
         if (res.data.status === SUCCESS_CODE) {
            const keyList = res.data.data;
            this.setState({ additionalKeyword: keyList });
         } else {
            this.setState({ noKeywordFound: res.data.message })
         }
      });
   }
   render() {

      const columns = [
         {
            label: 'Serial #',
            field: 'id',
            sort: 'asc'
         },
         {
            label: 'Keyword',
            field: 'keyword'

         },
         {
            label: 'Frequency',
            field: 'frequency'
         }
      ];


      return (
         <>

            {this.state.additionalKeyword.length ?
               <div id="keywordTable">
                  <div className="a-panel a-p-20">
                     <h6 className="h6 a-pb-10">Additional keywords searched by the users when processing files:</h6>
                     <MDBTable scrollY id="addKeyword" className="additionalTable">
                        <MDBTableHead columns={columns} />
                        <MDBTableBody>
                           {this.state.additionalKeyword.map(keyword =>
                              <tr>
                                 <td></td>
                                 <td>{keyword.keyword}</td>
                                 <td>{keyword.frequency}</td>

                              </tr>)}

                        </MDBTableBody>
                     </MDBTable>
                  </div>

               </div> : <h1 class="heading-keyword"> {this.state.noKeywordFound}</h1>}
            {/* <section id="footer-copyright">
                    <div className="row">
                        <div className="col-xs-12">
                            <p>© {(new Date().getFullYear())} PwC.All rights reserved.</p>
                        </div>
                    </div>
                </section> */}
         </>
      );
   }
}