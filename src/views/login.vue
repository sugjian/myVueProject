<template>
    <div class="loginContainer md-example-child md-example-child-captcha">
        <div style="padding-top: 50%;    margin-left: 5%;    margin-right: 5%;">    
            <md-field>
              <md-input-item
                v-model="mobile" type="phone"  size="large"
                title="手机号"
                placeholder="手机号"
                is-title-latent
                clearable
              ></md-input-item>
              <md-input-item
                v-model="password" type="password"  size="large"
                title="密码"
                placeholder="密码"
                is-title-latent
                clearable
                ></md-input-item>
            </md-field>
            <md-button style="margin-top:15%" @click="mobileLogin">登陆</md-button>
            <div style="margin-top:5%">
                <md-button type="ghost-primary" size="large" style="float:right" @click="xiugaimima">修改密码</md-button>
            </div>
        </div>
        <md-dialog
          title="修改密码"
          :closable="true"
          v-model="actDialog.open"
          :btns="actDialog.btns"
        >
          <md-field>
            <md-input-item 
              title="手机号"  type="phone"
              v-model="phone"
              placeholder="请输入手机号"
            ></md-input-item>
            <md-input-item 
              title="新密码"  type="password"
              v-model="mima"
              placeholder="请输入新密码"
            ></md-input-item>
          </md-field>
        </md-dialog>
        <md-captcha
          ref="captcha"
          v-model="show"
          :title="title"
          :maxlength="limit ? parseFloat(maxlength) : -1"
          :system="system"
          :mask="mask"
          :appendTo="appendTo"
          @submit="submit"
          @show="onShow"
          @hide="onHide"
          @send="onSend"
        >
          {{content}}
        </md-captcha>
    </div>
</template>

<script>
    import {getStore,setStore,removeStore} from '@/config/mUtils'
    import util from '@/config/util';
    import {Button, Toast, Captcha, InputItem, Field, FieldItem, Switch,Dialog} from 'mand-mobile'

    export default {
        data(){
            return {
                mobile: '', //用户名
                password: '', //密码
                phone:'',
                mima:'',
                code:'',
                show: false,
                  appendTo: document.querySelector('.doc-demo-box-priview') || document.body,
                  title: '输入验证码',
                  content: '验证码已发送',
                  limit: true,
                  maxlength: '4',
                  mask: false,
                  system: false,
                  actDialog: {
                      open: false,
                      btns: [
                          {
                            text: '取消',
                            handler: this.onActCancel,
                          },
                          {
                            text: '验证手机号',
                            handler: this.onActConfirm,
                          },
                        ],
                    },
            }
        },
        components: {
            [Button.name]: Button,
            [Dialog.name]: Dialog,
            [Captcha.name]: Captcha,
            [InputItem.name]: InputItem,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [Switch.name]: Switch,
          },
        computed: {
           
        },
        methods: {
            //发送登录信息
            mobileLogin(){   
                let that=this;
                if (!this.mobile) {
                     Toast.failed('请输入手机号！');  
                    return false;
                }else if (!this.password) {
                     Toast.failed('请输入密码！');  
                    return false;
                }
                util.post('login',{mobile:that.mobile,password:that.password},function(datas2){
                    setStore('token',datas2.token);
                    setStore('userid',datas2.id);
                    setStore('usertype',datas2.type);
                    setStore('usermobile',datas2.mobile);
                    if(datas2.type==1){
                        that.$router.push({name:'zongjingli_home'});
                    }else if(datas2.type==2){
                        that.$router.push({name:'zongjingli_home'});
                    }else if(datas2.type==3){
                        that.$router.push({name:'dianzhang_home'});
                    }else if(datas2.type==4){
                        that.$router.push({name:'shichangbujingli_home'});
                    }else if(datas2.type==5){
                        that.$router.push({name:'yewuyuan_shejishi_home'});
                    }else if(datas2.type==6){
                        that.$router.push({name:'yewuyuan_shejishi_home'});
                    }
                    
                });
            },
            xiugaimima(){
                this.code='';
                this.phone='';
                this.mima='';
                this.actDialog.open = true;
            },
            submit(val) {
                const that=this;
              const max = parseFloat(this.maxlength)
              if (!this.limit || max < 0 || val.length === max) {
                if (val != this.code) {
                  this.$refs.captcha.setError('验证码错误，请重新输入')
                } else {
                   util.post('update_pwd',{mobile:this.phone,password:this.mima},function(datas2){
                    that.show = false
                    that.actDialog.open = false;
                    Toast.succeed('修改密码成功！');               
                  });            
                }
              }
            },
            onSend() {
                const that=this;
                util.post('send_msg',{mobile:this.phone},function(datas2){
                    that.code=datas2.yanzhengma;
                });   
            },
            onShow() {},
            onHide() {},
            onActCancel() {
                this.actDialog.open = false
              },
            onActConfirm() {
                const that=this;
                if(!this.phone){
                  Toast.failed('请输入手机号！'); 
                  return false;
                }
                if(!this.mima){
                  Toast.failed('请输入密码！'); 
                  return false;
                }
                that.show = true;          
               }
            }
        }
</script>


<style>
.md-captcha .md-dialog {
    z-index: 2222 !important;
}

.md-number-keyboard .md-popup, .md-number-keyboard .md-popup-box{
    z-index: 2403 !important;
}

.md-popup.bottom .md-popup-box{
  z-index: 2403 !important;
}
.md-tabs .md-tab-content-wrapper{
  min-height: 0rem !important;
}

  .loginContainer {
    background-image: url('../styles/back_img.jpg');
    height: 100%;
    background-repeat: round;
  }
</style>