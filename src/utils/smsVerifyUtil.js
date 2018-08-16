/**
 * Created by lam Date: 2018/8/14 Time: 下午5:07
 */
import CountdownUtil from "./CountdownUtil";
import ToastUtil from "./ToastUtil";
import {fetchRequest} from "./FetchUtil";

/**
 * 获取码验证
 */
const pressVerify = (phone, isSentVerify, callBack1, callBack2, callBack3) => {
    if (phone.length === 11) {
        if (isSentVerify === true) {
            // 倒计时时间
            let countdownDate = new Date(new Date().getTime() + 60 * 1000);
            // 点击之后验证码不能发送网络请求
            callBack1();

            let formData = new FormData();
            // formData.append('phone', this.state.phone);
            formData.append('phone', phone);
            fetchRequest('sms', 'POST', formData)
                .then(res => {
                    console.log(res);
                    if (res.respCode === 200) {

                        CountdownUtil.setTimer(countdownDate, (time) => {
                            // console.log(time.sec);
                            callBack2(time);

                        });
                    } else {
                        callBack3();

                        ToastUtil.showShort(res.respMsg);
                    }
                }).catch(err => {
                // ToastUtil.showShort(err);

                callBack3();
                console.log(err);
            });

        }
    } else {
        ToastUtil.showShort('请输入正确的手机号');
    }
}

export {
    pressVerify
}
