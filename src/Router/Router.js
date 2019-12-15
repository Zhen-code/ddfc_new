import React, {Component} from 'react';
import { HashRouter ,Switch,Route} from 'react-router-dom'
import dynamicComponent from './AsyncComponent'

const Home = dynamicComponent(()=>import(/* webpackChunkName: "Home" */ '../screen/Home'));
const AboutUs = dynamicComponent(()=>import(/* webpackChunkName: "Home" */ '../screen/AboutUs'));
const BankCard = dynamicComponent(()=>import(/* webpackChunkName: "BankCard" */ '../screen/BankCard'));
const AlterBankCard = dynamicComponent(()=>import(/* webpackChunkName: "AlterBankCard" */ '../screen/AlterBankCard'));
const Member = dynamicComponent(()=>import(/* webpackChunkName: "Member" */ '../screen/Member'));
const DDList = dynamicComponent(()=>import(/* webpackChunkName: "DDList" */ '../screen/DDList'));
const DDWallet = dynamicComponent(()=>import(/* webpackChunkName: "DDWallet" */ '../screen/DDWallet'));
const Propaganda = dynamicComponent(()=>import(/* webpackChunkName: "Propaganda" */ '../screen/Propaganda'));
const DetailsTransfer = dynamicComponent( ()=>import(/* webpackChunkName: "DetailsTransfer" */'../screen/DetailsTransfer'));
const MyOrder = dynamicComponent( ()=>import(/* webpackChunkName: "MyOrder" */'../screen/MyOrder'));
const OfflineOrder = dynamicComponent( ()=>import(/* webpackChunkName: "OfflineOrder" */'../screen/OfflineOrder'));
const MemberShipDeclaration = dynamicComponent( ()=>import(/* webpackChunkName: "MemberShipDeclaration" */'../screen/MemberShipDeclaration'));
const MyIncome = dynamicComponent( ()=>import(/* webpackChunkName: "MyIncome" */'../screen/MyIncome'));
const DeclarationOfflinePayment = dynamicComponent( ()=>import(/* webpackChunkName: "DeclarationOfflinePayment" */'../screen/DeclarationOfflinePayment'));
export default class Router extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/AboutUs'} exact component={AboutUs}/>
                    <Route path={'/DDWallet'} exact component={DDWallet}/>{/*嘟嘟钱包*/}
                    <Route path={'/BankCard/:money'} exact component={BankCard}/>{/*银行卡*/}
                    <Route path={'/AlterBankCard'} exact component={AlterBankCard}/>{/*银行卡修改添加*/}
                    <Route path={'/Member'} exact component={Member}/>{/*嘟嘟会员*/}
                    <Route path={'/DDList'} exact component={DDList}/>{/*嘟嘟豆记录*/}
                    <Route path={'/Propaganda'} exact component={Propaganda}/>{/*嘟嘟宣传页*/}
                    <Route path={'/DetailsTransfer'} exact component={DetailsTransfer}/>{/*提现转账明细*/}
                    <Route path={'/MyOrder'} exact component={MyOrder}/>{/*我的订单*/}
                    <Route path={'/OfflineOrder'} exact component={OfflineOrder}/>{/*订单详情*/}
                    <Route path={'/MemberShipDeclaration'} exact component={MemberShipDeclaration}/>{/*嘟嘟会员报单*/}
                    <Route path={'/MyIncome'} exact component={MyIncome}/>{/*获取我的收益*/}
                    <Route path={'/DeclarationOfflinePayment'} exact component={DeclarationOfflinePayment}/>{/*嘟嘟会员报单线下付款
*/}
                </Switch>
            </HashRouter>
        )
    }
}
