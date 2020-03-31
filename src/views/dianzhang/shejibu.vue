<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">设计部</div>
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
  </div>
   
</template>

<script>
  import {getStore,setStore} from '@/config/mUtils'
  import util from '@/config/util';
  import {InputItem, Tabs, Button, Toast,TabBar,Field, FieldItem ,Dialog} from 'mand-mobile'

  export default {
    name: 'home-view',
    components: {
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
        titles: ['客户报备', '见面客户', '签约客户'],
        titles2: ['A类', 'B类', 'C类'],
        titles3: ['定金客户', '合同客户', '其他'],
        index1:0,
        index2:0,
        index3:0,
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
        util.post('mendian_shejibu_list',{},function(datas2){
          that.list=datas2.list;          
        });
      },
      xiangqing(detail){
        this.curdetail=util.copy(detail);
        this.mobile=this.curdetail.mobile;
        this.name=this.curdetail.name;
        this.mima=this.curdetail.password;    
        this.isadd=true;
        this.actDialog.btns=[
                        {
                          text: '关闭',
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
        this.actDialog.open = true
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
        this.mima='';
        this.name='';
        this.mobile='';
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
        this.actDialog.open = true
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
         if(this.isadd==false){
           util.post('mendian_shejibu_insert',{mobile:this.mobile,name:this.name,password:this.mima},function(datas2){
              Toast.succeed('添加成功！');
              that.actDialog.open = false;
              that.init();
            });  
         }else{
           util.post('updateuserpwd',{id:this.curdetail.id,password:this.mima,mobile:this.mobile,name:this.name},function(datas2){
              Toast.succeed('修改成功！');
              that.actDialog.open = false;
              that.init();
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
