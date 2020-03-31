<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">客户详情</div>
        <!--<div class="rightcss" @click="tianjia()">
          <img style="width: 0.5rem;" src="@/styles/img/tianjia.png"/>
        </div>-->
    </header>
    
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content">
         <md-field>
            <md-field-item
              name="item1"
              title="序号"
              :value="detail.xuhao"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="姓名"
              :value="detail.name"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="楼盘地址"
              :value="detail.fanghao"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="电话"
              :value="detail.mobile"
              align="right">
            </md-field-item>  
            <md-field-item
              name="item1"
              title="客户类型"
              :value="detail.type"
              align="right">
            </md-field-item>     
            <md-field-item
              name="item1"
              title="备注"
              :value="detail.beizhu"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="客户状态"
              :value="detail.status"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="签约类型"
              :value="detail.qita"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="报备人"
              :value="detail.baobeiname"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="报备时间"
              :value="detail.createdate"
              align="right">
            </md-field-item>
            <md-field-item
              name="item1"
              title="设计师"
              :value="detail.shejishiname"
              align="right">
            </md-field-item>   
            <md-field-item
              name="item1"
              title="分单时间"
              :value="detail.fendandate"
              align="right">
            </md-field-item>      
          </md-field>
        </div>
    </main>
     <!-- fixed定位的底部 -->
    <footer>
       <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed" style="z-index: 1;">
          <div class="van-tabbar-item van-tabbar-item--active" @click="pinglun"><div class="van-tabbar-item__text">查看评论</div></div>
        </div>
    </footer>
  </div>
   
</template>

<script>
  import {getStore,setStore} from '@/config/mUtils'
  import util from '@/config/util';
  import {InputItem, Tabs, Button, Toast,TabBar,Field, FieldItem ,Dialog,Selector} from 'mand-mobile'

  export default {
    name: 'kehu-view',
    components: {
      [Selector.name]: Selector,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [Dialog.name]: Dialog,
      [Button.name]: Button,
      [Tabs.name]: Tabs,
      [TabBar.name]: TabBar,
      [InputItem.name]: InputItem,
    },
    data() {
      return {
        id:null,
        detail:{}
      }
    },
    mounted(){
      this.id=this.$route.query.id;
      const that=this;
      util.post('kehu_detail',{id:this.id},function(datas2){
        if(datas2.detail&&!datas2.detail.beizhu){
          datas2.detail.beizhu='';
        }
        if(datas2.detail&&!datas2.detail.shejishimobile){
          datas2.detail.shejishimobile='';
        }
        if(datas2.detail&&!datas2.detail.fendandate){
          datas2.detail.fendandate='';
        }
        datas2.detail.status=util.statusName(datas2.detail.status)
        datas2.detail.qita=util.qianyueName(datas2.detail.qita)
        that.detail=datas2.detail;          
      });
    },
    methods: {
      pinglun(){
        this.$router.push({name:'kehu_pinglun',query:{id:this.id}}); 
      }
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
    bottom: 1rem;
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
