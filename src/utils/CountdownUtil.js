/**
 * Created by lam on 2018/8/13.
 */
export default class CountdownUtil {

    /** 定时器 */
    interval = null;

    /**
     * 创建定时器
     *
     */
    static setTimer(countdownDate, callbak) {
        this.interval = setInterval(() => {
            let time = this.getDateData(countdownDate)
            callbak && callbak(time)
        }, 1000)
    }

    /**
     * 侄计时计算 --> 通过此方法计算,可以解决应用退出后台的时候,定时器不走
     * @param countdownDate
     * @return {*}
     */
    static getDateData(countdownDate) {
        let diff = (Date.parse(new Date(countdownDate)) - Date.parse(new Date)) / 1000;

        if (diff <= 0) {
            this.stop() // 倒计时为0的时候, 将计时器清除
            return 0;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };

        if (diff >= (365.25 * 86400)) {
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
        return timeLeft;
    }

    /**
     * 数字补零 --> 例: 00时01分59秒
     * @param num
     * @param length
     * @return {*}
     */
    static leadingZeros(num, length = null) {

        let length_ = length;
        let num_ = num;
        if (length_ === null) {
            length_ = 2;
        }
        num_ = String(num_);
        while (num_.length < length_) {
            num_ = '0' + num_;
        }
        return num_;
    }

    /** 清除定时器 */
    static stop() {
        console.log('停止计时');
        clearInterval(this.interval);
    }
};
