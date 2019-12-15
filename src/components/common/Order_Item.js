import React from 'react';
import {Fragment} from 'react';
import style from '../../styles/order_item.module.css'
import shop from "../../assets/image/shop.png";
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pState:{}
        }
    }
    componentDidMount() {
        this.setState({
            pState:  this.props.state
        })
    }

    render() {
        const {pState}= this.state;
        const status=pState.status;
        let newStatu;
        if(status!==0){
            switch (status) {
                case 1:
                    newStatu='未确认';
                    break;
                case 2:
                    newStatu='订单取消';
                    break;
                case 3:
                    newStatu= '押金支付成功';
                    break;
                case 4:
                    newStatu='订单完成';
                    break;
                default:
                    newStatu='订单异常';
                    break;
            }
        }
        return (
            <Fragment>
                <div className={style.item}>
                    <div className={style.order_number}>
                        <span>订单号：{pState.orderNo}</span>
                        <button>{newStatu}</button>
                    </div>
                    <div className={style.detail}>
                        <div className={style.image}>
                            <img src={shop} alt={"商品"}/>
                        </div>
                        <div className={style.content}>
                            <div><span>{pState.crowdfundingName}</span><span className={style.x}>ｘ{pState.number}</span></div>
                            <div>申请时间：{pState.createDate}</div>
                            <div>单价：{pState.crowdfundingPartPrice}元／份</div>
                        </div>
                        <div className={style.right_price}>
                            <p>¥{pState.number*pState.crowdfundingPartPrice}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}
