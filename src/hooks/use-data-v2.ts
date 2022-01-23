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

// 数据来源 https://appoxpkjya89223.h5.xiaoeknow.com/small_community/h5_get_feeds_list?app_id=appOXpkJya89223&community_id=c_61b1b23123ff0_YNOK5LTp2458&feeds_list_type=-1&order_filed=created_at&hide_exercise=0&page=1&page_size=200000
import moment from "moment";
import { useMemfireDBV2, } from "../utils";

export const UNKNOWN = '未知'

const getUsersPromise = <T>() => {
  return new Promise<T>((resolve) => {
    import('../assets/data/users.json')
      .then(res => resolve(res.default as unknown as T))
  })
}
const usersPromise = getUsersPromise()

const useDataV2 = () => {
  const { queryL3List, } = useMemfireDBV2()
  const getDataSource = (params: IFilterFormV2) => {
    const {
      from,
      to,
      dateRange,
    } = params
    const [startTime, endTime] = dateRange
    return Promise.all<any[]>([usersPromise, queryL3List({
      from,
      to,
      startTime: moment(startTime).format(),
      endTime: moment(endTime).format(),
    })]).then(result => {
      const [ usersData, l3DataV2 ] = result as [IUserV2[], IL3DataV2[]]
      return {usersData, l3DataV2}
    })
  }
  return {
    getDataSource,
  };
}

export default useDataV2;