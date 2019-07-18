import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']

const DetailHtml = (props, ref) => {
  console.log('DetailHtml props', props);
  const { detailHtml, detailMobileHtml } = props.data;
  const { getFieldDecorator } = props.form;
  return (
    <Tabs type="card" ref={ref}>
      <TabPane tab="电脑端详情" key="0">
        {getFieldDecorator('detailHtmlEditor', {
          validateTrigger: 'onBlur',
          initialValue: BraftEditor.createEditorState(detailHtml)
        })(
          <BraftEditor
            className="my-editor"
            controls={controls}
            placeholder="请输入正文内容"
          />
        )}
      </TabPane>
      <TabPane tab="移动端详情" key="1">
        {getFieldDecorator('detailMobileHtmlEditor', {
          validateTrigger: 'onBlur',
          initialValue: BraftEditor.createEditorState(detailMobileHtml)
        })(
          <BraftEditor
            className="my-editor"
            controls={controls}
            placeholder="请输入正文内容"
          />
        )}
      </TabPane>
    </Tabs>
  );
}

export default React.forwardRef(DetailHtml);
