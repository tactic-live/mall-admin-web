import React from 'react';
import FormUpload from '@/components/form-upload';
import { Form } from 'antd';
import { uniqueId } from 'lodash';

const ProductAlbumPics = (props, ref) => {
  const { pic, albumPics } = props.data;
  const { getFieldDecorator } = props.form;
  const albumPicList = [];
  if (pic) {
    const name = (pic || '').split('/').pop();
    albumPicList.push({
      uid: `${name}_0`,
      name,
      status: 'done',
      url: pic,
      thumbUrl: pic
    })
  }
  if (albumPics) {
    albumPics.split(',').forEach((albumPicUrl, index) => {
      const name = (albumPicUrl || '').split('/').pop();
      albumPicList.push({
        uid: `${name}_${index + 1}`,
        name: name,
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
  return (
    <div>
      {
        getFieldDecorator('albumPicList', {
          initialValue: albumPicList,
          valuePropName: 'fileList',
          getValueFromEvent: normFile
        })(<FormUpload
          listType="picture-card"
          ref={ref}
          maxLength={5}
        />)
      }
    </div>
  )
}

export default React.forwardRef(ProductAlbumPics);
