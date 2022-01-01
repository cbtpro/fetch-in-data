import { useState, useEffect, useRef } from "react";
import { Button, Drawer, Space, Table } from "antd";
import Comment from '../components/Comment'
import defaultData from "../assets/data/default.json";

function FetchInFromJSON() {
  const { data } = defaultData as unknown as IRawData;
  const dataSource: IViewData[] = data.map((item) => {
    const {
      id,
      app_id,
      community_id,
      user_id,
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
      nick_name,
      content: text,
      commentList,
      created_at,
    };
  });
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
  const [comments, setComments] = useState<ICommentList>()

  const showDrawer = (commentList: ICommentList) => {
    setComments(commentList)
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
      filters: nickNames.map((item) => {
        const { user_id, nick_name } = item;
        return {
          text: nick_name,
          value: nick_name,
        };
      }),
      onFilter: (value: any, record: IViewData) => {
        return record.nick_name.indexOf(value) === 0;
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
        const { list, total_count } = commentList || {}
        const url = `https://appoxpkjya89223.h5.xiaoeknow.com/feedDetail?feedId=${id}&communityId=${community_id}`;
        return (
          <Space size="middle">
            {
              total_count > 0 ?
              <Button type="link" onClick={() => showDrawer(commentList)}>
                查看{total_count}条评论（非实时）
              </Button> : ''
            }
            <a href={url} target="_blank" rel="noopener noreferrer">
              去评论（新开页面）
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        size="small"
      />
      ;
      <Drawer
        title="详情"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="400px"
      >
        { comments ? <Comment list={comments.list} /> : '' }
      </Drawer>
    </>
  );
}

export default FetchInFromJSON;
