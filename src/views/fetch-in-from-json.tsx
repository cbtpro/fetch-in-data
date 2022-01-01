import { Space, Table, } from 'antd'
import defaultData from "../assets/data/default.json"

interface IItem {
  id: string;
  app_id: string;
  community_id: string;
  org_content: string;
  content: {
    text: string;
  };
  tags_content: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_json: {
    name: string;
    url: string;
    size: number | string;
    fileType: string;
  }[];
  feeds_type: number;
  user_id: string;
  title: string;
  is_chosen: number;
  is_notice: number;
  user_type: number;
  send_type: number;
  zan_num: number;
  comment_count: number;
  created_at: string;
  universal_union_id: string;
  is_exercise: number;
  is_public: number;
  me_praise: boolean;
  nick_name: string;
  wx_avatar: string;
  is_quit: number;
  user_state: number;
  is_guest: number;
  work_corp_id: string;
  work_user_id: string;
  show_time: string;
  praise_list: {
    app_id: string;
    user_id: string;
    nick_name: string;
    wx_avatar: string;
    user_type: number;
    is_guest: number;
    community_id: string;
    feed_id: string;
    work_corp_id: string;
    work_user_id: string;
  }[];
  commentList: {
    list: {
      id: number;
      app_id: string;
      community_id: string;
      feeds_id: string;
      user_id: string;
      comment: string;
      comment_resource: {
        image: any[];
        audio: any[];
      }[];
      type: number;
      main_comment_id?: string;
      reply_user_id: string;
      reply_comment_id?: string;
      send_type: number;
      created_at: string;
      praise_cnt: number;
      nick_name: string;
      wx_avatar: string;
      user_type: number;
      is_guest: number;
      reply_nick_name: string;
      reply_wx_avatar: string;
      reply_user_type: number;
      reply_is_guest: number;
      zan_num: number;
      show_time: string;
      work_corp_id: string;
      work_user_id: string;
      reply_work_corp_id: string;
      reply_work_user_id: string;
    }[];
    total_count: number;
  };
  is_self: boolean;
  login_user_id: string;
  tags: any[];
}
interface IRawData {
  code: number;
  msg: string;
  data: IItem[];
  feeds_num: number;
}

interface IViewData {
  id: string;
  app_id: string;
  community_id: string;
  user_id: string;
  nick_name: string;
  content: string;
  created_at: string;
}
function FetchInFromJSON() {
  const { feeds_num, data } = defaultData as unknown as IRawData;
  const dataSource: IViewData[] = data.map((item) => {
    const { id, app_id, community_id, user_id, nick_name, content, created_at } = item;
    const { text } = content;
    return {
      id,
      app_id,
      community_id,
      user_id,
      nick_name,
      content: text,
      created_at,
    };
  });
  const distinct: <T>(array: T[], ...rest: string[]) => T[] = (array, ...rest) => {
    const results: any[] = []
    array.map((item: any) => {
      const index = results.findIndex(element => {
        return rest.every((r: any) => element[r] === item[r])
      })
      if (index === -1) {
        results.push(item)
      }
    })
    return results
  }
  const nickNames = distinct(dataSource.map(item => {
    const { user_id, nick_name, } = item
    return {
      user_id,
      nick_name,
    }
  }).sort((a, b) => {
    return a.nick_name.localeCompare(b.nick_name)
  }), 'user_id')
  const columns = [
    {
      title: '昵称',
      dataIndex: 'nick_name',
      key: 'nick_name',
      width: '200px',
      filters: nickNames.map(item => {
        const { user_id, nick_name, } = item
        return {
          text: nick_name,
          value: nick_name,
        }
      }),
      onFilter: (value: any, record: IViewData) => {
        return record.nick_name.indexOf(value) === 0
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '发布时间',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: IViewData, b: IViewData) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      },
      width: '200px',
    },
    {
      title: '详情',
      dataIndex: 'url',
      key: 'url',
      width: '100px',
      render: (text: any, record: any, index: number) => {
        const { id, community_id, } = record
        const url = `https://appoxpkjya89223.h5.xiaoeknow.com/feedDetail?feedId=${id}&communityId=${community_id}`
        return (
          <Space size="middle">
            <a href={url} target="_blank" rel="noreferrer">去评论</a>
          </Space>
        )
      }
    },
  ]
  return <Table
    dataSource={dataSource}
    columns={columns}
    rowKey="id"
    size="small"
  />;
}

export default FetchInFromJSON;
