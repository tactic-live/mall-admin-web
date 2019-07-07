import AbstractModel from "./AbstractModel";

class OssModel extends AbstractModel {
  async fetchTempSecretInfo() {
    const api = '/api/qcloud/oss/policy';
    const result = await super.get(api);
    return result.data;
  }
}

export default OssModel;
