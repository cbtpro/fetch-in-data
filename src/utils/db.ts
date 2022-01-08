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
  const dbname = 'l3'
  const supabase = createClient(supabaseUrl, supabaseKey)
  const queryL3 = async () => {
    const { data, error } = await supabase
    .from(dbname)
    .select()
    return data
  }
  const insertL3 = async (jsonText: string) => {
    const { data, error } = await supabase
      .from(dbname)
      .update([
        { json: JSON.parse(jsonText)}
      ]).match({ id: 1, })
  }
  const deleteL3 = async (id: number) => {
    const res = await supabase.from(dbname).delete().match({ id, })
    console.log(res)
  }

  return {
    queryL3,
    insertL3,
    deleteL3,
  }
}
export default useMemfireDB