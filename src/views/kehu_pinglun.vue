<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">客户评论列表</div>
        <!--<div class="rightcss" @click="tianjia()">
          <img style="width: 0.5rem;" src="@/styles/img/tianjia.png"/>
        </div>-->
    </header>
    
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content">
          <md-field>
             <md-field-item  v-for="(detail,index) in list" :key="index"
              name="item2"
              :title="detail.content"
              :brief="detail.createdate"
              align="right">
            </md-field-item>
          </md-field>
        </div>
    </main>
     <!-- fixed定位的底部 -->
    <footer>
       <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed" style="z-index: 1;">
          <div class="van-tabbar-item van-tabbar-item--active" @click="pinglun"><div class="van-tabbar-item__text">添加评论</div></div>
        </div>
    </footer>
     <md-dialog
      title="添加评论"
      :closable="true"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      <md-field>
        <md-input-item
          v-model="content" type='textarea'
          placeholder="请输入评论内容"
        ></md-input-item>
      </md-field>
    </md-dialog>
  </div>
   
</template>

<script>
  import {getStore,setStore} from '@/config/mUtils'
  import util from '@/config/util';
  import {InputItem, Tabs, Button, Toast,TabBar,Field, FieldItem ,Dialog,Selector} from 'mand-mobile'

  export default {
    name: 'home-view',
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
        list:[],
        content:'',
        actDialog: {
          open: false,
          btns: [
          {
            text: '取消',
            handler: this.onActCancel,
          },
          {
            text: '提交',
            handler: this.onActConfirm,
          },
        ],
        },
      }
    },
     mounted(){
      this.init();
    },
    methods: {
      init(){
        this.id=this.$route.query.id;
        const that=this;
        util.post('kehu_pinglun_list',{id:this.id},function(datas2){
          that.list=datas2.list;          
        });
      },
      pinglun(){
        this.content='';    
        this.actDialog.open = true
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        const that=this;
        if(!this.content){
          Toast.failed('请输入评论内容！'); 
          return false;
        }
        util.post('add_pinglun',{content:this.content,kehuid:this.id},function(datas2){
          Toast.succeed('添加成功！');
          that.actDialog.open = false;
          that.init();
        });  
             
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
