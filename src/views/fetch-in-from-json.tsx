import { useState, } from "react";
import { Avatar, Button, Drawer, Form, Space, Switch, Table } from "antd";
import CommentList from '../components/CommentList'
import defaultData from "../assets/data/default.json";

function FetchInFromJSON() {
  const { data } = defaultData as unknown as IRawData;
  const [filterHasComment, setFilterHasComment] = useState(false)
  const rawDataSource: IViewData[] = [...data].map((item) => {
    const {
      id,
      app_id,
      community_id,
      user_id,
      wx_avatar,
      nick_name,
      content,
      commentList,
      created_at,
    } = item;
    const { text } = content;
    return {
      id,
      app_id,
      community_id,
      user_id,
      wx_avatar,
      nick_name,
      content: text,
      commentList,
      created_at,
    };
  })
  let dataSource = [...rawDataSource].filter(d => {
    if (filterHasComment) {
      return d.commentList.list.length > 0
    }
    return true
  })
  const distinct: <T>(array: T[], ...rest: string[]) => T[] = (
    array,
    ...rest
  ) => {
    const results: any[] = [];
    array.forEach((item: any) => {
      const index = results.findIndex((element) => {
        return rest.every((r: any) => element[r] === item[r]);
      });
      if (index === -1) {
        results.push(item);
      }
    });
    return results;
  };
  const nickNames = distinct(
    dataSource
      .map((item) => {
        const { user_id, nick_name } = item;
        return {
          user_id,
          nick_name,
        };
      })
      .sort((a, b) => {
        return a.nick_name.localeCompare(b.nick_name);
      }),
    "user_id"
  );

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<IViewData>()

  const showDrawer = (record: IViewData) => {
    setCurrent(record)
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "昵称",
      dataIndex: "nick_name",
      key: "nick_name",
      width: "200px",
      filterSearch: true,
      filters: nickNames.map((item) => {
        const { nick_name } = item;
        return {
          text: nick_name,
          value: nick_name,
        };
      }),
      onFilter: (value: any, record: IViewData) => {
        return record.nick_name.indexOf(value) === 0;
      },
      render: (text: any, record: any, index: number) => {
        const { wx_avatar, } = record
        return (
          <>
            <Space>
              <Avatar src={wx_avatar} alt={text} />
              {text}
            </Space>
          </>
        )
      },
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "发布时间",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a: IViewData, b: IViewData) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      },
      width: "200px",
    },
    {
      title: "详情",
      dataIndex: "url",
      key: "url",
      width: "320px",
      render: (text: any, record: any, index: number) => {
        const { id, community_id, commentList, } = record;
        const { total_count } = commentList || {}
        const url = `https://appoxpkjya89223.h5.xiaoeknow.com/feedDetail?feedId=${id}&communityId=${community_id}`;
        return (
          <Space size="middle">
            {
              total_count > 0 ?
              <Button type="link" onClick={() => showDrawer(record)}>
                查看{total_count}条评论（非实时）
              </Button> : ''
            }
            <a href={url} target="_blank" rel="noopener noreferrer">
              去评论
            </a>
          </Space>
        );
      },
    },
  ];
  const onFilterChange = (filter: boolean) => {
    setFilterHasComment(filter)
  }

  return (
    <>
      <Form>
        <Form.Item label="只看有评论的" valuePropName="checked">
          <Switch onChange={onFilterChange} />
        </Form.Item>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        size="small"
      />
      ;
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="400px"
      >
        { current ? <CommentList data={current} /> : '' }
      </Drawer>
    </>
  );
}

export default FetchInFromJSON;
