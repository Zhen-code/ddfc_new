import React from 'react';
import Header from "../components/common/Header";
import style from "../styles/alterbankcard.module.css";
import storage from "../util/setStorage";
import luhnCheck from "../util/luhnCheck";
export default class AlterBankCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bankCardNo: '',
            holder: ''
        };
        this.token=storage.getItem('token')
    }
    handelCardNo(e){
        let bcn=/[^\d]/;
        if(bcn.test(e.target.value)){
            e.target.value=''
        }else if(e.target.value!==''){
            this.setState({
                bankCardNo: e.target.value
            })
        }
    }
    handelName(e){
        if(e.target.value!==''){
            this.setState({
                holder: e.target.value
            })
        }
    }
     addBC(){
        const {bankCardNo,holder}=this.state;
        if(bankCardNo.length==0 || holder===''){
            window.showToast('银行卡号与持卡人姓名必须填写！')
            return;
        }
        if(luhnCheck(bankCardNo)){
            window.axios({
                url: window.API.BankCard.bind+'?bankCardNo='+bankCardNo+'&holder='+holder,
                method:'POST',
                data:{
                    bankCardNo:bankCardNo,
                    holder:holder
                },
                headers:{
                    'Authorization': this.token
                },
            }).then((res)=>{//此处银行卡都绑定成功!
               if(res.code==200){
                window.showToast('添加成功!')
               }else{
                window.showToast('绑定失败!')
               }
            }).catch((err)=>{
                    console.log(err)
            })
        }else{
            window.showToast('请输入正确的银行卡号!')
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <div className={style.bank_info}>
                    <div className={style.write_info}>请填写银行卡信息</div >
                    <div className={style.info_input}>
                        <div><label>银行卡帐号：</label><input type="text" onChange={this.handelCardNo.bind(this)}/></div >
                        <div><label>开户人姓名：</label><input type="text" onChange={this.handelName.bind(this)}/></div >
                    </div>
                    <div className={style.ok_btn} onClick={this.addBC.bind(this)}>确认添加</div>
                </div>
            </div>
        )
    }

}
