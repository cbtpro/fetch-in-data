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

import { createClient } from '@supabase/supabase-js'

export function useMemfireDB() {
  // Create a single supabase client for interacting with your database
  const supabaseUrl = 'https://c7cr9li5g6h5oik633lg.baseapi.memfiredb.com'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzE3OTU3NzU3NCwiaWF0IjoxNjQxNjU3NTc0LCJpc3MiOiJzdXBhYmFzZSJ9.r1_uIQHx44i8ndTN8soswfnTf7JAF2YCXDLnxAsjD9k'
  const tableName = 'l3'
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  const queryL3List = async <T>() => {
    const { data, error } = await supabase
      .from(tableName)
      .select('id, inserted_at')
    if (error) {
      console.error(error)
      return []
    }
    return data as unknown as T
  }

  const queryL3 = async (id: number) => {
    const { data, error } = await supabase
      .from(tableName)
      .select()
      .match({ id, })
    if (error) {
      console.error(error)
      return []
    }
    return data
  }

  const insertL3 = async (jsonText: string) => {
    const { data, error } = await supabase
      .from(tableName)
      .insert([
        { json: JSON.parse(jsonText)}
      ])
    if (error) {
      console.error(error)
      return []
    }
    return data
  }
  const deleteL3 = async (id: number) => {
    const res = await supabase.from(tableName).delete().match({ id, })
    console.log(res)
  }

  return {
    queryL3List,
    queryL3,
    insertL3,
    deleteL3,
  }
}
export default useMemfireDB