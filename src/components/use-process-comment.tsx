import CommentNode from "./CommentNode";

/**
 * 递归方式处理多级别评论（支持无限层）
 * @param result 
 * @param comments 
 * @param id 
 * @returns 
 */
function processComment(result: any, comments: any, id: string | null) {
  if (!Array.isArray(comments)) {
    return result;
  }
  const _comments = [...comments];
  const needRemoveComment: IComment[] = []
  _comments.forEach((comment, i) => {
    let { reply_comment_id } = comment;
    if (reply_comment_id === id) {
      const {
        id,
        nick_name,
        wx_avatar,
        comment: content,
        reply_comment_id,
        created_at,
      } = comment;
      result.push({
        id,
        author: nick_name,
        avatar: wx_avatar,
        content,
        reply_comment_id,
        datetime: created_at,
      });
      needRemoveComment.push(comment)
    }
  });
  _comments.forEach((comment, i) => {
    if (needRemoveComment.indexOf(comment) !== -1) {
      _comments.splice(i, 1)
    }
  })
  result.forEach((item: any) => {
    let { id } = item;
    let children = processComment([], _comments, id);
    if (children.length > 0) item.children = children;
  });
  return result;
}
const translateCommentNode: (comments: IComment[]) => CommentNode[] = (
  comments
) => {
  return comments.map((comment) => {
    return new CommentNode(comment);
  });
};

/**
 * 处理多层评论，仅显示两层
 * @param result 
 * @param commentNodes 
 * @param parentCommentId 
 * @param parentUserId 
 * @returns 
 */
const processCommentNode: (
  result: CommentNode[],
  commentNodes: CommentNode[],
  parentCommentId?: number | undefined | null,
  parentUserId?: string,
) => CommentNode[] = (result, commentNodes, parentCommentId, parentUserId) => {
  const needRemoveCommentIds: number[] = []
  if (parentCommentId || parentUserId) {
    // 处理评论的评论
    commentNodes.forEach(commentNode => {
        if (parentCommentId === commentNode.reply_comment_id || parentCommentId === commentNode.main_comment_id) {
          result.push(commentNode)
          needRemoveCommentIds.push(commentNode.id as number)
        }
    })
  } else {
    commentNodes.forEach((commentNode, i) => {
      // 处理根根评论
      const isRootNode = commentNode.isRootNode();
      if (isRootNode) {
        result.push(commentNode);
        needRemoveCommentIds.push(commentNode.id as number)
      }
    });
  }

  const leftCommentNodes = commentNodes.filter(item => needRemoveCommentIds.indexOf(item.id as number) === -1)
  if (leftCommentNodes.length > 0) {
    result.forEach((commentNode, i) => {
      const { id, user_id, } = commentNode
      const children = processCommentNode([], [...leftCommentNodes], id, user_id)
      if (children && children.length > 0) {
        commentNode.children = children
      }
    })
  }
  return result;
};
function useProcessComment() {
  return {
    processComment,
    translateCommentNode,
    processCommentNode,
  };
}
export default useProcessComment;
