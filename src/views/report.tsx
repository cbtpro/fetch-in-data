import React, { useEffect, useRef, } from 'react'
import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  // LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

function Report() {
  const reportRef = useRef<HTMLDivElement>(null)
  let myChart: echarts.ECharts
  const initEChart = () => {
    myChart = echarts.init(reportRef.current as HTMLDivElement, undefined, {
      width: 1920,
      height: 600,
    });
    const option: ECOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    myChart.setOption(option);
  }
  const disposeECharts = () => {
    if (myChart) {
      myChart.dispose()
    }
  }
  useEffect(() => {
    initEChart()
    return () => {
      disposeECharts()
      console.log('这里应该销毁报表组件')
    }
  })
  // 接下来的使用就跟之前一样，初始化图表，设置配置项
  return <><div ref={reportRef}>123</div></>
}

export default Report