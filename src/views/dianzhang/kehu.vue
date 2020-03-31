<template>
  <div>
    <header>
        <div class="leftcss" @click="$router.back(-1)">
          <img style="width: 0.5rem;" src="@/styles/img/fanhui.png"/>
        </div>
        <div class="headcss">客户详情</div>
        <div class="rightcss" @click="tianjia()">
          <img style="width: 0.5rem;" src="@/styles/img/bianji.png"/>
        </div>
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
          <div class="van-tabbar-item van-tabbar-item--active" @click="xiugaibaobei"><div class="van-tabbar-item__text">修改报备人</div></div>
          <div class="van-tabbar-item van-tabbar-item--active" @click="fenpei"><div class="van-tabbar-item__text">分配设计</div></div>
          <div class="van-tabbar-item van-tabbar-item--active" @click="qianyue"><div class="van-tabbar-item__text">编辑签约</div></div>
          <div class="van-tabbar-item van-tabbar-item--active" @click="pinglun"><div class="van-tabbar-item__text">查看评论</div></div>
        </div>
    </footer>
    <md-dialog
      title="操作"
      :closable="true"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      <md-field>
        <md-field-item
          name="name"
          title="签约类型"
          arrow="arrow-right"
          align="right"
          :value="selectorValue2"
          @click.native="showSelector">
        </md-field-item>
        <md-input-item v-show="isShow"
          title="其他" 
          v-model="qita"
          placeholder="请输入内容"
        ></md-input-item>
      </md-field>
    </md-dialog>
    <md-selector
      v-model="isSelectorShow"
      :data="data"
      title="分配设计"
      cancelText="取消"
      okText="确认"
      @confirm="onSelectorChoose($event)"
    ></md-selector>
    <md-selector
      v-model="isSelectorShow3"
      :data="data3"
      title="修改报备人"
      cancelText="取消"
      okText="确认"
      @confirm="onSelectorChoose3($event)"
    ></md-selector>
     <md-selector
      v-model="isSelectorShow2"
      :data="data2"
      title="签约类型"
      cancelText="取消"
      @choose="onSelectorChoose2($event)"
    ></md-selector>
     <md-dialog
      title="编辑信息"
      :closable="true"
      v-model="actDialog11.open"
      :btns="actDialog11.btns"
    >
      <md-field>
         <md-input-item
          title="序号"
          v-model="cur.xuhao"
          placeholder="请输入序号"
        ></md-input-item>
         <md-input-item
          title="姓名"
          v-model="cur.name"
          placeholder="请输入姓名"
        ></md-input-item>
         <md-input-item
          title="楼盘地址"
          v-model="cur.fanghao"
          placeholder="请输入楼盘地址"
        ></md-input-item>
        <md-input-item
          title="电话"
          v-model="cur.mobile"
          placeholder="请输入电话"
        ></md-input-item>        
        <md-field-item
          name="name"
          title="客户类型"
          arrow="arrow-right"
          align="right"
          :value="cur.type"
          @click.native="showSelector11">
        </md-field-item>
        <md-input-item
          title="备注"
          v-model="cur.beizhu"
          placeholder="请输入备注"
        ></md-input-item>
      </md-field>
    </md-dialog>
    <md-selector
      v-model="isSelectorShow11"
      :data="data11"
      title="客户类型"
      cancelText="取消"
      @choose="onSelectorChoose11($event)"
    ></md-selector>
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
        detail:{},
        cur:{},
        isShow:false,
        isSelectorShow: false,
        data: [],
        selectorValue:null,  
        type:null,  
        qita:'',
        data11: [
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
        isSelectorShow2: false,
        isSelectorShow3: false,
        isSelectorShow11:false,
        data2: [
            { value:'0',
              text: '定金客户',
            },{
              value:'1',
              text: '签约客户',
            },{
              value:'2',
              text: '其他',
            }],
        data3: [],
        selectorValue2:null,  
        pid:null,  
        list:[],
        curdetail:{},
        isadd:false,
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
        actDialog11: {
          open: false,
          btns: [
          {
            text: '取消',
            handler: this.onActCancel11,
          },
          {
            text: '确认操作',
            handler: this.onActConfirm11,
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
          that.cur=util.copy(that.detail);        
        });
      },
      pinglun(){
        this.$router.push({name:'kehu_pinglun',query:{id:this.id}}); 
      },
      tianjia(){
        this.actDialog11.open = true;
      },
      fenpei(){
        const that=this;
        util.post('mendian_shejibu_list',{},function(datas2){
          let _data2=[]
          datas2.list.forEach(v=>{  
            _data2.push({value:v.id,text:v.name});
          });   
          that.data=_data2;    
          that.isSelectorShow = true         
        });
      },
      xiugaibaobei(){
        const that=this;
        util.post('mendian_yewuyuan_list',{},function(datas2){
          let _data2=[]
          datas2.list.forEach(v=>{  
            _data2.push({value:v.id,text:v.name});
          });   
          that.data3=_data2;    
          that.isSelectorShow3 = true         
        });
      },
      qianyue(){
        this.pid='';
        this.qita='';
        this.actDialog.open = true
      },
      showSelector() {
        this.isSelectorShow2 = true
      },
      showSelector11() {
        this.isSelectorShow11 = true
      },
      onSelectorChoose({value,text}) {
        this.selectorValue = text;
        const that=this;
        util.post('update_sheji',{shejishiid:value,id:this.id},function(datas2){
          Toast.succeed('编辑成功！');
          that.init();        
        });
      },
      onSelectorChoose3({value,text}) {
        this.selectorValue3 = text;
        const that=this;
        util.post('update_baobei',{baobeiid:value,id:this.id},function(datas2){
          Toast.succeed('修改成功！');
          that.init();        
        });
      },
      showSelector2() {
        this.isSelectorShow2 = true
      },
      onSelectorChoose2({value,text}) {
        this.selectorValue2 = text;
        this.pid=value;
        if(value==2){
          this.isShow=true;
        }else{
          this.isShow=false;
        }
      },
      onSelectorChoose11({value,text}) {
        this.cur.type = text;
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        const that=this;
        if(!this.pid){
          Toast.failed('请选择签约类型！'); 
          return false;
        }
        if(this.pid==2&&!this.qita){
          Toast.failed('请输入其他类型的内容！'); 
          return false;
         }
         if(this.pid==2&&this.qita){

         }else{
            this.qita=this.pid;
         }
         util.post('update_qianyue',{id:this.id,qita:this.qita},function(datas2){
            Toast.succeed('编辑成功！');
            that.actDialog.open = false;
            that.init();
          });            
       },
       onActCancel11() {
        this.actDialog11.open = false
      },
      onActConfirm11() {
        if(!this.cur.xuhao){
          Toast.failed('请输入序号！'); 
          return false;
         }
         if(!this.cur.name){
          Toast.failed('请输入姓名！'); 
          return false;
         }
         if(!this.cur.fanghao){
          Toast.failed('请输入楼盘地址！'); 
          return false;
         }
         if(!this.cur.mobile){
          Toast.failed('请输入电话！'); 
          return false;
         }
         if(!this.cur.type){
          Toast.failed('请选择客户类型！'); 
          return false;
        }
         const that=this;        
         util.post('update_kehu',this.cur,function(datas2){
            Toast.succeed('修改成功！');
            that.actDialog11.open = false;
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
<style>
.md-selector .md-popup {
    z-index: 2222 !important;
}
</style>
<style scoped>

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
    font-size: 0.35rem;
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
