import React from 'react';
import {Fragment} from 'react';
import Header from "../components/common/Header";
import style from "../styles/myorder.module.css";
import shop_url from "../assets/image/shop.png";
import more from "../assets/image/picture_more.png";
import storage from "../util/setStorage";
export default class MyOrder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            countAll: 0,
            countMoney:0,
            token: ''
        }
        this.token=storage.getItem('token')
    }
    componentDidMount() {
        // let url=document.location.href;
        // let new_url=url.substring(url.lastIndexOf('?')+1);
        // let arr=new_url.split('=');
        // window.token=arr[1];
        let countAll=0,countMoney=0;
        this.setState({
            token:  this.token
        })
        window.axios({
            url:window.API.Crowd_funding.order_list+'?pageIndex='+1+'&pageSize='+12,
            method: 'GET',
            headers:{
                'Authorization':  this.token
            }
        }).then(res=>{
           if(res.code===200){
               if(res.data.list){
                   res.data.list.map(item=>{
                       countAll+=item.crowdfundingSell;
                       countMoney+=(item.crowdfundingSell*item.crowdfundingPartPrice)//获取总数量//获取总钱数
                   })
               }
               // console.log(res.data.list)
               this.setState({
                   list: res.data.list,
                   countAll,
                   countMoney
               })
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    goDetail(id){
        const {token}=this.state;
        this.props.history.push({pathname:'/OfflineOrder',query:{id:id,token:token}});
    }
    render() {
        const {list,countAll,countMoney} =this.state;
        return (
            <Fragment>
                <Header/>
                <div className={style.container}>
                    <ul>
                        <li>
                                    <div className={style.image}>
                                        <img src={more} />
                                    </div>
                                    <div className={style.content}>
                                        <div>DrF-高型房车</div>
                                        <div>已认筹：6666份</div>
                                        <div>单价：666元／份</div>
                                    </div>
                                    <div className={style.right_price}>
                                        <p>¥66466</p>{/*每个订单总价*/}
                                    </div>
                                </li>
                    </ul>
                    <div className={style.total}>
                        <div className={style.image}>
                            <img src={shop_url}  alt={"商品"}/>
                        </div>
                        <div className={style.more}>
                            <img src={more}/>
                        </div>
                        <div className={style.price}>
                            <div>¥{countMoney}</div>
                            <div className={style.number}>共{countAll}份</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}
