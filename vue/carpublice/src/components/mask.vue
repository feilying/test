<template>
  <div class="mask-bottom">
    <div class="picker-tit">
      <span class="close icon-close" v-on:click="itemClick({choose: false})"></span>
      <span>{{ maskData.title }}{{$store.state.sent.sentData[maskData.type]}}{{maskData.type}}</span>
    </div>
    <div class="mask-bottom-con">
      <ul ref="wrapper" class="mask-bottom-wrapper">
        <li class="picker-item" v-for="(item, index) in maskData.data" v-on:click="itemClick({choose: true, index: index})">
          <label>
            <i class="color" :style="{background:item.color}" v-show="item.color"></i>{{item.txt}}
          </label>
          <span class="icon-right" v-show="$store.state.sent.sentData[maskData.type] == index"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'mask-bottom',
    props: {
      maskData: {
        type: Object
      }
    },
    methods: {
      itemClick (param) {
        this.$store.dispatch('itemClick', param);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel="stylesheet/stylus">
.mask-bottom
  position: fixed
  bottom:0
  width: 100%
  max-height: 100%
  background: #fff
  font-size: 18px
  overflow: hidden
  .picker-tit
    position: relative
    width: 100%
    height: 45px
    line-height: 45px
    text-align: center
    border-radius: 10px 10px 0 0
    background: #fff
    font-size: 20px
    color: #333
    .close
      position: absolute
      left: 10px
      top: 12px
  .mask-bottom-con
    width: 100%
    max-height: 300px
    overflow: hidden
    overflow-y: auto
    .picker-item
      position: relative
      padding: 0 10px
      width: 100%
      height: 40px
      line-height: 40px
      color: #888
      text-align: center
      border-top: 1px solid #e6e6e6
      box-sizing: border-box
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
      &.picker-selected
        color: #f00
      .icon-right
        position: absolute
        right: 20px
        top: 10px
      .color
        display: inline-block
        margin-right: 10px
        width:16px
        height: 16px
        border-radius: 50%
        border: 1px solid #f2f2f2
</style>
