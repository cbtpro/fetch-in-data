interface IProps {
  list: ICommentList['list'];
}
function Comment (props: IProps) {
  const { list, } = props
  return <>{JSON.stringify(list)}</>
}

export default Comment