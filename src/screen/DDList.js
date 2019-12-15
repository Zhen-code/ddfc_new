import React from 'react';
import Header from "../components/common/Header";
import style from "../styles/ddlist.module.css";
export default class DDList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ddlist:[]
        }
    }
    componentDidMount() {
        // const token =storage.getItem('token')
        let url=document.location.href;
        let new_url=url.substring(url.lastIndexOf('?')+1);
        let arr=new_url.split('=');
        let token=arr[1];
        console.log(token);
        window.axios({
            url: window.API.Dudu.dudu_log,
            method:'GET',
            headers:{
                 'Authorization': token
             },
            params:{
                pageIndex: 1,
                pageSize: 12
            }
        }).then((res)=>{
            console.log(res)//暂无数据
            if(res.code ===200){
                if(res.data.list.length!==0){
                    this.setState((preState)=>{
                        preState.ddlist=res.data.list
                    })
                }else{
                    window.alert('暂无嘟嘟豆记录')
                }
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <div className={style.container}>
                <ul className={style.dd_list}>
                    <li className={style.listItem}>发生日期</li>
                    <li className={style.listItem}>行为动作</li>
                    <li className={style.listItem}>数量</li>
                    <li className={style.listItem}>余额</li>
                </ul>
                    <ul className={style.list}>
                        <li className={style.item}>
                            <p>2019-10-11</p>
                            <p>购买套餐</p>
                            <p>+2000</p>
                            <p>12000</p>
                        </li>
                        <li className={style.item}>
                            <p>2019-10-11</p>
                            <p>购买套餐</p>
                            <p>+2000</p>
                            <p>12000</p>
                        </li>
                        <li className={style.item}>
                            <p>2019-10-11</p>
                            <p>购买套餐</p>
                            <p>+2000</p>
                            <p>12000</p>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }

}
