import React from 'react';
import {Fragment} from 'react';
import Header from "../components/common/Header";
import OrderItem from "../components/common/Order_Item";
import UserInfo from "../components/common/UserInfo";
import style from "../styles/offlineorder.module.css";
import storage from "../util/setStorage";
export default class OfflineOrder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            id: '',
            orderNo: '',
            status: 0,
            crowdfundingName: '',
            createDate: '',
            crowdfundingPartPrice: '',
            number: 0,
            sum: 0,
            memberInviterPhone:'',
            memberPhone: '',
            memberRealName: ''
        };
        this.token=storage.getItem('token')
    }
    componentWillMount(){
        // let url=document.location.href;
        // let new_url=url.substring(url.lastIndexOf('?')+1);
        // let arr=new_url.split('=');
        // let token=arr[1];
        const query= this.props.location.query;
        // const id=query.id;
        // const token=query.token;
          window.axios({
              url: window.API.Crowd_funding.query_order+304,
              method: 'GET',
              headers:{
                  'Authorization': this.token
              }
          }).then(res=>{
              // const path=res.path;
              // const id=path.substring(path.lastIndexOf('/')+1)//获取id值
              // console.log(res)
              setTimeout(()=>{
                  this.setState({
                      id:0,
                      orderNo: res.data.orderNo,
                      status: res.data.status,
                      crowdfundingName: res.data.crowdfundingName,
                      createDate: res.data.createDate,
                      crowdfundingPartPrice: res.data.crowdfundingPartPrice,
                      number: res.data.number,
                      sum: res.data.sum,
                      key: '',
                      memberInviterPhone:res.data.memberInviterPhone,
                      memberPhone: res.data.memberPhone,
                      memberRealName: res.data.memberRealName
                  })
              },1000)
          }).catch(err=>{
              console.log(err)
          })

    }
    render() {
        const state= this.state;

        return (
            <Fragment>
                <Header/>
                <div className={style.container}>
                    <OrderItem key={state.key} state={state}/>
                    <UserInfo key={state.key} userInfo={state}/>
                </div>
            </Fragment>
        )
    }

}
