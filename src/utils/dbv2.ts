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

import { createClient, } from '@supabase/supabase-js'

export function useMemfireDBV2() {
  const supabaseUrl = 'https://c7cr9li5g6h5oik633lg.baseapi.memfiredb.com'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzE3OTU3NzU3NCwiaWF0IjoxNjQxNjU3NTc0LCJpc3MiOiJzdXBhYmFzZSJ9.r1_uIQHx44i8ndTN8soswfnTf7JAF2YCXDLnxAsjD9k'
  const tableName = 'l3_v2'
  const supabase = createClient(supabaseUrl, supabaseKey)

  const queryL3List = async (params: {
    from: number;
    to: number;
    startTime: string;
    endTime: string;
  }) => {
    const {
      from = 0,
      to = 1000,
      startTime,
      endTime,
    } = params
    const { data, error, } = await supabase
      .from(tableName)
      .select()
      .order('post_create_at', { ascending: false })
      .gte('post_create_at', startTime)
      .lt('post_create_at', endTime)
      .range(from, to)
    if (error) {
      console.error(error)
      return []
    }
    return data
  }
  const updateL3List: (l3DataV2List: IL3DataV2[]) => Promise<IL3DataV2[]> = async (l3DataV2List) => {
    const { data, error, } = await supabase
      .from(tableName)
      .upsert(l3DataV2List, {
        count: 'exact',
        onConflict: 'post_id',
      })
    if (error) {
      console.error(error)
      return []
    }
    return data as IL3DataV2[]
  }

  return {
    queryL3List,
    updateL3List,
  }
}