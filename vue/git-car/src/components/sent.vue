<template>
  <div class="csent" v-show="sent.page">
    <ul class="s-wrapper">
      <li class="mod-item">
        <div class="mod-con">
          <div class="mod-carinfo">
            <div class="pic"><img src="//gfs2.gomein.net.cn/T1.AZTB5Cv1RCvBVdK_160.jpg" width="100" height="80"/></div>
            <div class="txt">
              <h3 class="name" v-html="sent.sentData.carinfo"></h3>
              <div class="price"><span class="price-end">最终价:{{sent.sentData.finalprice}}万</span></div>
              <span></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="s-wrapper">
      <li class="s-ipt" v-on:click="maskShow('outsidecolor')">
        <label class="s-label"><span class="s-tit">外饰</span>
          <span class="s-val" v-if="sent.outsidecolorData.data[sent.sentData.outsidecolor]">
            <i class="color" :style="{background:sent.outsidecolorData.data[sent.sentData.outsidecolor].color}"></i>
            {{sent.outsidecolorData.data[sent.sentData.outsidecolor].txt}}
          </span>
        </label>
        <i class="arrow"></i>
      </li>
      <li class="s-ipt" v-on:click="maskShow('carcolor')">
        <label class="s-label">
          <span class="s-tit">内饰</span>
          <span class="s-val" v-if="sent.carcolorData.data[sent.sentData.carcolor]">
            <i class="color" :style="{background:sent.carcolorData.data[sent.sentData.carcolor].color}"></i>
            {{sent.carcolorData.data[sent.sentData.carcolor].txt}}
          </span>
        </label>
        <i class="arrow"></i>
      </li>
    </ul>
    <ul class="s-wrapper">
      <li class="s-ipt" v-on:click="maskShow('quotationtype')">
        <label class="s-label">
          <span class="s-tit">报价方式</span>
          <span class="s-val" v-if="sent.quotationtypeData.data[sent.sentData.quotationtype]">
            {{sent.quotationtypeData.data[sent.sentData.quotationtype].txt}}
          </span>
        </label>
        <i class="arrow"></i>
      </li>
      <li class="s-ipt">
        <label class="s-label"><span class="s-tit">价格</span>
          <input type="number" name="price" v-if="sent.page != 'info'" />
          <span class="s-val" v-if="sent.sentData.price">{{sent.sentData.price}}</span>
        </label>
        <span class="unit" v-show="sent.sentData.quotationtype != 1">万</span>
        <span class="unit" v-show="sent.sentData.quotationtype == 1">点</span>
      </li>
    </ul>
    <ul class="s-wrapper">
      <li class="s-ipt">
        <label class="s-label">
          <span class="s-tit">联系人</span><input type="text" name="username" v-if="sent.page != 'info'" />
          <span class="s-val" v-if="sent.sentData.username">{{sent.sentData.username}}</span>
        </label>
      </li>
      <li class="s-ipt">
        <label class="s-label">
          <span class="s-tit">联系电话</span><input type="tel" name="phone" v-if="sent.page != 'info'" />
          <span class="s-val" v-if="sent.sentData.phone">{{sent.sentData.phone}}</span>
        </label>
      </li>
      <li class="s-ipt">
        <label class="s-label">
          <span class="s-tit">公司名称{{sent.page != 'info'}}</span><input type="text" name="company" v-if="sent.page != 'info'" />
          <span class="s-val" v-if="sent.sentData.company">{{sent.sentData.company}}</span>
        </label>
      </li>
      <li class="s-ipt">
        <label class="s-label">
          <span class="s-tit">备注</span><input type="text" name="remark" v-if="sent.page != 'info'" />
          <span class="s-val" v-if="sent.sentData.remark">{{sent.sentData.remark}}</span>
        </label>
      </li>
    </ul>
    <div class="s-submit">
      <a href="javascript:;" class="submit" v-on:click="submit('new')" v-show="sent.page == 'new'">发布</a>
      <a href="javascript:;" class="submit" v-on:click="submit('edit')" v-show="sent.page == 'edit'">保存</a>
      <span v-show="sent.page == 'info'">-2017.05.03-</span>
    </div>
    <div class="popup-mask" v-show="sent.popupVisible">
      <maskpopup :maskData="sent.outsidecolorData" v-show="sent.outsidecolorShow"></maskpopup>
      <maskpopup :maskData="sent.carcolorData" v-show="sent.carcolorShow"></maskpopup>
      <maskpopup :maskData="sent.quotationtypeData" v-show="sent.quotationtypeShow"></maskpopup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import mask from './mask.vue'
export default {
  components: {
    'maskpopup': mask
  },
  computed: {
    ...mapGetters(['sent'])
  },
  methods: {
    maskShow (param) {
      this.$store.dispatch('maskShow', param)
    },
    submit (type) {
      this.$store.dispatch('submit', type)
    }
  }
};
</script>   

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel="stylesheet/stylus">
.csent
  padding-bottom:30px
  width: 100%
  height: 100%
  background: #eee
  .s-wrapper
    width: 100%
    margin-bottom: 10px
    background: #fff
    overflow: hidden
    .mod-item
      .mod-carinfo
        .txt
          .name
            height: 50px
    .s-ipt
      height: 30px
      line-height: 30px
      padding: 10px 0
    .unit
      color: #a5a5a5
    .s-ipt
      display: flex
      position: relative
      margin-left: 15px
      padding-right: 15px
      border-bottom: 1px solid #e6e6e6
      &:last-child
        border-bottom: none
      .s-label
        display: flex
        flex: 1
        font-size: 18px
        .s-tit
          display: block
          padding-right: 10px
          width: auto
        .s-val, input
          flex: 1
          padding: 0 5px
          color: #333
          text-align: right
          font-size: 16px
          border: none
          color: #a5a5a5
          &:focus
            outline: #fff auto 0
            text-align: left
          .color
            display: inline-block
            margin-right: 10px
            width:16px
            height: 16px
            border-radius: 50%
            border: 1px solid #f2f2f2
      .unit
        display: block
        width: auto
        font-size: 18px
      .arrow
        width: 10px
        &:after
          border: solid 2px #c8c8cd
          border-bottom-width: 0
          border-left-width: 0
          content: " "
          top: 26px
          right: 15px
          position: absolute
          width: 7px
          height: 7px
          -webkit-transform: translateY(-50%) rotate(45deg)
          transform: translateY(-50%) rotate(45deg)
  .s-submit
    margin-top: 20px
    text-align: center
    .submit
      display: block
      margin: 0 auto
      width: 80%
      height: 50px
      line-height: 50px
      background: #3964d5
      text-align: center
      border-radius: 5px
      color: #fff
      text-decoration: none
    span
      font-size: 14px
      color: #666
  .popup-mask
    position: fixed
    bottom: 0
    z-index: 2000
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .5)
</style>
