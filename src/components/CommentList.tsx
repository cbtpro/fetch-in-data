import { Comment, List } from "antd"
import useProcessComment from './use-process-comment'
interface IProps {
  list: ICommentList["list"];
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
function CommentList(props: IProps) {
  const { list } = props;
  const { processComment, } = useProcessComment()
  const data = processComment([], list, null);
  return (
    <>
      <CommentComponent list={data} />
    </>
  );
}

export default CommentList;
