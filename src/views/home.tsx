import React, { useEffect, useState } from "react"
import { Table, } from 'antd'
import { useMemfireDB, } from '../utils'
import moment from "moment"

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
        const updateTime = moment(text).format('YYYY-MM-DD HH:mm:ss')
        return (<>{updateTime}</>)
      },
    },
  ];
  return <>
    <Table dataSource={dataSource} columns={columns} rowKey="id" />
  </>
}
