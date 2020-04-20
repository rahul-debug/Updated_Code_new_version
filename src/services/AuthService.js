
/**
 * Auth Service
 */
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const AuthService = {
  login: function (guid) {
    return axios.post('/userdetails/', { guid: guid });
  },
  registration:function(user_name,guid,email,team){
    return axios.post('/Registration/', { user_name: user_name, guid: guid, email: email, team: team });
  },

  // Post Callls --------------------------------------------
  dataDictionaryTeamView: function (guid) {
    return axios.post('/dataDictionary/DataDictionaryTeamView/', { guid: guid });
  },
  processValidation: function (guid, vdrLocation, drlLocation, keyword, email) {
    return axios.post('/process_validation/', { guid: guid, vdrLocation: vdrLocation, drlLocation: drlLocation, keyword: keyword, email: email });
  },
  processVDR: function (data) {
    return axios.post('/ProcessVdr/', { guid: data.guid, vdrLocation: data.vdrLocation, drlLocation: data.drlLocation, keyword: data.keyword, email: data.email });
  },
  viewAdminProcessTeamDetails:function(team){
    return axios.post('/adminprocess/teamDetails/',{team:team});
  },
  deleteAdmin: function (email) {
    return axios.post('/adminprocess/deleteAdmin/', { email: email });
  },
  addAdmin:function(user_name,guid,email,team){
    return axios.post('/adminprocess/addAdmin/', { user_name:user_name, guid:guid, email: email, team:team });
  },
  dataDictionaryITCategoryView:function(guid){
    return axios.post('/dataDictionary/DataDictionaryITCategoryView/', { guid: guid });
  },
  dataDictionaryITKeywordView:function(category, guid){
    return axios.post('/dataDictionary/DataDictionaryITKeywordView/', { category: category , guid: guid });
  },
  dataDictionaryTeamView:function(guid){
    return axios.post('/dataDictionary/DataDictionaryTeamView/', { guid: guid });
  },
  dataDictionaryUpload:function(path,guid){
    return axios.post('/dataDictionary/DataDictionaryUpload/', { path:path, guid: guid });
  },
  dataDictionaryAddITCategoryKeyword:function(category,keyword,guid){
    return axios.post('/dataDictionary/DataDictionaryAddITCategoryKeyword/', { category:category, keyword:keyword, guid: guid });
  },
  dataDictionaryDelete:function(category,keyword,guid){
    return axios.post('/dataDictionary/DataDictionaryDelete/', { category:category, keyword:keyword, guid: guid });
  },
  dataDictionaryUpdateKeyword:function(category,keyword,guid,newCategory,newKeyword){
    return axios.post('/dataDictionary/DataDictionaryUpdateKeyword/', { category:category, keyword:keyword, guid: guid, newCategory:newCategory, newKeyword:newKeyword });
  },
  dataDictionaryDeleteCategory:function(category,guid){
    return axios.post('/dataDictionary/DataDictionaryDeleteCategory/', { category:category, guid: guid });
  },
  dataDictionaryUpdateCategory:function(category,guid,newCategory){
    return axios.post('/dataDictionary/DataDictionaryUpdateCategory/', { category:category, guid: guid, newCategory:newCategory });
  },
  addTeamDetails:function(team,guid){
    return axios.post('/adminTeam/addTeamDetails/', {team:team, guid:guid});
  },
  deleteTeamDetails:function(team,guid){
    return axios.post('/adminTeam/deleteTeamDetails/', {team:team,guid:guid});
  },  
  // GET CALLS -------------------------------------


  getTeamList:function(){
    return axios.get('/adminTeam/teamDetailsView/');
  },
  getDeleteTeamDetailsView:function(){
    return axios.get('/adminTeam/deleteTeamDetailsView/');
  },  
  getTeamDetailsView : function(){
    return axios.get('/adminTeam/addTeamDetailsView/');
  },
  getadditionalDataDictonaryList:function(){
    return axios.get('/additinalKeyword/additionalDataDictonaryList/');
  },  
  getAdminList: function (guid) {
    return axios.post('/adminprocess/deleteAdminView/', { guid: guid });
  },
  getAdminProcessTeamDetailsList: function () {
    return axios.get('/adminprocess/teamDetails');
  },
  
}

export default AuthService
