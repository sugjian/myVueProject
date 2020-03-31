<template>
  <div>
    <header>
        <div class="headcss">美星装饰</div>
        <div class="rightcss" @click="tianjia()">
          <img style="width: 0.5rem;" src="@/styles/img/tianjia.png"/>
        </div>
    </header>
    
    <!-- 可以滚动的区域 -->
    <main>
        <md-tabs class="tabsclass"
              :titles="titles"
              show-ink-bar :noslide="true"
              @indexChanged="alert"
            >
            <div :key="0">
             <md-tab-bar :show-ink-bar="false"
                :titles="titles2"
                 @indexChanged="alert2"
              ></md-tab-bar>
              <div>
              </div>
            </div>
            <div :key="1">
              
            </div>
            <div :key="2">
              <md-tab-bar :show-ink-bar="false"
                :titles="titles3"
                 @indexChanged="alert3"
              ></md-tab-bar>
            </div>
            </md-tabs>
        <div :class="contentclass">
          <div class="md-input-item is-ios left normal" style="background: white;">
              <div class="md-input-item-container" style="margin-left:0.2rem" @click="shijian(1)">
               <div class="md-input-item-control">
                <input name="input-item-66931930" v-model="searchk" placeholder="开始时间" readonly autocomplete="off" type="text" class="md-input-item-input">
                </div></div>
             <div class="md-input-item-container"  @click="shijian(2)">
                <div class="md-input-item-control">
                  <input name="input-item-66931930" v-model="searchj" placeholder="结束时间" readonly autocomplete="off" type="text" class="md-input-item-input">
                </div></div>
             <div class="md-input-item-container">
                <div class="md-input-item-control">
                  <input name="input-item-66931930" v-model="searchf" placeholder="楼盘地址" autocomplete="off" type="text" class="md-input-item-input"> 
                </div></div>
              <md-button type="ghost-primary" size="small" style="margin-right: 5px;margin-top: 0.3rem;"
              @click="init()">搜索</md-button>
          </div>
          <md-field>
             <md-field-item  v-for="(detail,index) in list" :key="index"
              name="item2"
              :title="detail.xuhao+'   --  '+detail.createdate"
              :brief="detail.name+'   --  '+detail.mobile"
              arrow="arrow-right"
              :value="detail.fanghao"
              align="right"
               @click="xiangqing(detail)">
            </md-field-item>
          </md-field>
        </div>
    </main>
    
    <!-- fixed定位的底部 -->
    <footer>
       <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed" style="z-index: 1;">
          <div class="van-tabbar-item van-tabbar-item--active" @click="sheji"><div class="van-tabbar-item__text">设计部</div></div>
          <div class="van-tabbar-item van-tabbar-item--active" @click="shichang"><div class="van-tabbar-item__text">市场部</div></div>
          <div class="van-tabbar-item van-tabbar-item--active" @click="wode"><div class="van-tabbar-item__text">我的</div></div>

        </div>
    </footer>
     <md-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      type="date"
      title="选择时间"
      :default-date="currentDate"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>
     <md-dialog
      title="编辑信息"
      :closable="true"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      <md-field>
         <md-input-item
          title="序号"
          v-model="xuhao"
          placeholder="请输入序号"
        ></md-input-item>
         <md-input-item
          title="姓名"
          v-model="name"
          placeholder="请输入姓名"
        ></md-input-item>
         <md-input-item
          title="楼盘地址"
          v-model="fanghao"
          placeholder="请输入楼盘地址"
        ></md-input-item>
        <md-input-item
          title="电话"
          v-model="mobile"
          placeholder="请输入电话"
        ></md-input-item>        
        <md-field-item
          name="name"
          title="客户类型"
          arrow="arrow-right"
          align="right"
          :value="selectorValue"
          @click.native="showSelector">
        </md-field-item>
        <md-input-item
          title="备注"
          v-model="beizhu"
          placeholder="请输入备注"
        ></md-input-item>
      </md-field>
    </md-dialog>
    <md-selector
      v-model="isSelectorShow"
      :data="data"
      title="客户类型"
      cancelText="取消"
      @choose="onSelectorChoose($event)"
    ></md-selector>
  </div>
   


</template>

