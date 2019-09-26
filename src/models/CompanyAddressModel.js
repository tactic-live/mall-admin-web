import AbstractModel from './AbstractModel';


class CompanyAddressModel extends AbstractModel {

  /**
   * 获取退货地址列表
   */
  async fetchReturnCompanyAddressList(id) {
    const result = await super.get('/api/companyAddress/list');
    return result.data;
  };
}

export default CompanyAddressModel;
