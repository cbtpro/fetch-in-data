import React, { useEffect, useState } from "react"
import { Space, Table, } from 'antd'
import { useMemfireDB, } from '../utils'
import moment from "moment"
import { Link } from "react-router-dom"

export default function Home() {
  const { queryL3List, } = useMemfireDB()
  const [dataSource, setDataSource] = useState<{id: number; name: string; updateTime: string;}[]>([])
  const initData = async () => {
    const l3List = await queryL3List<IL3Data[]>()
    const list = l3List.map(item => {
      const { id, inserted_at, } = item
      return {
        id,
        name: `${id}`,
        updateTime: inserted_at,
      }
    })
    setDataSource(list)
  }
  useEffect(() => {
    initData()
  }, [])
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string, record: any, index: number) => {
        const updateTime = moment(text).local().format()
        return (<>{updateTime}</>)
      },
    },
    {
      title: '',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string, record: any, index: number) => {
        const { id, } = record
        return (<><Space>
            <Link to={`/fetch-in-json?id=${id}`}>三好一改</Link>
            <Link to={`/report?id=${id}`}>统计</Link>
          </Space></>)
      },
    },
  ];
  return <>
    <Table dataSource={dataSource} columns={columns} rowKey="id" />
  </>
}
