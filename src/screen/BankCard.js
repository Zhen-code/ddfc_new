import React from 'react';
import style from '../styles/bankcard.module.css';
import Header from "../components/common/Header";
import storage from "../util/setStorage";
export default class BankCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token:'',
            dududou:0,//获取嘟嘟豆钱包余额
            captcha: '',//验证码
            bankCardNo:'',//银行卡号
            bankName:'',//银行卡名称
            holder:'',//开户人
            count: 60,//设计倒计时初始值
            counting: false//是否倒计时中
        };
        this.token=window.token;
    }
    componentDidMount() {
        let money=parseInt(this.props.match.params.money);//获取嘟嘟钱包提现跳转过来的数据
        const token=storage.getItem('token')
        this.setState({
            token,
            dududou: money
        })
        window.axios({
            url:window.API.BankCard.bank_card,//获取绑定的银行卡
            headers: {
                'Authorization': token
            }
        }).then((res)=>{
            console.log(res);
            if(res.code===200){
               const {bankCardNo,bankName,holder}=res.data;
               if(bankCardNo===''){
                   window.showToast('当前暂无绑定银行卡')
               }else{
                   const start=bankCardNo.substring(0,4);
                   const end=bankCardNo.substring(14,18);
                   const newBankNo=start+'**** ****'+end;
                   this.setState({
                       bankCardNo:newBankNo,
                       bankName,
                       holder
                   })
               }
               }
        }).catch((err)=>{
            console.log(err)
        })
        const input=this.refs.input;
        input.focus()

    }
    getCaptcha(){//获取验证码
        window.axios({
            url: window.API.Withdraw.withdraw_captcha,
            method: 'POST',
            headers: {
                'Authorization': this.token
            }
        }).then((res)=>{
            if(res.code===200){
                window.showToast('验证码发送成功!')
            }
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
        this.send()//触发定时器
    }
    send=()=>{
        this.timer()
    };
   timer=()=>{//设置定时器
        this.time=setInterval(()=>{
            const {count}=this.state;
            this.setState({
                count: count-1,
                counting: true
            });
            if(count===1){
                this.setState({
                    counting: false,
                    count:60
                })
                this.clearInterval();
            }
        },1000)
   }
    clearInterval=()=>{//清除倒计时
        clearInterval(this.time)
    }
    handleCaptcha(e){//处理输入的验证码
        this.setState({
            captcha: e.target.value
        })
    }
    alterBank=()=>{
        this.props.history.push({pathname:'/AlterBankCard'})
    }
    // 提交申请
    commit=()=>{
        const {token,captcha,dududou}=this.state;
        if(captcha===''){
            window.showToast('验证码不能为空!')
            return
        }else if(dududou==0){
            window.showToast('暂无可提现的嘟嘟豆')
            return
        }
        window.axios({
            url: window.API.Withdraw.withdraw+'?captcha='+captcha+'&dudu='+dududou,
            method: 'POST',
            headers:{
                'Authorization': token
            }
        }).then(res=>{
           if(res.code==500){
                window.showToast('验证码错误！')
           }else if(res.code==200){
                window.showToast('提现成功!')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    componentWillUnmount() {
        this.clearInterval()
    }

    render() {
        const {bankCardNo,bankName,count,counting}=this.state;
        let bankcard_display;
        if(bankCardNo==''&&bankName==''){
            bankcard_display=(<div className={style.bank_card}>
                              <div>暂无绑定的银行卡数据</div>
                               </div>)
        }else{
             bankcard_display=(<div className={style.bank_card}>
                              <div>{bankName}</div>
                              <div className={style.bankCardNo}>
                              <div>{bankCardNo}</div>
                               <div onClick={this.alterBank.bind(this)}>修改银行卡</div>
                               </div>
                               </div>)
        }
        return (
            <div>
                <Header/>
                <div className={style.container}>
                    {bankcard_display}
                    <div className={style.get_code}>
                        <input placeholder={"验证码"} className={style.get_Input} onChange={this.handleCaptcha.bind(this)} ref="input"/>
                        <button type="button" className={style.gosend}  disabled={counting} onClick={this.getCaptcha.bind(this)} style={{marginLeft:'20px'}}>{counting?`${count}秒后重发`:'获取验证码'}</button>
                    </div>
                    <div className={style.commit} onClick={this.commit}>提交</div>
                </div>
            </div>
        )
    }

}
