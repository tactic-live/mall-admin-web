import AbstractModel from "./AbstractModel";

class FlashSessionModel extends AbstractModel {
  /**
   * 获取秒杀时段列表
   * @param {*} condition 
   */
  async fetchFlashSessionList(condition) {
    const result = await super.get('/api/flashSession/selectList', condition);
    return result.data;
  };

  // 获取秒杀商品列表

  async fetchFlashProductionRelation({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/flashProductRelation/list', { pageNum, pageSize, ...res });
    return result.data;
  }

  // 更新秒杀商品
  async updateFlashProductionRelation(data) {
    const result = await super.post(`/api/flashProductRelation/update/${data.id}`, { ...data });
    return result.data;
  }

  //删除秒杀商品
  async  delectFlashProductionRelation(id) {
    const result = await super.get(`/api/flashProductRelation/delete/${id}`);
    return result.data;
  }


  // 秒杀时间段列表
  async fetchFlashSession(condition) {
    const result = await super.get('/api/flashSession/list', condition);
    return result.data;
  }

  // 修改秒杀时间段
  async updateFlashSession(condition) {
    const result = await super.post(`/api/flashSession/update/${condition.id}`, condition);
    return result.data;
  }

  // 添加秒杀时间段
  async createFlashSession(condition) {
    const result = await super.post('/api/flashSession/create', condition);
    return result.data;
  }

}


export default FlashSessionModel;
