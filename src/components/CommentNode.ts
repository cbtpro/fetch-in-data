class CommentNode {
  [x: string]: any;
  id: number | undefined | null; // 1160313 评论id
  app_id: string | undefined; // "appOXpkJya89223"
  community_id: string | undefined; // "c_61b1b23123ff0_YNOK5LTp2458"
  feeds_id: string | undefined; // "d_61d1b57a98313_DJkkUq8TFmzD"
  user_id: string | undefined; // "u_6073974f45729_BeFsTnLvFD" // 评论用户ID
  comment: string | undefined; // "真棒，今天干了很多活" // 评论内容
  comment_resource: {
    image: any[];
    audio: any[];
  }[] = [];
  type: number | undefined; // 0
  main_comment_id: string | null = null; // null
  reply_user_id: string | undefined; // "u_61b990059f053_d5sS8ioZGC" 回复谁的用户id
  reply_comment_id: string | null = null; // null // 回复评论的id
  send_type: number | undefined; // 0
  created_at: string | undefined; // "2022-01-02 22:32:34"
  praise_cnt: number | undefined; // 0
  nick_name: string | undefined; // "梁小余" // 用户昵称
  wx_avatar: string | undefined; // "http://wechatavator-1252524126.file.myqcloud.com/appOXpkJya89223/image/compress/u_6073974f45729_BeFsTnLvFD.png" 用户头像
  user_type: number | undefined; // 0
  is_guest: number | undefined; // 0
  reply_nick_name: string | undefined; // "JP🍁" 回复谁的用户昵称
  reply_wx_avatar: string | undefined; // 回复谁的用户头像 "http://wechatavator-1252524126.file.myqcloud.com/appOXpkJya89223/image/compress/u_61b990059f053_d5sS8ioZGC.png"
  reply_user_type: number | undefined; // 0
  reply_is_guest: number | undefined; // 0
  zan_num: number | undefined; // 0
  show_time: string | undefined; // "5分钟前"
  work_corp_id: string | undefined; // ""
  work_user_id: string | undefined; // ""
  reply_work_corp_id: string | undefined; // ""
  reply_work_user_id: string | undefined; // ""
  children: CommentNode[] | undefined;
  constructor(comment: IComment) {
    Object.keys(comment).forEach((key: string) => {
      if (comment.hasOwnProperty(key)) {
        this[key] = comment[key]
      }
    })
  }
  // 是不是根评论
  isRootNode() {
    return !this.reply_comment_id
  }
  // 是评论的回复
  isRootNodeReply() {
    return this.reply_comment_id !== undefined && this.reply_comment_id !== null
  }
}
export default CommentNode;
