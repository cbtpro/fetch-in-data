
interface IComment {
  [x: string]: any;
  id: number;
  app_id: string;
  community_id: string;
  feeds_id: string;
  user_id: string;
  comment: string;
  comment_resource: {
    image: any[];
    audio: any[];
  }[];
  type: number;
  main_comment_id?: string;
  reply_user_id: string;
  reply_comment_id?: string;
  send_type: number;
  created_at: string;
  praise_cnt: number;
  nick_name: string;
  wx_avatar: string;
  user_type: number;
  is_guest: number;
  reply_nick_name: string;
  reply_wx_avatar: string;
  reply_user_type: number;
  reply_is_guest: number;
  zan_num: number;
  show_time: string;
  work_corp_id: string;
  work_user_id: string;
  reply_work_corp_id: string;
  reply_work_user_id: string;
}
interface ICommentList {
    list: IComment[];
    total_count: number;
  }
  interface IItem {
    id: string;
    app_id: string;
    community_id: string;
    org_content: string;
    content: {
      text: string;
    };
    tags_content: string;
    file_url: string;
    file_name: string;
    file_size: number;
    file_json: {
      name: string;
      url: string;
      size: number | string;
      fileType: string;
    }[];
    feeds_type: number;
    user_id: string;
    title: string;
    is_chosen: number;
    is_notice: number;
    user_type: number;
    send_type: number;
    zan_num: number;
    comment_count: number;
    created_at: string;
    universal_union_id: string;
    is_exercise: number;
    is_public: number;
    me_praise: boolean;
    nick_name: string;
    wx_avatar: string;
    is_quit: number;
    user_state: number;
    is_guest: number;
    work_corp_id: string;
    work_user_id: string;
    show_time: string;
    praise_list: {
      app_id: string;
      user_id: string;
      nick_name: string;
      wx_avatar: string;
      user_type: number;
      is_guest: number;
      community_id: string;
      feed_id: string;
      work_corp_id: string;
      work_user_id: string;
    }[];
    commentList: ICommentList;
    is_self: boolean;
    login_user_id: string;
    tags: any[];
  }
  interface IL3Data {
    id: number;
    json?: IRawData;
    inserted_at: string;
  }
  interface IL3DataV2 {
    post_id: string;
    post: IItem;
    post_create_at: string;
    updated_at?: string;
    inserted_at?: string;
  }
  interface IRawData {
    code: number;
    msg: string;
    data: IItem[];
    feeds_num: number;
  }
  
  interface IViewData {
    id: string;
    app_id: string;
    community_id: string;
    user_id: string;
    wx_avatar: string;
    nick_name: string;
    name: string;
    content: string;
    commentList: ICommentList;
    created_at: string;
    company: string;
    group: string;
  }
  
  interface IUser {
    user_id: string;
    nick_name: string;
    group: string;
    company: string;
  }
  interface IFilterForm {
    dateRange: Moment[];
    users: IUser[];
    groups: string[],
    companys: string[],
    nickNames: string[],
  }

  interface ISummary {
    userId: string;
    nickName: string;
    name: string;
    postCount: number;
    commentCount: number;
    replyComout: number;
  }

  interface ISearchForm {
    dateRange: [Moment, Moment];
  }

interface IQueryL3Param {
  from: number;
  to: number;
  startTime: string;
  endTime: string;
}

interface IGroupData {
  company: string;
  group: string;
  id: string;
  name: string;
  nickname: string;
  no: number,
  remark: string;
  userId: string;
}
interface ICompany {
  id: number;
  name: string;
}
interface IUserV2 {
  user_id: string;
  nick_name: string;
  wx_avatar: string;
  real_name: string;
  group: string;
  company: string;
}

interface IFilterFormV2 {
  from: number;
  to: number;
  dateRange: [moment, moment];
  groups: string[];
  users: string[];
}