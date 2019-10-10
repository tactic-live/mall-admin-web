import AbstractModel from "./AbstractModel";

class FlashModel extends AbstractModel {
  /**
   * 获取秒杀列表
   * @param {*} condition 
   */
  async fetchFlashList(condition) {
    const result = await super.get('/api/flash/list', condition);
    return result.data;
  };


  /**
   * 更新数据
   * @param {*} condition 
   */

  async updateFlash(condition) {
    const result = await super.post(`/api/flash/update/${condition.id}`, {
      ...condition.status
    });
    return result.data;
  };

  
  /**
   * 添加数据
   * @param {*} condition 
   */

  async createFlash(condition) {
    const result = await super.post(`/api/flash/create`, {
      ...condition.status
    });
    return result.data;
  };

  

  /**
   * 上下线
   * @param {*} condition 
   */

  async fetchFlashStatust(condition) {
    console.log('condition', condition)
    const result = await super.put(`/api/flash/update/status/${condition.id}`, {
      status: condition.status
    });
    return result.data;
  };
}


export default FlashModel;
