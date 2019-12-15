const domain = 'http://dev.lux1.beiru168.com';

const API = {
    // 个人信息
    Mine: {
        info: `${domain}/api/access/v1/member/info`,//获取用户信息
        save_info: `${domain}/api/access/v1/member/info`,//保存用户信息
        poster: `${domain}/api/access/v1/member/poster`,//获取推广海报
        real_name: `${domain}/api/access/v1/member/real-name`,//保存真实姓名
        captcha: `${domain}/api/v1/member/captcha`,//用户身份验证验证码
        login: `${domain}/api/v1/member/login`,//登录
        register: `${domain}/api/v1/member/register`,//注册
        reset_pw: `${domain}/api/v1/member/rest-password`//重置密码
    },
    Dudu: {
        dudu_log: `${domain}/api/access/v1/dudu-log/list`,//嘟嘟豆记录
        profit_log: `${domain}/api/access/v1/dudu-log/profit/info`,//嘟嘟豆收益信息
        profit_list:`${domain}/api/access/v1/dudu-log/profit/list`//嘟嘟豆收益列表(30天)
    },
    WeiXin: {
        init: `${domain}/api/v1/weixin/jsapi/init`//JSAPI初始化
    },
    Crowd_funding: {
        crowd_funding_list: `${domain}/api/access/v1/crowdfunding/list`,//众筹列表
        cancel_order: `${domain}/api/access/v1/crowdfunding/order/cancel/{orderId}`,//取消订单
        order_compute:`${domain}/api/access/v1/crowdfunding/order/compute`,//订单价格计算
        order_create: `${domain}/api/access/v1/crowdfunding/order/create`,//创建订单
        order_list: `${domain}/api/access/v1/crowdfunding/order/list`,//订单列表
        pay_order: `${domain}/api/access/v1/crowdfunding/order/pay/{orderId}`,//支付订单
        query_order: `${domain}/api/access/v1/crowdfunding/order/`//查询订单信息
    },
    Withdraw: {
        withdraw: `${domain}/api/access/v1/withdraw`,//体现申请
        withdraw_log: `${domain}/api/access/v1/withdraw-log/list`,//提现记录
        withdraw_captcha: `${domain}/api/access/v1/withdraw/captcha`//提现验证码
    },
    Inviter: {
        iniviter_list: `${domain}/api/access/v1/inviter/list`,//用户邀请记录
        member: `${domain}/api/access/v1/member/inviter`//绑定邀请人
    },
    BankCard: {
        bind: `${domain}/api/access/v1/bank-card/binding`,//绑定银行卡
        bank_card: `${domain}/api/access/v1/bank-card`//已经绑定的银行卡
    }
};
export default API;
window.API = API;
