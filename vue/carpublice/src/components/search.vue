<template>
  <div class="csearch">
    <div class="search-area">
      <span class="icon-rearch"></span>
      <span class="icon-close2" v-show="t1" v-on:click="clear()"></span>
      <input class="search-ipt" type="text" v-model="t1" @keyup="getSearch()"/>
      <div class="search-panel">
        <a class="search-a" v-for="vItem in search.searchData" 
          v-on:click="jumpOut({name: 'sent', type: 'new', logo: '', carinfo: vItem.carinfo, finalprice: vItem.ZDJG})" 
          v-html="vItem.carinfo"></a>
      </div> 
    </div>
    <div class="nocar">
      <span v-show="search.isSearchCar">— 抱歉！没有找到你要的车型T_T —</span>
    </div>
    <a class="mycar" v-on:click="jumpOut({name: 'list', params: {listId: 'all'}, type: 'edit'})">
      <span class="icon-car"></span>我的车源
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      t1: ''
    }
  },
  computed: {
    ...mapGetters(['search'])
  },
  methods:{
    getSearch:function(){
      this.$store.dispatch('getSearch', this.t1)
    },
    clear:function(){
      this.t1 = ''
      this.$store.dispatch('clear')
    },
    jumpOut (param) {
      this.$store.dispatch('jumpOut', param)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel="stylesheet/stylus">
  .csearch
    .nocar
      text-align: center
      margin-top: 80px
      color: #a5a5a5
    .mycar
      display: block
      margin: 15px auto 0
      padding-left: 10px
      max-width: 95px
      height: 30px
      line-height: 30px
      border: 1px solid #3964d5
      border-radius: 4px
      color: #3964d5
      text-decoration: none
      .icon-car
        margin-right: 5px
</style>
