import React from 'react';
import style from '../../styles/userinfo.module.css'
export default class OfflineOrder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{}
        }
    }
    componentDidMount() {
        this.setState({
            userInfo: this.props.userInfo
        })
    }
    render() {
        const {userInfo}= this.state;
        // console.log(userInfo)
        return (
                <div className={style.userInfo}>
                    <div><label>用户姓名：</label>{userInfo.memberRealName}</div>
                    <div><label>用户手机号：</label>{userInfo.memberPhone}</div>
                    <div><label>邀请人手机号：</label>{userInfo.memberInviterPhone}</div>
                </div>
        )
    }

}
