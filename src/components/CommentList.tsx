import { Avatar, Card, Comment, List, Space, } from 'antd'
// import ReactJson from 'react-json-view'
import CommentNode from './CommentNode'
import useProcessComment from './use-process-comment'
interface IProps {
  data: IViewData;
}

const CommentComponent = (props: { list: any }) => {
  const { list, } = props
  const data = [...list]
  return (
    <>
      {
        <List
          header={`${data.length} 条评论`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              >
                { item.children ? <CommentComponent list={item.children} /> : '' }
              </Comment>
            </li>
          )}
        />
      }
    </>
  );
};
const CommentNodeComponent = (props: { list: CommentNode[] }) => {
  const { list, } = props
  const data = [...list]
  return (
    <>
      {
        <List
          header={`${data.length} 条评论`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => {
            const { nick_name, reply_nick_name, } = item
            const author = <><Space>{nick_name} 回复 {reply_nick_name}</Space></>
            return (
              <li>
                <Comment
                  author={author}
                  avatar={item.wx_avatar}
                  content={item.comment}
                  datetime={item.created_at}
                >
                  { item.children ? <CommentNodeComponent list={item.children} /> : '' }
                </Comment>
              </li>
            )}
          }
        />
      }
    </>
  );
}
function CommentList(props: IProps) {
  const { data } = props;
  const { wx_avatar, nick_name, content, commentList, created_at, } = data
  const {
    // processComment,
    translateCommentNode,
    processCommentNode,
  } = useProcessComment()
  // const list = processComment([], commentList.list, null);
  const commentNodes: CommentNode[] = translateCommentNode(commentList.list)
  const list = processCommentNode([], [...commentNodes])
  return (
    <>
      <Card>
        <Space><Avatar src={wx_avatar} />{nick_name}{created_at}</Space>
        <div dangerouslySetInnerHTML={{__html: content ? content.replace(/\n/g, '<br />') : '' }}></div>
      </Card>
      {/* <ReactJson src={list} /> */}
      <CommentNodeComponent list={list} />
      {/* <CommentComponent list={list} /> */}
    </>
  );
}

export default CommentList;
