// 数据来源 https://appoxpkjya89223.h5.xiaoeknow.com/small_community/h5_get_feeds_list?app_id=appOXpkJya89223&community_id=c_61b1b23123ff0_YNOK5LTp2458&feeds_list_type=-1&order_filed=created_at&hide_exercise=0&page=1&page_size=200000

import { useMemfireDB, } from '../utils';

export const UNKNOWN = "未知";

const getGroupPromise = <T>() => {
  return new Promise<T>((resolve) => {
    import('../assets/data/group.json')
      .then(res => resolve(res.default as unknown as T))
  })
}
const getDataPromise = <T>() => {
  return new Promise<T>((resolve, reject) => {
    import('../assets/data/default.json')
      .then(res => resolve(res.default as unknown as T))
  })
}
const useData = () => {
  const { queryL3, } = useMemfireDB()
  const getDataSource = async (id: number) => {
    const groupPromise = getGroupPromise()
    // const dataPromise = getDataPromise<IRawData>()
    const queryL3Promise = queryL3(id)
    const [groupData, l3Data] = await Promise.all([groupPromise, queryL3Promise])
    const [firstData] = (l3Data || []).reverse()
    const rawData = firstData.json
    const groups = groupData as any[];
    const dataSource: IViewData[] = [...rawData.data].map((item) => {
      const {
        id,
        app_id,
        community_id,
        user_id,
        wx_avatar,
        nick_name,
        content,
        commentList,
        created_at,
      } = item;
      const groupInfo = groups.find((g) => g.userId === user_id);
      const { group = UNKNOWN, company, name, } = groupInfo || {};
      const { text } = content;
      return {
        id,
        app_id,
        community_id,
        user_id,
        wx_avatar,
        nick_name,
        name,
        content: text,
        commentList,
        created_at,
        group,
        company,
      };
    });
    return dataSource;
  };
  return {
    getDataSource,
  };
};

export default useData;
