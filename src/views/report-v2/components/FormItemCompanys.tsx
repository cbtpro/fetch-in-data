// Copyright 2022 peter
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

import { FormInstance, Select } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/use-local-storage";
import { DEFAULT_COMPANYS_KEY, DEFAULT_EXPIRES_TIME } from "../SearchForm";

interface IProps {
  form: FormInstance;
  value: string[];
  onChange: (value: string[]) => void;
}
const FormItemCompanys = (props: IProps) => {
  const { value, onChange, } = props
  const { setItem, getItem } = useLocalStorage()
  const handleChange = (value: (BaseOptionType | DefaultOptionType)[]) => {
    // console.log(`selected ${value}`);
    setItem(DEFAULT_COMPANYS_KEY, value, DEFAULT_EXPIRES_TIME)
    onChange(value as unknown as string[])
  }
  const [companys, setCompanys] = useState<(BaseOptionType | DefaultOptionType)[]>([])
  const [defaultValue, setDefaultValue] = useState<(BaseOptionType | DefaultOptionType)[]>([])
  useEffect(() => {
    const getCompanysPromise: <T>() => Promise<T> = () => {
      return new Promise((resolve) => {
        import('../../../assets/data/companys.json')
          .then(response => resolve(response.default as any))
          .catch(err => [])
      })
    }
    getCompanysPromise<ICompany[]>()
      .then((companys) => {
        const values = companys.map(company => {
          const { name, } = company
          return {
            value: name,
          }
        })
        setCompanys(values)
      })
    getItem<string[]>(DEFAULT_COMPANYS_KEY)
      .then(companys => {
        const values = companys?.map(company => {
          return {
            value: company,
          }
        }) || []
        setDefaultValue(values)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setDefaultValue((value || []).map(item => ({ value: item })))
  }, [value])
  return <>
    <Select
      mode="multiple"
      allowClear
      value={defaultValue}
      style={{ width: '100%' }}
      placeholder="选择公司"
      onChange={handleChange}
      options={companys}
    />
  </>
}
export default FormItemCompanys