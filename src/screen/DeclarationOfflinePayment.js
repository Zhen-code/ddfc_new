import React from 'react';
import Header from "../components/common/Header"
import style from "../styles/declarationofflinepayment.module.css"
export default class DeclarationOfflinePayment extends React.PureComponent {
    render() {
        return (
            <div style={{background:'#EDEDED'}}>
                <Header/>
                <div>
                    <div className={style.seperate}></div>
                    <span className={style.selected_packages}>已选套餐</span>
                </div>
                <div className={style.container}>
                    <ul className={style.list}>
                        <li className={style.item}>
                            <div><span>NTF 炫酷房车1-1</span><span>x3</span></div>
                            <div>总价：700000.00元</div>
                            <div>单价：20000.00元</div>
                        </li>
                    </ul>
                    <div className={style.package}>
                        <div>共2个套餐包</div>
                        <div>需支付尾款:<span style={{color:'#FF2424',fontSize:'16px'}}>¥133000.00元</span></div>
                    </div>
                    <div className={style.order_num}>
                        <div>订单号：5445464545245223</div>
                        <div>用户姓名：杨坤</div>
                        <div>用户手机号：130-0611-1487</div>
                        <div>申请时间：2019-10-15 15:45</div>
                    </div>
                    <div className={style.confirm_info}>
                        <div>确认付款信息（长按以下信息复制，打开网银转账）</div>
                        <div>企业名称： 深圳市杰迈科技有限公司</div>
                        <div>开户银行：深圳分行</div>
                        <div>银行账号：2457663214562144</div>
                    </div>
                </div>
                <div className={style.commit}>确认提交</div>
            </div>
        )
    }

}
