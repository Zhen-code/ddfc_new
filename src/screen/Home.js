import React from 'react';
import style from '../styles/home.module.css'
import Header from "../components/common/Header"
import storage from "../util/setStorage"
export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token:'',
            phone:'13000000000',
            // phone:'17820563432',
            password:'123456',
        }
        this.login=this.login.bind(this)
        this.register=this.register.bind(this)
    }
    show=()=>{
        window.showToast('6666666')
    }
    componentDidMount() {
        // window.show();

    }
    login(){
        // const {token} =this.state;
        window.axios({
            url: 'http://dev.lux1.beiru168.com/api/v1/member/login?phone='+this.state.phone+'&password='+this.state.password,
            method:'POST',
            // headers:{
            //     'Authorization': token
            // },
    }).then((res)=>{
            if(res.code ===200){
                window.showToast('登录成功!')
                const token=res.data.token;
                window.token=token
                storage.setItem('token',token)
            }
        }).catch((err)=>{
                console.log(err)
        })
    }
    register(){
            const list=storage.getItem('token')
            console.log(list)
    }
    render() {
        return (
            <div>
            <Header/>
            <ul className={style.list}>
            <li onClick={()=>{this.props.history.push('/MyOrder')}}>我的订单</li>
            <li onClick={()=>{this.props.history.push('/DDWallet')}}>嘟嘟钱包</li>
            <li onClick={()=>{this.props.history.push('/DetailsTransfer')}}>提现转账明细</li>
            <li onClick={()=>{this.props.history.push('/Member')}}>我的嘟嘟团队</li>
            <li onClick={()=>{this.props.history.push('/MyIncome')}}>我的收益</li>
            </ul>
                <div className={style.footer}>
                    <span className={style.btn1}><button type="button" className={"btn btn-primary"} onClick={this.login}>登录</button></span>
                    <span className={style.btn2}><button type="button" className="btn btn-primary" onClick={this.register}>注册</button></span>
                </div>
            </div>
        )
    }

}
