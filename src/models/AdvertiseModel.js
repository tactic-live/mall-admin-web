import AbstractModel from "./AbstractModel";

class AdvertiseModel extends AbstractModel {
  /**
   * 获取广告列表
   * @param {Object} {
   * @param {Integer} pageNum 页数
   * @param {Integer} pageSize 一页显示的条数
   * @param {String} name 广告名称
   * @param {Integer} type 广告位置
   * @param {String} endTime 到期时间
   * }
   */
  async fetchAdvertiseList({ pageNum = 1, pageSize = 5, ...res }) {
    const result = await super.get('/api/home/advertise/list', { pageNum, pageSize, ...res });
    return result.data;
  };

  /**
   * 更改广告上线状态
   * @param {Object} {
   * @param {Integer} id 广告id
   * @param {Integer} status 修改状态 0下线 1上线
   * }
   */
  async updateAdvertiseStatus({ id, status }) {
    const result = await super.patch('/api/home/advertise/status', { id, status });
    return result.data;
  }

  /**
   * 删除广告
   */
  async deleteAdvertise(ids = []) {
    const result = await super.delete('/api/home/advertise/delete', { ids });
    return result.data;
  }

  /**
   * 增加广告
   */
  async addAdvertise(adParams = {}) {
    const result = await super.post('/api/home/advertise/create', adParams);
    return result.data;
  }

}

export default AdvertiseModel;
