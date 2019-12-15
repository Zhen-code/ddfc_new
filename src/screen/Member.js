import React from 'react';
import Header from "../components/common/Header";
import style from "../styles/member.module.css";
import storage from "../util/setStorage";
export default class Member extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ordinary_users:[],
            team_manager:[],
            team_director:[],
            pageIndex: 1,//当前页
            pageSize: 6,//每页数量
            token: '',
            index: 0,//顶部三项索引值
            direct:0,//直推人数
            indirect:0,//间推人数
            pageTotal:0,//总共条数
            pageArr:[]//页码数
        }
        this.token=storage.getItem('token')
    }
    componentDidMount() {
       window.show()
       window.axios({
        url:window.API.Inviter.iniviter_list+'?pageIndex='+this.state.pageIndex+'&pageSize='+this.state.pageSize,
        headers:{
            'Authorization': this.token
        },
        method:'GET'
       }).then(res=>{
        if(res.code===200){
            window.hide()
            //获取所有的数据暂时都为普通用户
            if(res.data.list.length!==0){
                //获取普通用户
               const ordinary_users=res.data.list.filter(item=>{
                    if (item.memberId===1) {
                        return item
                    }
                })
               //获取团队经理
                const team_manager=res.data.list.filter(item=>{
                    if (item.memberId===2){
                        return item
                    }
                })
                //获取总监
                const team_director=res.data.list.filter(item=>{
                    if (item.memberId===3){
                        return item
                    }
                })
                const direct=res.data.list.filter(item=>{
                    if (item.type===1){
                        return item
                    }
                })
                const indirect=res.data.list.filter(item=>{
                    if (item.type===2){
                        return item
                    }
                })
                const pageTotal=Math.ceil(res.data.total/this.state.pageSize)
                this.setState({
                    ordinary_users,
                    team_manager,
                    team_director,
                    direct:direct.length,
                    indirect: indirect.length,
                    pageTotal:pageTotal,
                })
            }
        }
       }).catch(err=>{
        window.showText('网络出错!')
       })

    }
    getMember(id){
        this.id=id;
        this.setState({
            index:this.id
        })
    }
    goPage(page){
        window.show()
       window.axios({
        url:window.API.Inviter.iniviter_list+'?pageIndex='+page+'&pageSize='+this.state.pageSize,
        headers:{
            'Authorization': this.token
        },
        method:'GET'
       }).then(res=>{
        if(res.code===200){
            window.hide()
            //获取所有的数据暂时都为普通用户
            if(res.data.list.length!==0){
                //获取普通用户
               const ordinary_users=res.data.list.filter(item=>{
                    if (item.memberId===1) {
                        return item
                    }
                })
               //获取团队经理
                const team_manager=res.data.list.filter(item=>{
                    if (item.memberId===2){
                        return item
                    }
                })
                //获取总监
                const team_director=res.data.list.filter(item=>{
                    if (item.memberId===3){
                        return item
                    }
                })
                const direct=res.data.list.filter(item=>{
                    if (item.type===1){
                        return item
                    }
                })
                const indirect=res.data.list.filter(item=>{
                    if (item.type===2){
                        return item
                    }
                })
                const pageTotal=Math.ceil(res.data.total/this.state.pageSize)
                this.setState({
                    ordinary_users,
                    team_manager,
                    team_director,
                    direct:direct.length,
                    indirect: indirect.length,
                    pageTotal:pageTotal,
                    pageIndex: page
                })
            }
        }else{
            window.hide()
            this.setState({
                    ordinary_users:[],
                    team_manager:[],
                    team_director:[],
                    direct:0,
                    indirect: 0,
                    pageIndex: page
                })
        }
       }).catch(err=>{
        console.log(err)
       })

    }
    render() {
        const {index,direct,indirect,ordinary_users,team_manager,team_director,pageTotal,pageArr,pageIndex}=this.state;
        if(pageArr.length==0){
             for(var i=1;i<=pageTotal;i++){
            pageArr.push(i)
        }
        }
        let display;
        if(index===0){//显示普通用户
            if(ordinary_users.length!==0){
           display=(ordinary_users.map(function(item,i){
            return(
                    <li 
                    className={style.item}
                    key={i}
                    >
                        <div className={style.recommend_type}>
                            <div>推荐类型：{item.typeName}</div>
                            <div>{item.createDate}</div>
                        </div>
                        <div>用户信息：<span>{item.toObjectNickname}</span>{item.toObjectPhone}</div>
                    </li> 
                )
           })) 
        }else if(direct==0&&indirect==0){
            display=(<p>暂无普通用户推荐数据</p>)
        }
             
        }
         if(index===1){//显示团队经理
            if(team_manager.length!==0){
           display=(team_manager.map(function(item,i){
            return(
                    <li 
                    className={style.item}
                    key={i}
                    >
                         <div className={style.recommend_type}>
                            <div>推荐类型：{item.typeName}</div>
                            <div>{item.createDate}</div>
                        </div>
                        <div>用户信息：<span>{item.toObjectNickname}</span>{item.toObjectPhone}</div>
                    </li> 
                )
           })) 
        }else{
            display=(<p>暂无团队经理推荐数据</p>)
        }      
        }
        if(index===2){//显示获取总监
            if(team_director.length!==0){
           display=(team_director.map(function(item,i){
            return(
                    <li 
                    className={style.item}
                    key={i}
                    >
                         <div className={style.recommend_type}>
                            <div>推荐类型：{item.typeName}</div>
                            <div>{item.createDate}</div>
                        </div>
                        <div>用户信息：<span>{item.toObjectNickname}</span>{item.toObjectPhone}</div>
                    </li> 
                )
           })) 
        }else{
            display=(<p>暂无总监推荐数据</p>)
        }      
        }
        return (
            <div>
                <Header/>
                <ul className={style.role_list}>
                    <li className={index===0?style.active:style.role_list_item}  onClick={this.getMember.bind(this,0)}>普通用户</li>
                    <li className={index===1?style.active:style.role_list_item}  onClick={this.getMember.bind(this,1)}>团队经理</li>
                    <li className={index===2?style.active:style.role_list_item}  onClick={this.getMember.bind(this,2)}>团队总监</li>
                </ul>
                <div className={style.recommend}>
                    <div>直推人数：<span>{direct}</span>人</div>
                    <div>间推人数：<span>{indirect}</span>人</div>
                </div>
                <ul className={style.recommend_List}>
                   {display}
                </ul>
                <nav>
               <ul className={`pagination ${style.pag}`}>
              {
               pageArr.map((item,i)=>{
                    return  (<li key={i} onClick={this.goPage.bind(this,item)} className={item==pageIndex?'active':''}><a>{item}</a></li>);
                })
              }
             </ul>
</nav>
            </div>
        )
    }

}
