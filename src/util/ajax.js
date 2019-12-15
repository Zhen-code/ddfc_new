import axios from 'axios';

function ajax(url,data={},type,token){
    let promise
    return new Promise((resolve, reject) => {
        if(type=='GET'){
            let str=''
            if(data.toString()!='{}'){
                data.Object.keys(data).forEach((item) => {
                    str+=item+'='+data[item]+'&'
                })
                let param=str.substring(0, str.indexOf('&'))
                let newStr=url+param
                promise=axios.get(newStr,{
                    headers:{
                        'Authorization': token
                    }
                })
            }
        }else{
            promise=axios.post(url,data,{
                headers:{
                    'Authorization': token
                }
            })
        }
        promise.then(function(response){
            resolve(response)
        }).catch(function(err){
            reject(err)
        })
    });
}
export default ajax
window.ajax=ajax