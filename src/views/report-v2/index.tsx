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
import moment from "moment"
import { useEffect, useState } from "react"
import useLocalStorage from "../../hooks/use-local-storage"
import SearchForm, { DEFAULT_GROUPS_KEY, DEFAULT_USERS_KEY, } from "./SearchForm"
import SearchResult from "./SearchResult"

function ReportV2 () {
  const [searchForm, setSearchForm] = useState<IFilterFormV2>({
    from: 0,
    to: 1000,
    dateRange: [moment().set({hour: 0, minute: 0, second: 0, millisecond: 0 }) ,moment().set({hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, 'day')],
    groups: [],
    users: [],
  })

  const { getItem } = useLocalStorage()
  useEffect(() => {
    Promise.all([getItem<string[]>(DEFAULT_GROUPS_KEY), getItem<string[]>(DEFAULT_USERS_KEY)])
      .then(([groups, users]) => {
        setSearchForm({
          ...searchForm,
          groups: groups ? groups : [],
          users: users ? users : [],
        })
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <SearchForm form={searchForm} setSearchForm={setSearchForm} />
    <SearchResult form={searchForm} />
  </>
}

export default ReportV2