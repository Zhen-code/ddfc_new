import React from 'react';
import {Fragment} from 'react';
import Header from "../components/common/Header";
import style from "../styles/propaganda.module.css";
import shop from "../assets/image/shop.png";
export default class Propaganda extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <Header/>
                <div className={style.container}>
                    <div>
                        <img src={shop} alt={"商品"} className={style.img}/>
                    </div>
                    <div className={style.content}>
                        美好嘟嘟房车宣传页
                    </div>
                </div>
            </Fragment>
        )
    }

}
