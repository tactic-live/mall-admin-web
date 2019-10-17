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
  static couponType = {
    0: '全场赠券',
    1: '会员赠券',
    2: '购物赠券',
    3: '注册赠券'
  };
  static couponUseType = {
    0: '全场通用',
    1: '指定分类',
    2: '指定商品'
  };
  static couponPlatform = {
    0: '全部',
    1: '移动',
    2: 'PC'
  };
  static couponUseStatus = {
    0: '未使用',
    1: '已使用',
    2: '已过期'
  };
  static couponGetType = {
    0: '后台赠送',
    1: '主动获取'
  };
  
}

export default CommonConsts;
