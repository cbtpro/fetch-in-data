import CommentNode from "./CommentNode";

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

const processCommentNode: (
  result: CommentNode[],
  commentNodes: CommentNode[],
  parentCommentId?: number | undefined | null,
  parentUserId?: string,
) => CommentNode[] = (result, commentNodes, parentCommentId, parentUserId) => {
  const rootCommentIds: number[] = []
  if (parentCommentId || parentUserId) {
    // 处理评论的评论
    commentNodes.forEach(commentNode => {
      const parentCommentNode = result.find((r) => r.id === parentCommentId)
      if (parentCommentNode) {
        console.log(parentCommentId, parentUserId)
        if (parentCommentNode.children) {
          parentCommentNode.children.push(commentNode)
        } else {
          parentCommentNode.children = [commentNode]
        }
      }
    })
  } else {
    commentNodes.forEach((commentNode, i) => {
      // 处理根根评论
      const isRootNode = commentNode.isRootNode();
      const isRootNodeReply = commentNode.isRootNodeReply()
      if (isRootNode) {
        result.push(commentNode);
        rootCommentIds.push(commentNode.id as number)
      } else if (isRootNodeReply) {
        
      }
    });
  }

  const leftCommentNodes = commentNodes.filter(item => rootCommentIds.indexOf(item.id as number) === -1)
  result.forEach((commentNode, i) => {
    const { id, user_id, } = commentNode
    const children = processCommentNode([], [...leftCommentNodes], id, user_id)
    if (children && children.length > 0) {
      commentNode.children = children
    }
  })
  console.log(commentNodes)
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
