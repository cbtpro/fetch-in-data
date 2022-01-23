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
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Table, } from 'antd'
import { useEffect, useState } from "react"
import useDataV2 from '../../hooks/use-data-v2'
import { setUsers } from '../../redux/demo'

interface IProps {
  form: IFilterFormV2;
  users: IUserV2[];
  onSetUsers: (users: IUserV2[]) => void;
}
function SearchResult (props: IProps) {
  const { form, onSetUsers, } = props
  const { getDataSource, } = useDataV2()
  const [result, setResult] = useState<IL3DataV2[]>([])
  useEffect(() => {
    const initData = async () => {
      const { dateRange, groups, users, } = form
      const params: IFilterFormV2 = {
        from: 0,
        to: 1000,
        dateRange,
        groups,
        users,
      }
      const {usersData, l3DataV2} = await getDataSource(params)
      onSetUsers(usersData.map(item => {
        const {
          user_id,
          nick_name,
          wx_avatar,
          real_name,
          group,
          company,
        } = item
        return {
          user_id,
          nick_name,
          wx_avatar,
          real_name,
          group: `${group}组`,
          company,
        }
      }))
      setResult(l3DataV2 || [])
    }
    initData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.dateRange])
  const data = result.map(item => {
    const { post, } = item
    return post
  })
  const allComments = data.map(item => {
    return item.commentList.list
  }).flat()

  let dataSource: ISummary[] = []
  data.forEach(item => {
    const { user_id, nick_name, commentList, } = item
    const newCommentCount = commentList.list.filter(item => item.user_id !== user_id).length
    const userReport = dataSource.find(report => report.userId === user_id)
    if (userReport) {
      const { postCount, commentCount, } = userReport
      userReport.postCount = postCount + 1
      userReport.commentCount = commentCount + newCommentCount
    } else {
      if (form.users.indexOf(user_id) !== -1) {
        dataSource.push({
          userId: user_id,
          nickName: nick_name,
          name: '',
          postCount: 1,
          commentCount: newCommentCount, // 被动评论数
          replyComout: 0,
        })
      }
    }
  })
  dataSource = dataSource.map(item => {
    const { userId, } = item
    const allMyCommentCount = allComments.filter(item => item.user_id === userId).length
    return {
      ...item,
      replyComout: allMyCommentCount, // 主动评论数
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
      dataSource={dataSource}
      columns={columns}
      rowKey='userId' 
      pagination={{ position: ['topRight', 'bottomRight'], showQuickJumper: true, showTotal, }}
    />
  </>
}

const mapStateToProps = (state: any) => ({
  users: state.demo.users,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onSetUsers: setUsers,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult)