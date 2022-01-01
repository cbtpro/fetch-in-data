function processComment(
  result: any,
  comments: any,
  id: string | null,
) {
  if (!Array.isArray(comments)) {
    return result;
  }
  const _comments = [...comments];
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
      _comments.splice(i, 1);
    }
  });
  result.forEach((item: any) => {
    let { id } = item;
    let children = processComment([], _comments, id);
    if (children.length > 0) item.children = children;
  });
  return result;
}

function useProcessComment() {
  return {
    processComment,
  }
}
export default useProcessComment
