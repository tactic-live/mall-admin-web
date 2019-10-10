class CommonConsts {
  static DUMMY = 'DUMMY';
  static publishStatus = {
    0: '下架',
    1: '上架'
  };
  static orderStatus = {
    0: '待付款',
    1: '待发货',
    2: '已发货',
    3: '已完成',
    4: '已关闭',
    5: '无效订单'
  };
  static sourceType = {
    0: 'PC订单',
    1: 'app订单'
  };
  static payType = {
    0: '未支付',
    1: '支付宝',
    2: '微信'
  };
  static orderType = {
    0: '正常订单',
    1: '秒杀订单'
  };
  
}

export default CommonConsts;
