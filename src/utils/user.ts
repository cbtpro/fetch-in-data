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

export const distinct: <T>(array: T[], ...rest: string[]) => T[] = (
  array,
  ...rest
) => {
  const results: any[] = [];
  array.forEach((item: any) => {
    const index = results.findIndex((element) => {
      return rest.every((r: any) => element[r] === item[r]);
    });
    if (index === -1) {
      results.push(item);
    }
  });
  return results;
};
export function unique(arr: string[]) {
  return Array.from(new Set(arr))
}

