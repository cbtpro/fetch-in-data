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

interface IProps {
  data: IViewData[];
  comments: IViewData[];
}
function Summary (props: IProps) {
  const { data, comments, } = props
  let reports: ISummary[] = []
  const allComments = comments.map(item => {
    return item.commentList.list
  }).flat()
  data.forEach(item => {
    const { user_id, nick_name, name, commentList, } = item
    const newCommentCount = commentList.list.filter(item => item.user_id !== user_id).length
    const userReport = reports.find(report => report.userId === user_id)
    if (userReport) {
      const { postCount, commentCount, } = userReport
      userReport.postCount = postCount + 1
      userReport.commentCount = commentCount + newCommentCount
    } else {
      reports.push({
        userId: user_id,
        nickName: nick_name,
        name,
        postCount: 1,
        commentCount: newCommentCount,
        replyComout: 0,
      })
    }
  })
  reports = reports.map(item => {
    const { userId, } = item
    const allMyCommentCount = allComments.filter(item => item.user_id === userId).length
    return {
      ...item,
      replyComout: allMyCommentCount,
    }
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
      dataSource={reports}
      columns={columns}
      pagination={{ position: ['topRight', 'bottomRight'], showQuickJumper: true, showTotal, }}
      rowKey="userId"
      size="small"
    />
  </>
}

export default Summary