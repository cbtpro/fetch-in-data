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

import localforage from "localforage";

localforage.config({
  name: process.env.REACT_APP_LOCAL_STORAGE_KEY,
});

const useLocalStorage = () => {
  /**
   *
   * @param key
   * @param value
   * @param expired
   * @returns
   */
  const setItem = (key: string, value: any, expired = 0) => {
    if (expired > 0) {
      const expiredKey = `${key}__expires__`;
      const exp = Date.now() + 1000 * 60 * expired;
      localforage.setItem(expiredKey, exp + "").catch((err) => {
        console.log(err);
      });
      return localforage.setItem(key, value);
    } else {
      return localforage.removeItem(key);
    }
  };

  /**
   *
   * @param key
   * @returns
   */
  const getItem = <T>(key: string) => {
    const expiredKey = `${key}__expires__`;
    return localforage
      .getItem<number | null>(expiredKey)
      .then((value) => {
        let expired = value;
        try {
          expired = parseFloat(expired as unknown as string);
        } catch (e) {
          if (expired) {
            expired = Date.now() - 1000;
          }
        }
        if (expired) {
          if (expired > Date.now()) {
            return localforage.getItem(key) as Promise<T>
          }
        }
        removeItem(key);
        removeItem(expiredKey);
        return undefined
      })
      .catch((err) => {
        console.log(err);
      })
  };

  /**
   * 清楚指定key的存储
   * @param key
   * @returns
   */
  const removeItem = (key: string) => {
    if (key) {
      const expiredKey = `${key}__expires__`;
      localforage.removeItem(expiredKey);
      return localforage.removeItem(key);
    }
  };
  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
