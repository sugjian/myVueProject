import axios from 'axios';
import { Toast } from 'mand-mobile'

let util = {

};


// const ajaxUrl='http://localhost:8000/renren-fast/app/wx/';
const ajaxUrl='http://116.62.4.26:8080/50fa/app/wx/';


window.UPLOAD_IMG_URL='http://yihaokongjian-image.housailei.info/';



util.post = function (url, param,cb) {
    let axiosIns = axios.create({
        baseURL: ajaxUrl,
        timeout: 30000,
        headers: {"Content-Type": "application/json",
                  "token":localStorage.getItem('token')
        }
    });
    Toast.loading('加载中...');
    axiosIns.post(ajaxUrl+url, param ).then( res => {  
        Toast.hide();
        console.log("ajax1>>>>>>>>>",res.data);
        if(res&&res.status==200&&res.data&&res.data.code==0){
            cb(res.data);
        }else{
            Toast.failed(res.data.msg);          
        }
        
    }).catch(err => {
        Toast.hide();
        Toast.failed('连接服务器失败！');  
        console.log(err);
    })
};



util.copy=function (datas) {
    let obj={};  
    obj=JSON.parse(JSON.stringify(datas));
    return obj    
};


util.usertypeName=function(type){
    if(type==1){
        return "总经理";
      }else if(type==2){
        return "总经办";
      }else if(type==3){
        return "店长";
      }else if(type==4){
        return "市场部经理";
      }else if(type==5){
        return "业务人员";
      }else if(type==6){
        return "设计师";
      }
}

util.statusName=function(type){
    if(type==0){
        return "报备客户";
      }else if(type==1){
        return "见面客户";
      }else{
        return "签约客户";
      }
}

util.qianyueName=function(type){
    if(type==0){
        return "定金客户";
      }else if(type==1){
        return "签约客户";
      }else{
        if(type){
            return type;
        }else{
            return '';
        }
        
      }
}

export default util;
