import React from 'react';
import style from '../styles/aboutUs.module.css'

export default class AboutUs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count:0,
            counting:false
        }

    }
    phone=()=>{
        this.send()
    }
    send=()=>{
        this.setState({
            counting:true,
            count: 60
        })
        this.setInterval()
    }
    setInterval=()=>{
        this.timer=setInterval(this.countDown,1000)
    }
    countDown=()=>{
        const {count}=this.state
        if(count===1){
            this.clearInterval()
            this.setState({
                counting:false
            })
        }else{
            this.setState({
                counting:true, count: count-1
            })
        }
    }
    clearInterval=()=>{
        clearInterval(this.timer)
    }
    componentWillUnmount() {
        this.clearInterval()
    }

    render() {
        const {count,counting}=this.state;
        return (
            <div className={style.page}>
                <button disabled={counting} onClick={this.phone}>
                    {counting?`${count}秒后重发`:'获取验证码'}
                </button>
            </div>
        )
    }
}


