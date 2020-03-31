<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">门店列表</div>
    </header>
    
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content">
          <md-field>
             <md-field-item  v-for="(detail,index) in list" :key="index"
              name="name"
              :title="detail.name"
              :brief="detail.type|usertype"
              :value="detail.mobile"
              arrow="arrow-right" align="right"
              @click="chakan(detail)">
            </md-field-item>
          </md-field>
        </div>
    </main>
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
        isShow:false,
        isSelectorShow: false,
        data: [
            { value:2,
              text: '总经办',
            },
            {
              value:3,
              text: '店长',
            }],
        selectorValue:null,  
        type:null,  
        curdetail:{},
        mobile:'',
        name:'',
        mima:'',
        list:[],
        actDialog: {
          open: false,
          btns: [
            {
              text: '取消',
              handler: this.onActCancel,
            },
            {
              text: '提交编辑',
              handler: this.onActConfirm,
            }
          ],
        },
        actDialog2: {
          open: false,
          btns: [
          {
            text: '取消',
            handler: this.onActCancel2,
          },
          {
            text: '确认操作',
            handler: this.onActConfirm2,
          },
        ],
        },
      }
    },
    filters:{
        usertype(type){
          return util.usertypeName(type)
        }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        const that=this;
        if(getStore('usertype')==1){
          this.isShow = true
        }
        util.post('zongjingban_mendianlist',{},function(datas2){
          that.list=datas2.list;          
        });
      },
      xiangqing(detail){
        if(getStore('usertype')=='1'){
          this.curdetail=util.copy(detail);
          this.name=this.curdetail.name;
          this.mobile=this.curdetail.mobile;
          this.mima=this.curdetail.password;    
          if(this.curdetail.type==3){
             this.actDialog.btns=[
                        {
                          text: '取消',
                          handler: this.onActCancel,
                        },
                        {
                          text: '提交编辑',
                          handler: this.onActConfirm,
                        },
                        {
                          text: '查看门店',
                          handler: this.chakan,
                        },
                      ];
          }else{
            this.actDialog.btns=[
                        {
                          text: '取消',
                          handler: this.onActCancel,
                        },
                        {
                          text: '提交编辑',
                          handler: this.onActConfirm,
                        }
                      ];
          }
          this.actDialog.open = true
        }
       
      },
      chakan(detail){
        this.$router.push({name:'dianzhang_home_view',query:{id:detail.id}});    
      },
      showSelector() {
        this.isSelectorShow = true
      },
      onSelectorChoose({value,text}) {
        this.selectorValue = text;
        this.type=value;
      },
      tianjia(){
        this.mobile='';
        this.mima='';
        this.type='';
        this.name='';
        this.selectorValue='';
        this.actDialog2.open = true
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        if(!this.name){
        Toast.failed('请输入名称！'); 
        return false;
       }
       if(!this.mobile){
        Toast.failed('请输入手机号！'); 
        return false;
       }
       if(!this.mima){
        Toast.failed('请输入密码！'); 
        return false;
       }
       const that=this;
        util.post('updateuserpwd',{id:this.curdetail.id,password:this.mima,name:this.name,mobile:this.mobile},function(datas2){
            Toast.succeed('修改成功！');
            that.actDialog.open = false;
            that.init();
        });     
      },
      onActCancel2() {
        this.actDialog2.open = false
      },
      onActConfirm2() {
        if(!this.type){
        Toast.failed('请选择人员类型！'); 
        return false;
       }
        if(!this.name){
        Toast.failed('请输入名称！'); 
        return false;
       }
       if(!this.mobile){
        Toast.failed('请输入手机号！'); 
        return false;
       }
       if(!this.mima){
        Toast.failed('请输入密码！'); 
        return false;
       }
       const that=this;
      util.post('adduser',{type:this.type,name:this.name,mobile:this.mobile,password:this.mima},function(datas2){
          Toast.succeed('添加成功！');
          that.actDialog2.open = false;
          that.init();
        });     
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
<style>
.md-selector .md-popup {
    z-index: 2222 !important;
}

.md-tabs .md-tab-content-wrapper{
  min-height: 0rem !important;
}
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
    bottom: 0;
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
