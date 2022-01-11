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

import { Table, } from 'antd'
import moment from "moment"
import { useEffect, useState } from "react"
import { useMemfireDBV2 } from "../../utils"

interface IProps {
  form: ISearchForm;
}
function SearchResult (props: IProps) {
  const { form, } = props

  const { queryL3List, } = useMemfireDBV2()
  const [result, setResult] = useState<IL3DataV2[]>([])
  useEffect(() => {
    const initData = async () => {
      const [startTime, endTime] = form.dateRange
      const params = {
        from: 0,
        to: 1000,
        startTime: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
      }
      const res = await queryL3List(params)
      setResult(res || [])
    }
    initData()
  }, [form])
  const dataSource = result.map(item => {
    const { post, } = item
    return post
  })
  const columns = [
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "三好一改",
      dataIndex: "postCount",
      key: "postCount",
    },
    {
      title: "主动评论数",
      dataIndex: "replyComout",
      key: "replyComout",
    },
    {
      title: "被动评论数",
      dataIndex: "commentCount",
      key: "commentCount",
    },
  ];
  const showTotal = (total: number) => `共 ${total} 条`
  return <>
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey='id' 
      pagination={{ position: ['topRight', 'bottomRight'], showQuickJumper: true, showTotal, }}
    />
  </>
}

export default SearchResult