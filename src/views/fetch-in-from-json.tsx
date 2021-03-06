import { useEffect, useState, } from "react";
import { useNavigate, } from 'react-router-dom'
import { Avatar, Button, Drawer, Form, Space, Switch, Table } from 'antd'
import useData, { UNKNOWN, } from '../hooks/use-data'
import CommentList from '../components/CommentList'
import { useQuery } from "../hooks/user-query";

function FetchInFromJSON(props: any) {
  let navigate = useNavigate();
  const query = useQuery();
  const [filterHasComment, setFilterHasComment] = useState(false)
  

  const [rawDataSource, setRawDataSource] = useState<IViewData[]>()
  const { getDataSource, } = useData()
  useEffect(() => {
    const { id, } = query
    if (!id) {
      navigate('/')
      return
    }
    const initData = async () => {
      try {
        const data = await getDataSource(Number.parseInt(id as string, 10))
        setRawDataSource(data)
      } catch (error) {
        console.error(error)
      }
    }
    initData()
  }, [])
  let dataSource = [...(rawDataSource || [])].filter(d => {
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
      title: "??????",
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
      title: "??????",
      dataIndex: "group",
      key: "group",
      width: "80px",
      filters: [
        {
          text: UNKNOWN,
          value: UNKNOWN,
        },
        {
          text: '1???',
          value: '1???',
        },
        {
          text: '2???',
          value: '2???',
        },
        {
          text: '3???',
          value: '3???',
        },
        {
          text: '4???',
          value: '4???',
        },
        {
          text: '5???',
          value: '5???',
        },
        {
          text: '6???',
          value: '6???',
        },
        {
          text: '7???',
          value: '7???',
        },
        {
          text: '8???',
          value: '8???',
        },
        {
          text: '9???',
          value: '9???',
        },
        {
          text: '10???',
          value: '10???',
        },
        {
          text: '11???',
          value: '11???',
        },
        {
          text: '12???',
          value: '12???',
        },
        {
          text: '13???',
          value: '13???',
        },
        {
          text: '14???',
          value: '14???',
        },
        {
          text: '15???',
          value: '15???',
        },
        {
          text: '16???',
          value: '16???',
        },
        {
          text: '17???',
          value: '17???',
        },
        {
          text: '18???',
          value: '18???',
        },
        {
          text: '19???',
          value: '19???',
        },
        {
          text: '20???',
          value: '20???',
        },
      ],
      onFilter: (value: any, record: IViewData) => {
        return record.group === value;
      },
    },
    {
      title: "??????",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "????????????",
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
      title: "??????",
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
                ??????{total_count}????????????????????????
              </Button> : ''
            }
            <a href={url} target="_blank" rel="noopener noreferrer">
              ?????????
            </a>
          </Space>
        );
      },
    },
  ];
  const onFilterChange = (filter: boolean) => {
    setFilterHasComment(filter)
  }
  const [commentList] = [(rawDataSource || []).map(r => r.commentList.list).flat()]
  const showTotal = (total: number) => `??? ${total} ???`
  return (
    <>
      ???{(rawDataSource || []).length}????????????{commentList.length}????????????
      <Form>
        <Form.Item label="??????????????????" valuePropName="checked">
          <Switch onChange={onFilterChange} />
        </Form.Item>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ['topRight', 'bottomRight'], showQuickJumper: true, showTotal, }}
        rowKey="id"
        size="small"
      />
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
