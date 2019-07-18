import AbstractModel from "./AbstractModel";

class AdminModel extends AbstractModel {
  async login(username, password) {
    const result = await super.post('/api/admin/login', { username, password });
    console.log('login', result);
    return result.data;
  };
}

export default AdminModel;
