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
import { Button, DatePicker, Form, } from 'antd'

const { Item, } = Form
const { RangePicker } = DatePicker

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
}

interface IProps {
  form: ISearchForm;
  setSearchForm: (form: ISearchForm) => void;
}
function SearchForm (props: IProps) {
  const { form, setSearchForm, } = props
  const onFinishHandle = (form: ISearchForm) => {
    setSearchForm(form)
  }
  return <>
    <Form
      {...layout}
      initialValues={form}
      onFinish={onFinishHandle}
    >
      <Item name="dateRange" label="时间范围">
        <RangePicker value={form.dateRange} />
      </Item>
      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Item>
    </Form>
  </>
}

export default SearchForm