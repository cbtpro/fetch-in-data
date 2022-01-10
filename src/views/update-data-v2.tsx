// Copyright 2022 cbtpro
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { useMemfireDBV2, } from '../utils';

function UpdateDataV2 () {
  const { updateL3List, } = useMemfireDBV2()
  const [fileList, setFileList] = useState<UploadFile<any>[]>([])
  const [uploading, setUploading] = useState(false)
  const handleUpload = async () => {
    setUploading(true)
    try {
      const [ file, ] = fileList
      const jsonText = await (file as unknown as File).text()
      const l3Data = JSON.parse(jsonText)
      const { data, } = l3Data
      if (data) {
        const datas = (data as IItem[]).map(d => {
          const { id, created_at, } = d
          return {
            post_id: id as unknown as string,
            post: d,
            post_create_at: created_at as unknown as string,
          }
        })
        const res = await updateL3List(datas)
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false)
    }
  };
  const onRemoveHandle = (file: UploadFile<any>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList)
  }
  const beforeUpload = (file: any) => {
    setFileList([
      ...fileList,
      file,
    ])
    return false;
  }
  return <>
    <Upload maxCount={1} onRemove={onRemoveHandle} beforeUpload={beforeUpload}>
      <Button icon={<UploadOutlined />}>Select File</Button>
    </Upload>
    <Button
      type="primary"
      onClick={handleUpload}
      disabled={fileList.length === 0}
      loading={uploading}
      style={{ marginTop: 16 }}
    >
      {uploading ? 'Uploading' : 'Start Upload'}
    </Button>
  </>
}
export default UpdateDataV2