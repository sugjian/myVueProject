<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">市场部</div>
        <div class="rightcss" @click="tianjia()">
          <img style="width: 0.5rem;" src="@/styles/img/tianjia.png"/>
        </div>
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
              @click="xiangqing(detail)">
            </md-field-item>
          </md-field>
        </div>
    </main>
    <md-dialog
      title="操作"
      :closable="true"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      <md-field>
        <md-field-item
          name="name"
          title="人员类型"
          arrow="arrow-right"
          align="right"
          :value="selectorValue"
          @click.native="showSelector">
        </md-field-item>
        <md-field-item v-show="isShow"
          name="name2"
          title="市场部经理"
          arrow="arrow-right"
          align="right"
          :value="selectorValue2"
          @click.native="showSelector2">
        </md-field-item>
        <md-input-item
          title="名称"
          v-model="name"
          placeholder="请输入名称"
        ></md-input-item>
        <md-input-item
          title="手机号" type="phone" 
          v-model="mobile"
          placeholder="请输入手机号"
        ></md-input-item>
        <md-input-item
          title="密码" type="password"
          v-model="mima"
          placeholder="请输入密码"
        ></md-input-item>
      </md-field>
    </md-dialog>
    <md-selector
      v-model="isSelectorShow"
      :data="data"
      title="人员类型"
      cancelText="取消"
      @choose="onSelectorChoose($event)"
    ></md-selector>
     <md-selector
      v-model="isSelectorShow2"
      :data="data2"
      title="市场部经理"
      cancelText="取消"
      @choose="onSelectorChoose2($event)"
    ></md-selector>
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
            { value:4,
              text: '市场部经理',
            },
            {
              value:5,
              text: '业务人员',
            }],
        selectorValue:null,  
        type:null,  
        isSelectorShow2: false,
        data2: [],
        selectorValue2:null,  
        pid:null,  
        list:[],
        curdetail:{},
        isadd:false,
        mima:'',
        name:'',
        mobile:'',     
        actDialog: {
          open: false,
          btns: [
          {
            text: '取消',
            handler: this.onActCancel,
          },
          {
            text: '确认操作',
            handler: this.onActConfirm,
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
        util.post('mendian_shichang_list',{},function(datas2){
          that.list=datas2.list;          
        });
      },
      showSelector() {
        if(!this.isadd){
          this.isSelectorShow = true
        }
      },
      onSelectorChoose({value,text}) {
        this.selectorValue = text;
        this.type=value;
        if(value==5){
          this.isShow=true;
        }else{
          this.isShow=false;
        }
      },
      showSelector2() {
        this.isSelectorShow2 = true
      },
      onSelectorChoose2({value,text}) {
        this.selectorValue2 = text;
        this.pid=value;
      },
      xiangqing(detail){
        const that=this;
        this.curdetail=util.copy(detail);
        this.mobile=this.curdetail.mobile;
        this.type=this.curdetail.type;
        this.name=this.curdetail.name;
        this.mima=this.curdetail.password;    
        this.isadd=true;
        if(this.type==4){
          this.isShow=false;
           that.selectorValue="市场部经理";
        }else{
          this.isShow=true;
           this.selectorValue="业务人员";
        }
        this.actDialog.btns=[
                        {
                          text: '取消',
                          handler: this.onActCancel,
                        },
                        {
                          text: '删除',
                          handler: this.delete,
                        },
                        {
                          text: '提交',
                          handler: this.onActConfirm,
                        },
                        {
                          text: '查看',
                          handler: this.chakan,
                        },
                      ];
        util.post('mendian_shichangbujingli_list',{},function(datas2){
          let _data2=[]
          datas2.list.forEach(v=>{  
            if(v.id==that.curdetail.pid){
              that.pid=v.id;
              that.selectorValue2=v.name;
            }
            _data2.push({value:v.id,text:v.name});
          });   
          that.data2=_data2;    
          that.actDialog.open = true        
        });
      },
      chakan(){
        this.$router.push({name:'yewuyuan_shejishi_home_view',query:{id:this.curdetail.id}});    
      },
       delete(){
         const that=this;
         Dialog.confirm({
          title: '确认',
          content: '请确认是否进行删除操作？',
          confirmText: '确定',
          onConfirm: function(){
            util.post('delete_user',{id:that.curdetail.id},function(datas2){
              Toast.succeed('删除成功！');
              that.actDialog.open = false;
              that.init();
            });  
          },
        })
      },
      tianjia(){
        const that=this;
        this.isShow=false;
        this.mima='';
        this.name='';
        this.mobile='';
        this.selectorValue=null;
        this.type=null;
        this.data2=[];
        this.selectorValue2=null;  
        this.pid=null;  
        this.isadd=false;
        this.actDialog.btns=[
                        {
                          text: '取消',
                          handler: this.onActCancel,
                        },
                        {
                          text: '提交',
                          handler: this.onActConfirm,
                        },
                      ];
        util.post('mendian_shichangbujingli_list',{},function(datas2){
          let _data2=[]
          datas2.list.forEach(v=>{  
            _data2.push({value:v.id,text:v.name});
          });   
          that.data2=_data2;    
          that.actDialog.open = true        
        });
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
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
         if(this.type==5&&!this.pid){
          Toast.failed('请选择市场部经理！'); 
          return false;
         }
         const that=this;
         if(this.type==4){
          this.pid=null;
         }
         if(this.isadd==false){
           util.post('mendian_shichang_insert',{type:this.type,pid:this.pid,mobile:this.mobile,name:this.name,password:this.mima},function(datas2){
              Toast.succeed('添加成功！');
              that.actDialog.open = false;
              that.init();
            });  
         }else{
           util.post('mendian_shichang_update',{id:this.curdetail.id,type:this.type,name:this.name,pid:this.pid,password:this.mima},function(datas2){
              Toast.succeed('修改成功！');
              that.actDialog.open = false;
            });   
         }         
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
<style>
.md-selector .md-popup {
    z-index: 2222 !important;
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
    /* 使之可以滚动 */
    overflow-y: scroll;
    width: 100%;
    background-color: #fbf9f9;
    bottom: 0;
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
