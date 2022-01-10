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
import { useState } from "react"
import SearchForm from "./SearchForm"
import SearchResult from "./SearchResult"

function ReportV2 () {
  const [searchForm, setSearchForm] = useState<ISearchForm>({
    dateRange: [
      moment().set({hour: 0, minute: 0, second: 0, millisecond: 0 }),
      moment().set({hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, 'day')
    ],
  })
  return <>
    {JSON.stringify(searchForm.dateRange)}
    <SearchForm form={searchForm} setSearchForm={setSearchForm} />
    <SearchResult form={searchForm} />
  </>
}

export default ReportV2