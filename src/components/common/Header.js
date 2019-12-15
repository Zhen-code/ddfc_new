import React from 'react';
import style from '../../styles/header.module.css';
import fan_hui from '../../assets/image/icon_fanhui.png';
// import more from '../../assets/image/more.png'
export default class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            title:'',
            goBack:1
        }
    }
    goBack1=()=>{
        console.log('一级页面');
        window.useAndroid.back();
    };
    goBack2=()=>{
        console.log(66666)
        window.history.back(-1);
    };
    componentDidMount() {
      let url=document.location.href;//获取当前路径url
        let start=url.indexOf('#')+2;
        let title=url.substring(start);
        if(title==='MyOrder'||title==='DDWallet'||title==='Member'||title==='MemberShipDeclaration'||title==='MyIncome'){
            this.setState({
                goBack:2
            })
        }else{
            this.setState({
                goBack:2
            })
        }
        switch (title){
            case 'MyOrder' :
                title='我的订单';
                break;
            case 'BankCard' :
                title='嘟嘟钱包';
                break;
            case 'Propaganda':
                title='宣传页';
                break;
            case 'Member' :
                title='嘟嘟会员';
                break;
            case 'OfflineOrder' :
                title='我的订单';
                break;
            case 'DDWallet' :
                title='嘟嘟钱包';
                break;
            case 'DDList' :
                title='嘟嘟豆列表统计';
                break;
            case 'DetailsTransfer' :
                title='提现转账明细';
                break;
            case 'DeclarationOfflinePayment':
                title='嘟嘟会员报单线下付款';
                break;
            case 'AlterBankCard':
                title='嘟嘟钱包';
                break;
            case 'MyIncome':
                title='我的收益';
                break;
            case 'MemberShipDeclaration':
                title='嘟嘟会员报单';
                break;
            default:
                title='';
                break;
        }
        if(url.indexOf('OfflineOrder')!==-1){
                title='我的订单'
        }else if(url.indexOf('BankCard')!==-1){
                title='嘟嘟钱包'
        }
        this.setState((preState)=>{
            return {
                title
            }
        })
    }
    go(){
        const {goBack}=this.state;
        if(goBack===1){
            this.goBack1()
        }else{
            this.goBack2()
        }
    }
    render() {
        const {title,goBack} =this.state;
        console.log(goBack===1)
        return (
            <div>
                <div className={style.header}>
                    <span onClick={this.go.bind(this)}><img src={fan_hui} alt={"返回"}/></span>
                    <span>{title}</span>
                    <span><img/></span>
                </div>
            </div>
        )
    }

}