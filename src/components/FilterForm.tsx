import { Button, Checkbox, Col, DatePicker, Form, Row, } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { UNKNOWN } from '../hooks/use-data';
import { unique } from '../utils';
import CustomeLabel from './CustomeLabel'

const { Item, } = Form
const { RangePicker } = DatePicker

interface IProps {
  filterForm: IFilterForm;
  onSubmit: (data: IFilterForm) => void; 
}
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};
function FilterForm(props: IProps) {
  const { filterForm, onSubmit, } = props
  const onFinish = (data: IFilterForm,) => {
    onSubmit(data)
  };
  interface IFilterData {
    users: IUser[];
    onChange: (checkedValue: CheckboxValueType[]) => void;
    value: string[];
  }
  const FilterGroup = (data: IFilterData) => {
    const { users, } = data
    if (!users) {
      return <>无数据</>
    }
    const groups = unique(users.map(user => {
      return user.group
    })).sort((a, b) => {
      return (Number.parseInt(a.replace(/[^\d]/g, ''), 10) || 0) - (Number.parseInt(b.replace(/[^\d]/g, ''), 10) || 0);
    })
    return <>
      <Checkbox.Group
        onChange={data.onChange}
  　　　value={data.value}
      >
        <Row>
          {
            groups.map(group => {
              return (
              <Col key={group}>
                <Checkbox value={group} style={{ lineHeight: '32px' }}>
                  {group}
                </Checkbox>
              </Col>
              )
            })
          }
        </Row>
      </Checkbox.Group>
    </>
  }
  const FilterCompany = (data: IFilterData) => {
    const { users, } = data
    if (!users) {
      return <>无数据</>
    }
    const companys = unique(users.map(user => {
      return user.company || UNKNOWN
    })).sort((a, b) => {
      return a.localeCompare(b);
    })
    return <>
      <Checkbox.Group
        onChange={data.onChange}
  　　　value={data.value}
      >
        <Row>
          {
            companys.map(company => {
              return (
                <Col key={company}>
                  <Checkbox value={company} style={{ lineHeight: '32px' }}>
                    {company}
                  </Checkbox>
                </Col>
              )
            })
          }
        </Row>
      </Checkbox.Group>
    </>
  }
  const FilterNickName = (data: IFilterData) => {
    const { users, } = data
    if (!users) {
      return <>无数据</>
    }
    const nickNames = unique(users.map(user => {
      return user.nick_name
    })).sort((a, b) => {
      return a.localeCompare(b);
    })
    return <>
      <Checkbox.Group
        onChange={data.onChange}
  　　　value={data.value}
      >
        <Row>
          {
            nickNames.map(nickName => {
              return (
              <Col key={nickName}>
                <Checkbox value={nickName} style={{ lineHeight: '32px' }}>
                  {nickName}
                </Checkbox>
              </Col>
              )
            })
          }
        </Row>
      </Checkbox.Group>
    </>
  }
  const filterGroupChange = (checkedValue: CheckboxValueType[]) => {
    const groups = checkedValue as string[]
    filterForm.groups = groups
  }
  const filterCompanyChange = (checkedValue: CheckboxValueType[]) => {
    const companys = checkedValue as string[]
    filterForm.companys = companys
  }
  const filterNickNameChange = (checkedValue: CheckboxValueType[]) => {
    const nickNames = checkedValue as string[]
    filterForm.nickNames = nickNames
  }
  return <>
    <Form
      {...layout}
      initialValues={filterForm}
      onFinish={onFinish}
      labelAlign="right"
    >
      <Item name="dateRange" label="时间范围">
        <RangePicker value={filterForm.dateRange[0]} />
      </Item>
      <Item name="groups" label={<CustomeLabel>分组</CustomeLabel>}>
        <FilterGroup users={filterForm.users} value={filterForm.groups} onChange={filterGroupChange} />
      </Item>
      <Item name="companys" label="公司">
        <FilterCompany users={filterForm.users} value={filterForm.companys} onChange={filterCompanyChange} />
      </Item>
      <Item name="nickNames" label="昵称">
        <FilterNickName users={filterForm.users} value={filterForm.nickNames} onChange={filterNickNameChange} />
      </Item>
      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Item>
    </Form>
  </>
}

export default FilterForm