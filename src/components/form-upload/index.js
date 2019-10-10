import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import OssModel from '@/models/OssModel';
import COS from 'cos-js-sdk-v5';
import BMF from 'browser-md5-file';

class FormUpload extends React.Component {

  state = {
    defaultFileList: null,
    break: 0
  }

  uploadToOss = (file) => {
    return new Promise((resolve, reject) => {
      const bmf = new BMF();
      bmf.md5(file, (err, md5) => {
        const { name } = file;
        const ext = name.split('.').pop();

        if (err) {
          console.log('err', err);
          reject(err);
          return;
        }
        const cos = new COS({
          async getAuthorization(options, callback) {
            const secretInfo = await new OssModel().fetchTempSecretInfo();
            const credentials = secretInfo.credentials;
            console.log('secretInfo', secretInfo);
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              ExpiredTime: secretInfo.expiredTime
            });
          }
        });
        const Key = `mall/image/${md5}.${ext}`;
        cos.putObject({
          Bucket: 'lg-jaj9ub0g-1254151762',
          Region: 'ap-shanghai',
          Key,
          Body: file,
          onProgress: function (progressData) {
            console.log('上传中', JSON.stringify(progressData));
          },
        }, function (err, data) {
          console.log('success', err, data);
          const url = `https://lg-jaj9ub0g-1254151762.cos.ap-shanghai.myqcloud.com/${Key}`;
          resolve(url);
        });
      },
        progress => {

        });
    });
  }

  beforeUpload = (file, fileList) => {
    const { beforeUpload, onChange, fileList: propFileList } = this.props;
    if (!beforeUpload || beforeUpload(file)) {
      console.log('beforeUpload', file, fileList)
      this.uploadToOss(file).then((url) => {
        file.url = url;
        onChange && onChange({ file, fileList: propFileList.concat(fileList) });
      });
    }
    return false;
  }

  render() {
    const { onChange, beforeUpload, vaule, fileList = [],
      listType: propListType, maxLength = 10, ...rest } = this.props;
    // if (fileList.length === 0) {
    //   fileList.push(...defaultFileList)
    // }
    console.log('FormUpload render props', this.props.defaultFileList, fileList, this.props);
    const Buttons = {
      'picture-card': (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      ),
      picture: (
        <Button icon="upload">
          上传文件
        </Button>
      )
    };
    let listType = 'picture';
    switch (propListType) {
      case 'picture-card':
        listType = propListType;
        break;
      case 'picture':
      default:
    }
    // 上传按钮
    let UploadButton = Buttons[listType];
    if (maxLength <= fileList.length) {
      UploadButton = null;
    }

    return (
      <div className="form-upload" >
        <Upload
          className="form-upload-item upload-file"
          beforeUpload={this.beforeUpload}
          accept=".jpg,.jpeg,.png"
          multiple={true}
          listType={listType}
          onChange={onChange}
          fileList={fileList}
          // disabled={fileList.length === maxLength}
          {...rest}
        >
          {UploadButton}
        </Upload>
        {}
        <div className="form-upload-item description" >
          只能上传jpg / png文件，且不超过10MB
        </div>
      </div>
    );
  }
}


export default FormUpload;