<script>
  import {getStore,setStore} from '@/config/mUtils'
  import util from '@/config/util';
  import {DatePicker,InputItem, Tabs, Button, Toast,TabBar,Field, FieldItem ,Dialog,Selector} from 'mand-mobile'

  export default {
    name: 'home-view',
    components: {
       [DatePicker.name]: DatePicker,
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
        searchk:'',
        searchj:'',
        searchf:'',
        shijiantype:'',
        isDatePickerShow:false,
        currentDate: new Date(),
        contentclass:'content',
        titles: ['客户报备', '见面客户', '签约客户'],
        titles2: ['A类', 'B类', 'C类'],
        titles3: ['定金客户', '合同客户', '其他'],
        isShow:false,
        isSelectorShow: false,
        data: [
            { value:'A类',
              text: 'A类',
            },
            {
              value:'B类',
              text: 'B类',
            },{
              value:'C类',
              text: 'C类',
            }],
        selectorValue:'',  
        type:'',    
        xuhao:'',  
        name:'', 
        fanghao:'', 
        mobile:'', 
        beizhu:'', 
        list:[],
        datype:0,
        xiaotype:0,
        curdetail:{},
        isadd:false,
        mima:'',
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
      onDatePickerConfirm(columnsValue) {
        if(this.shijiantype==1){
          this.searchk=this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
        }else{
          this.searchj=this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
        }
      },
      shijian(t){
        this.shijiantype=t;
        this.isDatePickerShow=true;
      },
     init(){
        const that=this;
        util.post('kehu_list',{datype:this.datype,xiaotype:this.xiaotype,searchk:this.searchk,searchj:this.searchj,searchf:this.searchf},function(datas2){
          that.list=datas2.list;          
        });
      },
      alert(index, preIndex) {
        this.searchk='';
        this.searchj='';
        this.searchf='';
        if(index==1){
          this.contentclass='content2';
        }else{
          this.contentclass='content';
        }
        this.datype=index;
        this.xiaotype=0;
        this.init();
      },
      alert2(index, preIndex) {
        this.xiaotype=index;
        this.init();
      },
      alert3(index, preIndex) {
        this.xiaotype=index;
        this.init();
      },
      xiangqing(detail){
         this.$router.push({name:'dianzhang_kehu',query:{id:detail.id}});     
      },
      sheji(){
        this.$router.push({name:'dianzhang_sheji'});
      },
      shichang(){
        this.$router.push({name:'dianzhang_shichang'});
      },
      wode(){
        this.$router.push({name:'wode'});
      },
      showSelector() {
        this.isSelectorShow = true
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
      tianjia(){
        const that=this;
        this.isShow=false;
        this.xuhao='';
        this.name='';
        this.fanghao='';
        this.beizhu='';
        this.mobile='';
        this.selectorValue=null;
        this.type=null;   
        this.isadd=false; 
        that.actDialog.open = true        
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        if(!this.xuhao){
          Toast.failed('请输入序号！'); 
          return false;
         }
         if(!this.name){
          Toast.failed('请输入姓名！'); 
          return false;
         }
         if(!this.fanghao){
          Toast.failed('请输入楼盘地址！'); 
          return false;
         }
         if(!this.mobile){
          Toast.failed('请输入电话！'); 
          return false;
         }
         if(!this.type){
          Toast.failed('请选择客户类型！'); 
          return false;
        }
         const that=this;
         let param={
          xuhao:this.xuhao,
          name:this.name,
          fanghao:this.fanghao,
          mobile:this.mobile,
          type:this.type,
          beizhu:this.beizhu,
          baobeimobile:getStore('usermobile')};
         util.post('dianzhang_add_kehu',param,function(datas2){
            Toast.succeed('添加成功！');
            that.actDialog.open = false;
            that.init();
          });  
       },
    }
  }
</script>

<style lang="stylus" scoped>
.md-tab-bar
  padding 0 100px
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
    bottom: 1rem;
    /* 使之可以滚动 */
    overflow-y: scroll;
    width: 100%;
    background-color: #fbf9f9;
}

.content{
  position: fixed;
    top: 2.6rem;
    bottom: 1rem;
    /* 使之可以滚动 */
    overflow-y: scroll;
    width: 100%;
    background-color: #fbf9f9;
}

.content2{
  position: fixed;
    top: 2rem;
    bottom: 1rem;
    /* 使之可以滚动 */
    overflow-y: scroll;
    width: 100%;
    background-color: #fbf9f9;
}

.tabsclass{
 position: fixed;
 width: 100%;
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