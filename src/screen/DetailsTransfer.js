import React from 'react';
import {Fragment} from 'react';
import storage from '../util/setStorage';
import Header from "../components/common/Header";
import style from '../styles/detailstransfer.module.css';
import icon_jingbi from '../assets/image/icon_jingbi.png';
export default class DetailsTransfer extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state={
            withdraw_log: [],
            pageIndex:1,
            pageSize:6
        }
        this.token=storage.getItem('token')
    }
    componentDidMount() {
      window.show()
        // let url=document.location.href;
        // let new_url=url.substring(url.lastIndexOf('?')+1);
        // let arr=new_url.split('=');
        // let token=arr[1];
           window.axios({
               url: window.API.Withdraw.withdraw_log,
               method: 'GET',
               params:{
                pageIndex:this.state.pageIndex,
                pageSize:this.state.pageSize
               },
               headers:{
                   'Authorization': this.token
               }
           }).then(res=>{
               console.log(res)
               if(res.code===200){
                window.hide()
                   if(res.data.list.length===0){
                    window.showToast('记录为空!')
                   }else{
                       this.setState({
                           withdraw_log: res.data.list
                       })
                   }
               }
           }).catch(err=>{
               console.log(err)
           })
    }

    render() {
      const {withdraw_log}=this.state
      let display;
      if(withdraw_log.length!=0){
        display=(
          withdraw_log.map((item,i) => {
            let status;
            if(item.status===1){
            status='提交申请'
            }else if(item.status===2){
            status='完成申请'
            }else{
            status='申请失败'
            }
            return(
                 <li className={style.item} key={i}>
                        <div className={style.image}>
                            <img src={icon_jingbi} alt={"金币"}/>
                        </div>
                        <div className={style.content}>
                            <p>{status}</p>
                            <p>{item.createDate}</p>
                        </div>
                        <div className={style.money}>-{item.dudu}</div>
                    </li>
              )
          })
          )
      }else{
           display=(<p>暂无记录</p>) 
      }
        return(
            <Fragment>
                <Header/>
            <div className={style.container}>
                <ul className={style.list}>
                   {display}
                </ul>
            </div>
            </Fragment>
        )
    }
}