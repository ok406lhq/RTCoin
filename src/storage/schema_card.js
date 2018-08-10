/**
 * Created by zerowolf Date: 2018/5/3 Time: 上午11:28
 */

import Realm from 'realm';
import realm from "./realm";

export class CardSchema extends Realm.Object {

}

CardSchema.schema = {
    name: 'Card',
    properties: {
        merCode: 'int',                                               //用户ID 用作多账号管理的唯一标识
        bankPhone: 'string',                                            //银行卡预留手机号(根据卡片,可以不同)
        bankCard: {type: 'string', default: '6228480038115651200'},    //银行卡号
        bank: {type: 'string', default: '招商银行'},                   //所属银行
        bankMark: {type: 'string', default: 'abc'},                  //银行唯一标识  例如:abc 中国农业银行
        cardType: {type: 'string', default: 'DC'},                  //CC  信用卡     DC 储蓄卡    SCC 准贷记卡  PC 预付费卡
        isDefault: {type: 'bool', default: false},                 //false  非默认卡     true 默认卡

        isComplete: {type: 'bool', default: false},                 //false  信息是否完善(信用卡)     true 默认卡

        creditCvn2: {type: 'string', default: ''},               //信用卡cvn2(cardType==CC时可以有值)
        creditValidDay: {type: 'string', default: ''},               //信用卡有效期(cardType==CC时可以有值)
        creditRepayDay: {type: 'string', default: ''},          //信用卡还款日(cardType==CC时可以有值)
        creditBillingDay: {type: 'string', default: ''}        //信用卡账单日(cardType==CC时可以有值)

    }
};


/**
 * 拿到商户下所有银行卡
 * @param merCode
 * @returns {Realm.Results<T>}
 */
const getAllCard = (merCode) => {
    let allCard = realm.objects('Card');
    let filterList = allCard.filtered(`merCode == '${merCode}'`);
    return filterList;
}

/**
 * 拿到卡片长度
 * @param merCode
 * @returns {number}
 */
const getCardLength = (merCode) => {
    console.log(merCode);
    let allCard = realm.objects('Card');
    let allCardList = allCard.filtered(`merCode == '${merCode}'`);
    for (let key in allCardList) {
        console.log(allCardList[key]);
    }
    console.log(allCardList.length);
    return allCardList.length;
};


/**
 *
 * @param merCode
 * @param bankCard
 * @param bank
 * @param bankPhone
 * @param bankMark
 * @param cardType
 * @param isDefault
 * @param isComplete
 * @param creditCvn2
 * @param creditValidDay
 * @param creditRepayDay
 * @param creditBillingDay
 */
const addSingleBankCard = (merCode, bankCard, bank, bankPhone, bankMark, cardType, isDefault,
                           isComplete,
                           creditCvn2,
                           creditValidDay,
                           creditRepayDay,
                           creditBillingDay) => {
    realm.write(() => {
        realm.create('Card', {
            merCode: merCode,   //预留手机号
            bankCard: bankCard,//银行卡号
            bank: bank,
            bankPhone: bankPhone,   //预留手机号
            bankMark: bankMark,
            cardType: cardType,//0  支付卡     1 储蓄卡
            isDefault: isDefault,

            isComplete: isComplete,

            creditCvn2: creditCvn2? creditCvn2 : '',               //信用卡cvn2(cardType==CC时可以有值)
            creditValidDay: creditValidDay?creditValidDay : '',               //信用卡有效期(cardType==CC时可以有值)
            creditRepayDay: creditRepayDay ?creditRepayDay : '',          //信用卡还款日(cardType==CC时可以有值)
            creditBillingDay: creditBillingDay ? creditBillingDay : '',

        });
    });

};

/**
 * 拿到默认结算卡   cardType  1  表示结算卡
 * @returns {Realm.Results<T>}
 */
const getDebitCardDefault = (merCode) => {
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`cardType == 'DC' and isDefault == true and merCode == '${merCode}'`);
    return filterList[0];
};


/**
 * 拿到默认结算卡   cardType  1  表示结算卡
 * @returns {Realm.Results<T>}
 */
const getCreditCardDefault = (merCode) => {
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`cardType == 'CC' and isDefault == true and merCode == '${merCode}'`);
    return filterList[0];
};

/**
 * 拿到支付卡
 * @returns {Results<T>}
 * @param merCode
 */
const getCreditCardList = (merCode) => {
    let allCard = realm.objects('Card');
    let filterList = allCard.filtered(`cardType == 'CC' and merCode == '${merCode}'`);
    return filterList;
};

/**
 * 拿到结算卡   cardType  DC  表示结算卡
 * @returns {Realm.Results<T>}
 */
const getDebitCardList = (merCode) => {
    let allCard = realm.objects('Card');
    let filterList = allCard.filtered(`cardType == 'DC' and merCode == '${merCode}'`);
    return filterList;
};

const deleteAllCard = () => {
    realm.write(() => {

        let allCard = realm.objects('Card');
        realm.delete(allCard);
    })
};

const getCardInfoById = (merCode, bankCard) => {
    let allCard = realm.objects('Card');
    let filterList = allCard.filtered(`merCode == '${merCode}' and bankCard == '${bankCard}'`);
    return filterList[0];
};

/**
 * 修改完善数据库中某条信用卡的信息
 * @param merCode
 * @param bankCard
 * @param creditValidDay
 * @param creditCvn2
 * @param creditRepayDay
 * @param creditBillingDay
 */
const editCardInfoById = (merCode,bankCard,creditValidDay,creditCvn2,creditRepayDay,creditBillingDay)=>{

    realm.write(() => {

        let allCard = realm.objects('Card');
        let filterList = allCard.filtered(`merCode == '${merCode}' and bankCard == '${bankCard}'`);

        let creditItem = filterList[0];

        console.log('filterList: ', filterList);

        console.log('creditItem: ', creditItem);

        creditItem.creditValidDay = creditValidDay;
        creditItem.creditCvn2 = creditCvn2;
        creditItem.creditRepayDay = creditRepayDay;
        creditItem.creditBillingDay = creditBillingDay;

        creditItem.isComplete = true;
    });
}

export {
    // addSingleBankCard,
    // getCardLength,
    // getCreditCardList,
    // getDebitCardList,
    // getDebitCardDefault,
    // getCreditCardDefault,
    // getAllCard,
    // deleteAllCard,
    // getCardInfoById,
    // editCardInfoById
};
