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

}


export default FlashSessionModel;
