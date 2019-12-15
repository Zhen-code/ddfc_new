import React from 'react';
import {Fragment} from 'react';
import Header from "../components/common/Header";
import style from "../styles/myicome.module.css";
import  storage from "../util/setStorage";
export default class MyIncome extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            profitDay: 0,//收益天数
            sumProfit: 0,//总收益
            profitList:[]//收益列表数据
        }
         this.token=storage.getItem('token')
    }
    componentDidMount() {
        // let url=document.location.href;
        // let new_url=url.substring(url.lastIndexOf('?')+1);
        // let arr=new_url.split('=');
        // let token=arr[1];
        window.show()
        window.axios({
            url: window.API.Dudu.profit_log,
            method:'GET',
            headers:{
                'Authorization': this.token
            }
        }).then(res=>{
            if(res.code===200){
                this.setState({
                    profitDay: res.data.profitDay,
                    sumProfit:res.data.sumProfit
                })
            }
        }).then(()=>{
            window.axios({//获取近一个月的收益数量
                url: window.API.Dudu.profit_list,
                method:'GET',
                headers:{
                    'Authorization': this.token
                }
            }).then(res=>{
                if(res.code===200){
                     window.hide()
                    if(res.data.length===0){
                        
                    }else{
                        this.setState({
                            profitList:res.data
                        })
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
         const {profitDay,sumProfit,profitList}=this.state;
         let display;
         if(profitList.length===0){
            display=(<p>近一个月暂无收益</p>)
        }else{
            display=(profitList.map((item,index)=>{
                return(
            <div>
            <div className={style.time} key={index}>
            <span>{item.date}</span>
            <span>收入<span style={{fontSize:'20px', color:'#0072FF'}}>+{item.sum}</span></span>
            </div>
            <ul>
            if(item.profitList.length===0){
               
            }else{
                item.profitList.map((profit,index)=>{
                 return(
            <li key={index}>
            <div>
            <span>{profit.info}</span>
            <span>+{profit.number}</span>
            </div>
            <div>类型：{profit.typeName}</div>
            </li> 
                    )
            })    
            }
            </ul>
            </div>)
             }))
              }
        return (
            <Fragment>
                <Header/>
                <div className={style.profit}>
                    <span>总收益：<label>{sumProfit}</label>嘟嘟豆</span>
                    <span>已收益天数：<label>{profitDay}</label>天</span>
                </div>
                <div className={style.container}>
                {display}
                </div>
            </Fragment>
        )
    }

}
