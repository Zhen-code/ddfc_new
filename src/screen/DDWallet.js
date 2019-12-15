import React from 'react';
import Header from "../components/common/Header"
import style from "../styles/ddwallet.module.css"
import storage from "../util/setStorage"
export default class DDWallet extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,
            duduDou: 0,
            token:'',
            isdisable:false
        }

        this.goCommit=this.goCommit.bind(this)
    }
    componentDidMount() {
        let token=storage.getItem('token')
        // let url=document.location.href;
        // let new_url=url.substring(url.lastIndexOf('?'));
        // let arr=new_url.split('=');
        // window.token=arr[1];
        this.setState({
            token
        })
        window.axios({
            url: window.API.Mine.info,
            method:'GET',
            headers:{
                'Authorization': token
            }
        }).then(res=>{
            console.log(res)
            if(res.code===200){
                this.setState({
                    duduDou:res.data.duduDou
                })
            }
        }).catch(err=>{
            console.log(err)
        })

    }
    handler=(e)=>{//处理文本框变化的数据
        let textAlpha=/([^\.\d])/g
        if(textAlpha.test(e.target.value)){
           this.input.value=''
        }
        const money=e.target.value;
        const startReg=/^0+/
        if(startReg.test(money)||money>this.state.duduDou){
            window.showToast('输入金额不能为0开头或金额数不能大于当前余额')
            this.setState({
                isdisable:true
            })
        }else {
             this.setState({
                isdisable:false
            })
        }
        this.setState({
            money
        })
    }
    checkMoney(e){
        let temp=/^\d+\.?\d{0,2}$/
        if(temp.test(e.target.value)){

        }else{
            let str=e.target.value.substr(0,e.target.value.length-1)
            e.target.value=str
        }
    }
    checkEnd(e){
        if(e.target.value.indexOf('.')!=-1){
            let end=e.target.value.indexOf('.')
            if(end===e.target.value.length-1){
                let newStr=e.target.value+'00'
                e.target.value=newStr
            }
        }
}
withdrawAll=()=>{//全部提现
    const {duduDou}=this.state;
    this.setState({
        money:duduDou
    })
}
 goCommit(){//提交跳转到银行卡界面
        const {money,token} =this.state;
        this.props.history.push({pathname:"/BankCard/"+money})
    }
    render() {
        const {duduDou,money,isdisable}=this.state;
        return (
            <div>
                <Header/>
                <div className={style.container}>
                    <div className={style.content}>
                        <div className={style.content_head}>嘟嘟豆提现至银行卡</div>
                        <div className={style.content_center}>
                            <span>￥</span>
                            <input type={'text'} value={money===0?'':money} ref={el=>this.input =el} onChange={this.handler.bind(this)} style={{width:'200px'}} maxLength={10} onKeyUp={this.checkMoney.bind(this)} onBlur={this.checkEnd.bind(this)}/>
                        </div>
                        <div className={style.footer}>
                            <div className={style.dd}>嘟嘟豆：¥{duduDou}</div>
                            <div className={style.tx} onClick={this.withdrawAll}>全部提现</div>
                        </div>
                    </div>
                    <button className={isdisable?style.cash_with:style.cash_withdrawal} onClick={this.goCommit} disabled={isdisable?true:false}>提现到银行卡</button>
                </div>
            </div>

        )
    }

}
