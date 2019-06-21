import QueryString from 'query-string';

class AbstractModel {
  api = ''
  async execute(options) {
    const { path, headers = {}, ...rest } = options;
    const searchApi = path || this.api;
    // 设置其他参数
    const opts = Object.assign({ credentials: 'include' }, rest);

    // 设置默认的content-type
    const tmpHeaders = Object.assign({
      'content-type': 'application/json'
    }, headers);
    opts.headers = tmpHeaders;
    console.log('opts', opts)
    const response = await fetch(searchApi, opts);
    return response.json();
  }

  get(api, params) {
    let path = api;
    if (params) {
      path = `${api}?${QueryString.stringify(params)}`;
    }
    return this.execute({
      path
    });
  }

  async post(api, params) {
    return this.execute({
      path: api,
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  async patch(api, params) {
    return this.execute({
      path: api,
      method: 'PATCH',
      body: JSON.stringify(params)
    });
  }
}

export default AbstractModel;
