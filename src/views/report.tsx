import React, { useState, } from 'react'
import moment from 'moment'
// import * as echarts from 'echarts/core';
// import {
//   BarChart,
//   // 系列类型的定义后缀都为 SeriesOption
//   BarSeriesOption,
//   // LineChart,
//   LineSeriesOption
// } from 'echarts/charts';
// import {
//   TitleComponent,
//   // 组件类型的定义后缀都为 ComponentOption
//   TitleComponentOption,
//   TooltipComponent,
//   TooltipComponentOption,
//   GridComponent,
//   GridComponentOption,
//   // 数据集组件
//   DatasetComponent,
//   DatasetComponentOption,
//   // 内置数据转换器组件 (filter, sort)
//   TransformComponent
// } from 'echarts/components';
// import { LabelLayout, UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';
import { distinct, } from '../utils'
import useData from '../hooks/use-data'
import FilterForm from '../components/FilterForm'
import Summary from '../components/Summary'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// type ECOption = echarts.ComposeOption<
//   | BarSeriesOption
//   | LineSeriesOption
//   | TitleComponentOption
//   | TooltipComponentOption
//   | GridComponentOption
//   | DatasetComponentOption
// >;

// 注册必须的组件
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   BarChart,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer
// ]);

function Report() {
  // const reportRef = useRef<HTMLDivElement>(null)
  // let myChart: echarts.ECharts
  // const initEChart = () => {
  //   myChart = echarts.init(reportRef.current as HTMLDivElement, undefined, {
  //     width: 1920,
  //     height: 600,
  //   });
  //   const option: ECOption = {
  //     xAxis: {
  //       type: 'category',
  //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //     },
  //     yAxis: {
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         data: [120, 200, 150, 80, 70, 110, 130],
  //         type: 'bar'
  //       }
  //     ]
  //   }
  //   myChart.setOption(option);
  // }
  // const disposeECharts = () => {
  //   if (myChart) {
  //     myChart.dispose()
  //   }
  // }
  // useEffect(() => {
  //   initEChart()
  //   return () => {
  //     disposeECharts()
  //     console.log('这里应该销毁报表组件')
  //   }
  // })
  
  const { getDataSource, } = useData()
  const rawDataSource = getDataSource()
  // 接下来的使用就跟之前一样，初始化图表，设置配置项
  const users = distinct(
    rawDataSource
      .map((item) => {
        const { user_id, nick_name, group, company, } = item;
        return {
          user_id,
          nick_name,
          group,
          company,
        };
      })
      .sort((a, b) => {
        return a.nick_name.localeCompare(b.nick_name);
      }),
    "user_id"
  );
  const [filterForm, setFilterForm] = useState<IFilterForm>({
    dateRange: [
      moment().set({hour:0,minute:0,second:0,millisecond:0}).add('day', -1),
      moment().set({hour:0,minute:0,second:0,millisecond:0})
    ],
    users: [...users],
    groups: [],
    companys: [],
    nickNames: [],
  })
  const onSubmit = (form: IFilterForm) => {
    const { dateRange, groups, companys, nickNames, } = form
    setFilterForm({
      ...filterForm,
      dateRange,
      groups,
      companys,
      nickNames,
    })
  }
  let filterResult = [...rawDataSource]
  let allComments: IViewData[] = []
  if(filterForm.dateRange && filterForm.dateRange.length > 0) {
    filterResult = filterResult.filter(item => {
      const { dateRange, } = filterForm
      const [startTime, endTime, ] = dateRange
      const postTime = moment(item.created_at)
      const inRange = postTime.isBetween(startTime, endTime)
      return inRange
    })
    allComments = [...filterResult]
  }
  if (filterForm.groups && filterForm.groups.length > 0) {
    filterResult = filterResult.filter(item => {
        const { groups } = filterForm
        return groups.indexOf(item.group) !== -1
      })
  }
  
  if (filterForm.companys && filterForm.companys.length > 0) {
    filterResult = filterResult.filter(item => {
        const { companys } = filterForm
        return companys.indexOf(item.company) !== -1
      })
  }
  
  if (filterForm.nickNames && filterForm.nickNames.length > 0) {
    filterResult = filterResult.filter(item => {
        const { nickNames } = filterForm
        return nickNames.indexOf(item.nick_name) !== -1
      })
  }

  return <>
    <FilterForm filterForm={filterForm} onSubmit={onSubmit} />
    <Summary data={filterResult} comments={allComments} />
    {/* <div ref={reportRef}></div> */}
  </>
}

export default Report