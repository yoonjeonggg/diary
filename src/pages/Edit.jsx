import { useParams, useNavigate } from "react-router-dom";
import useDiray from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../components/Editor";
const Edit = () => {
  const navigate = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    if (
      window.confirm("일기를 정말 삭제하시겠습니까? 다시 복구되지 않습니다.")
    ) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };
  const onSubmit = (data) => {
    if (window.confirm("일기를 정말 수정하겠습니까?")) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", { replace: true });
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const data = useDiray(id);

  if (!data) {
    return <div>일기를 불러 오는 중입니다.</div>;
  } else {
    return (
      <div>
        <Header
          title={"일기수정하기"}
          leftChild={<Button text={"뒤로가기"} onClick={goBack} />}
          rightChild={
            <Button
              text={"삭제하기"}
              type={"negative"}
              onClick={onClickDelete}
            />
          }
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};
export default Edit;
