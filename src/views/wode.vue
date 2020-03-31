<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">我的</div>
        <!--<div class="rightcss" @click="tianjia()">
          <img style="width: 0.5rem;" src="@/styles/img/tianjia.png"/>
        </div>-->
    </header>
    
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content" style="text-align: center;">
          <tag size="large" shape="fillet" type="fill" fill-color="#FC9153" font-weight="normal" font-color="#fff">{{shoujihao}}</tag>
          <tag size="large" shape="fillet" type="fill" fill-color="#91C6EF" font-weight="bolder" font-color="#fff">{{juese}}</tag>
          <md-button @click="tuichu()" style="margin-top:40%">退出</md-button>
        </div>
    </main>
  </div>
   
</template>

<script>
  import {getStore,setStore,removeStore} from '@/config/mUtils'
  import util from '@/config/util';
  import {Button, Toast,Tag} from 'mand-mobile'

  export default {
    name: 'home-view',
    components: {
      [Button.name]: Button,
      Tag
    },
    data() {
      return {
        shoujihao:'',
        juese:'',
      }
    },
    mounted(){
      this.shoujihao=getStore('usermobile');
      this.juese=util.usertypeName(getStore('usertype'));
    },
    methods: {
      tuichu() {
        removeStore('token');
        removeStore('userid');
        removeStore('usertype');
        removeStore('usermobile');
        this.$router.push({name:'login'});
      },
    }
  }
</script>

<style lang="stylus" scoped>
.md-tab-bar
  padding 0 100px

.md-example-child-field-0
  .md-field
    margin-bottom 20px
  .md-input-item
    background #FFF
    padding 0 32px
  .strong-tip
    font-size 24px
    color color-text-highlight
</style>

<style scoped>
header, footer, main {
    display: block;
}
header {
    background-color: #fff;
    position: fixed;
    height: 1rem;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0px 1px 0px #888888;
}
footer {
    box-shadow: 0px -1px 0px #888888;
    background-color: gainsboro;
    position: fixed;
    height: 1rem;
    left: 0;
    right: 0;
    bottom: 0;
}
main {
    /* main绝对定位，进行内部滚动 */
    position: fixed;
    top: 1rem;
    /* 使之可以滚动 */
    overflow-y: scroll;
    width: 100%;
    background-color: #fbf9f9;
}



.headcss{
  text-align: center;
  font-size: 0.6rem;
  line-height: 1rem;
  position: absolute;
  left: 1.2rem;
  right: 1.2rem;
}

.rightcss{
  line-height: 1rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.1rem;
}

.leftcss{
  line-height: 1rem;
  position: absolute;
  left: 0.5rem;
  bottom: 0.1rem;
}
.demo-tabbar .van-tabbar {
    position: relative;
}
.van-tabbar--fixed {
    left: 0;
    bottom: 0;
    position: fixed;
}

.van-tabbar {
    width: 100%;
    height: 1rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
}


.demo-tabbar .van-tabbar-item {
    cursor: pointer;
}

.van-tabbar-item--active {
    color: #38f;
}

.van-tabbar-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #666;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    line-height: 1;
    font-size: 0.4rem;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.van-tabbar-item__icon {
    font-size: 0.4rem;
    margin-bottom: 5px;
    position: relative;
}


.van-tabbar-item--active {
    color: #38f;
}
</style>
