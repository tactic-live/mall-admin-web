import React from 'react';
import FormUpload from '@/components/form-upload';
import { Form } from 'antd';
import { uniqueId } from 'lodash';

const ProductAlbumPics = (props, ref) => {
  const { pic, albumPics } = props.data;
  const { getFieldDecorator } = props.form;
  const productAlbumPicsDefaultFileList = [];
  if (pic) {
    productAlbumPicsDefaultFileList.push({
      uid: uniqueId('pic_'),
      name: (pic || '').split('/').pop(),
      status: 'done',
      url: pic,
      thumbUrl: pic
    })
  }
  if (albumPics) {
    albumPics.split(',').forEach((albumPicUrl) => {
      productAlbumPicsDefaultFileList.push({
        uid: uniqueId('albumPics_'),
        name: (albumPicUrl || '').split('/').pop(),
        status: 'done',
        url: albumPicUrl,
        thumbUrl: albumPicUrl
      })
    });
  }
  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  console.log('productAlbumPicsDefaultFileList', productAlbumPicsDefaultFileList)
  return (
    <div>
      {
        getFieldDecorator('productAlbumPicsDefaultFileList', {
          initialValue: productAlbumPicsDefaultFileList,
          valuePropName: 'fileList',
          getValueFromEvent: normFile
        })(<FormUpload
          listType="picture-card"
          ref={ref}
        />)
      }
    </div>
  )
}

export default React.forwardRef(ProductAlbumPics);
