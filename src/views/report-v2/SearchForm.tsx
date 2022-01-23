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
import { Button, DatePicker, Form, Select, Space, Transfer, } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { useEffect, useState } from 'react'
import { UNKNOWN } from '../../hooks/use-data-v2'
import useLocalStorage from '../../hooks/use-local-storage'
import { setCompanys, } from '../../redux/demo'
import FormItemCompanys from './components/FormItemCompanys'

const { Item, } = Form
const { RangePicker } = DatePicker
const { Option, } = Select

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
}

interface IProps {
  form: IFilterFormV2;
  setSearchForm: (form: IFilterFormV2) => void;
  users: IUserV2[];
  companys: string[];
  onSetCompanys: (companys: string[]) => void;
}
export const DEFAULT_EXPIRES_TIME = 365 * 24 * 60
export const DEFAULT_GROUPS_KEY = 'DEFAULT_GROUPS_KEY'
export const DEFAULT_USERS_KEY = 'DEFAULT_USERS_KEY'
export const DEFAULT_COMPANYS_KEY = 'DEFAULT_COMPANYS_KEY'
function SearchForm (props: IProps) {
  const { form, setSearchForm, users, companys } = props
  const [filterForm] = Form.useForm();
  const {
    setFieldsValue,
  } = filterForm
  const [initialValues] = useState(form)
  const initialTargetKeys: string[] = form.users || []
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys)
  useEffect(() => {
    setFieldsValue(form)
    setTargetKeys(form.users)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])
  const { setItem } = useLocalStorage()
  const [groups] = useState<string[]>([...new Array(20).fill(0).map((v: void, i: number) => `${i + 1}组`), UNKNOWN])
  const onFinishHandle = (form: any) => {
    const { dateRange, groups, users, } = form
    setSearchForm({
      from: 0,
      to: 1000,
      dateRange,
      groups,
      users,
    })
  }

  const onGroupChangeHandle = (checkedValue: CheckboxValueType[]) => {
    const groups = checkedValue as string[]
    setItem(DEFAULT_GROUPS_KEY, groups, DEFAULT_EXPIRES_TIME)
  }
  const onChange = (nextTargetKeys: string[]) => {
    // console.log('targetKeys:', nextTargetKeys);
    // console.log('direction:', direction);
    // console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    setItem(DEFAULT_USERS_KEY, nextTargetKeys, DEFAULT_EXPIRES_TIME)
  };
  const onFormItemCompanysChange = (value: string[]) => {
    props.onSetCompanys(value)
  }
  return <>
    <Form
      {...layout}
      form={filterForm}
      initialValues={initialValues}
      onFinish={onFinishHandle}
    >
      <Item name="dateRange" label="时间范围">
        <RangePicker />
      </Item>
      <Item name="groups" label="分组">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="请选择分组"
          onChange={onGroupChangeHandle}
        >
          {
            groups.map(group => {
              return (
                <Option key={group} value={group}>{group}</Option>
              )
            })
          }
        </Select>
      </Item>
      <Item name="users" label="用户">
        <Transfer
          dataSource={users}
          rowKey={record => record.user_id}
          titles={['不包含', '包含']}
          targetKeys={targetKeys}
          onChange={onChange}
          showSearch
          filterOption={(inputValue, user) => user.nick_name.indexOf(inputValue) > -1}
          locale={{searchPlaceholder: '请输入昵称'}}
          listStyle={{
            width: 400,
            height: 300,
          }}
          render={item => {
            const {
              nick_name,
              real_name,
              group,
              company,
            } = item
            return <>
              <Space>
                {nick_name}
                {real_name}
                {group}
                {company}
              </Space>
            </>
          }}
        />
      </Item>
      <Item name="companys" label="公司">
        <FormItemCompanys
          form={filterForm}
          value={companys}
          onChange={onFormItemCompanysChange}
        />
      </Item>
      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Item>
    </Form>
  </>
}

const mapStateToProps = (state: any) => ({
  users: state.demo.users,
  companys: state.demo.companys,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onSetCompanys: setCompanys,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)