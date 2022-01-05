// 数据来源 https://appoxpkjya89223.h5.xiaoeknow.com/small_community/h5_get_feeds_list?app_id=appOXpkJya89223&community_id=c_61b1b23123ff0_YNOK5LTp2458&feeds_list_type=-1&order_filed=created_at&hide_exercise=0&page=1&page_size=200000
import defaultData from "../assets/data/default.json";
import groupData from "../assets/data/group.json";

export const UNKNOWN = "未知";

const useData = () => {
  const getDataSource = () => {
    const { data } = defaultData as unknown as IRawData;
    const groups = groupData as any[];

    const dataSource: IViewData[] = [...data].map((item) => {
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
      const { group = UNKNOWN, company } = groupInfo || {};
      const { text } = content;
      return {
        id,
        app_id,
        community_id,
        user_id,
        wx_avatar,
        nick_name,
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
