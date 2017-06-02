<template>
  <div class="clist" v-show="list.page">
    <div class="search-area" v-show="list.page == 'tel'">
      <span class="icon-rearch"></span>
      <span class="icon-close2" v-show="t1" v-on:click="clear()"></span>
      <input class="search-ipt" type="search" v-model="t1" v-on:click="getList()"/>
    </div>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li class="mod-item" v-for="item in list.listData">
          <div class="mod-con">
            <div class="mod-carinfo" v-on:click="jumpOut({name: 'sent', type: 'info', infoId: '111'})">
              <div class="pic"><img src="//gfs2.gomein.net.cn/T1.AZTB5Cv1RCvBVdK_160.jpg" width="100" height="80"/></div>
              <div class="txt">
                <h3 class="name">奥迪A4L双离合2016款</h3>
                <div class="desc">2017/5/19 | 黑棕内饰 | 黑棕外饰</div>
                <div class="price">
                  <span class="price-end">最终价:15万</span>
                  <span class="price-first">指导价:15万</span>
                </div>
              </div>
            </div>
            <a class="phone icon-phone" v-show="list.page == 'tel'" href="tel:18210079558"></a>
          </div>
          <div class="l-info page-msgbox-wrapper" v-show="list.page == 'edit'">
            <div class="btn">
              <a href="javascript:;" v-on:click="jumpOut({name: 'sent', params: {sentId: '1111'}, type: 'edit', infoId: '111'})">编辑</a>
              <a href="javascript:;" v-on:click="openPrompt">删除</a>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="list.isLoading" class="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      allLoaded: false,
      wrapperHeight: 0,
      t1: ''
    }
  },
  computed: {
    ...mapGetters(['list'])
  },
  methods: {
    loadMore () {
      this.$store.dispatch('loadMore')
    },
    openPrompt () {
      this.$store.dispatch('openPrompt')
    },
    jumpOut (param) {
      this.$store.dispatch('jumpOut', param)
    },
    clear:function(){
      this.t1 = ''
      this.$store.dispatch('clear')
    },
    getList:function(){
      this.$store.dispatch('getList', this.t1)
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    for (let i = 1; i <= 20; i++) {
      this.$store.state.list.listData.push(i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel="stylesheet/stylus">
  .clist
    .mod-item
      .l-info
        margin: 0 15px
        padding: 10px 0
        height: 30px
        line-height: 30px
        border-top: 1px solid #eee
        color: #717171
        font-size: 14px
        .btn
          float: right
          &>a
            display: inline-block
            height: 24px
            line-height: 24px
            padding: 0 11px
            background: #eee
            border-radius: 13px
            text-decoration: none
            color: #333
  .loading
    text-align: center
    height: 50px
    line-height: 50px
    div
      display: inline-block
      vertical-align: middle
      margin-right: 5px
</style>
