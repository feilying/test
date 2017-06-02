import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import VueResource from 'vue-resource'
import { MessageBox, Toast } from 'mint-ui'
Vue.use(Vuex);
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    search: {
      isSearchCar: false,
      searchData:[]
    },
    sent: {
      page: '',
      popupVisible: false,
      maskType: '',
      //sentData: { name:'lancy', phone:'13204235555', companyname: '北京世达行汽车销售公司', remarks: '', exterior: 2, interior: 1, offer: 2, price: 50},
      sentData: {},
      outsidecolorData: { title: '外观', type: 'outsidecolor', length: 11, data: [
        {'color': '#000', 'txt': '黑色'}, {'color': '#fff', 'txt': '白色'},{'color': '#dcd9d9', 'txt': '银色'}, {'color': '#f00', 'txt': '红色'},
        {'color': '#dba513', 'txt': '金色'}, {'color': '#b4b4b3', 'txt': '灰色'},{'color': '#4f3210', 'txt': '棕色'}, {'color': '#7f5523', 'txt': '咖色'},
        {'color': '#0432fb', 'txt': '蓝色'}, {'color': '#fb6d04', 'txt': '橙色'},{'color': '#44fb04', 'txt': '绿色'}
      ]},
      carcolorData: { title: '内饰', type: 'carcolor', length: 6, data: [
        {'color': '#000', 'txt': '黑色'}, {'color': '#ebe5d2', 'txt': '米色'},{'color': '#4f3210', 'txt': '棕色'}, {'color': '#b4b4b3', 'txt': '灰色'}, 
        {'color': '#f00', 'txt': '红色'}, {'color': '#fb6d04', 'txt': '橙色'}
      ]},
      quotationtypeData: { title: '报价方式', type: 'quotationtype', length: 4, data: [{'txt': '最终金额'}, {'txt': '最终点数'},{'txt': '直接报价'}, {'txt': '加价金额'}]}
    },
    list: {
      page: 'tel',
      isLoading: false,
      listData : []
    }
  },
  getters: {
    sent: state=>state.sent,
    list: state=>state.list,
    search: state=>state.search
  },
  mutations: {
    INIT_SENT(state, data) {
      state.notes = data.notes,
      state.show = data.show;
      state.activeNote = data.activeNote;
    }
  },
  actions: {
    getSearch ({dispatch,state}, keyword) {
      Vue.http.jsonp('http://10.144.34.9:8082/pigeon/info/Car/carSearch/query',{ 
        params: {
          keyword:keyword
        },
        jsonp:'callback'
      }).then(function(res){
          var data = res.body
          if(data.s.length > 0 || data.csor != 0){
            state.search.isSearchCar = false
            state.search.searchData = data.s
          }else{
            state.search.isSearchCar = true
          }
        },function(){
          state.search.isSearchCar = false
          state.search.searchData = []
        })
    },
    getList ({dispatch,state}, keyword) {
      Vue.http.jsonp('http://10.144.34.9:8082/pigeon/info/Car/carSearch/querySource',{ 
        params: {
          keyword:keyword
        },
        jsonp:'callback'
      }).then(function(res){
          console.log(999)
        },function(){
          state.search.isSearchCar = false
          state.search.searchData = []
        })
    },
    clear ({dispatch,state}, keyword) {
      state.search.isSearchCar = false
      state.search.searchData = []
    },
    maskShow ({dispatch,state}, param) {
      state.sent.popupVisible = true
      state.sent.maskType = param
      state.sent[param + 'Show'] = true
    },
    itemClick ({dispatch,state}, param) {
      if(param.choose){
        state.sent.sentData[state.sent.maskType] = param.index
      }
      console.log(state.sent.sentData)
      state.sent.popupVisible = false
      state.sent[state.sent.maskType + 'Show'] = false
    },
    loadMore ({dispatch,state}) {
      state.list.isLoading = true
      setTimeout(() => {
        let last = state.list.listData[state.list.listData.length - 1]
        for (let i = 1; i <= 10; i++) {
          state.list.listData.push(last + i)
        }
        state.list.isLoading = false;
      }, 2500)
    },
    openPrompt ({dispatch,state}, param) {
      MessageBox.confirm('确定要删除该条信息么', '').then(
        /* 删除 */
        action => {
          Toast('删除成功')
        },
        /* 取消删除 */
        action => {
          Toast('取消删除')
        }
      )
    },
    jumpOut ({dispatch,state}, param) {
      state[param.name].page = param.type
      if(param.name == 'sent'){
        state.sent.sentData.carinfo = param.carinfo
        state.sent.sentData.finalprice = param.finalprice
      }
      if(state.search.searchData.length>0) {
        state.search.searchData = []
      }
      router.push({ name: param.name})
      console.log(state.sent.sentData)
    },
    submit ({dispatch,state}, type) {
      if(!state.sent.page){
        return
      }
      Vue.http.post('http://10.144.34.9:8082/pigeon/info/CarSource/release',{ 
        params: state.sent.sentData,
        jsonp:'cb'
      }).then(function(res){
          if(res){
            router.push({ name: 'search' })
          }else{
            Toast(state.sent.page == 'sent' ? '发布失败' : '保存失败')
          }
        })
    }
  }
});

export default store