import { useParams, useNavigate } from "react-router-dom";
import useDiray from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../components/Editor";
const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useDiray(id);

  const onClickDelete = () => {
    if (window.confirm("회원정보를 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };
  const onSubmit = (data) => {
    if (window.confirm("회원정보를 수정할까요?")) {
      const { date, content, phone, emotionId } = data;
      onUpdate(id, date, content, phone, emotionId);
      navigate("/", { replace: true });
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  if (!data) {
    return <div>일기를 불러 오는 중입니다.</div>;
  } else {
    return (
      <div>
        <Header
          title={"회원정보수정"}
          leftChild={<Button text={"<뒤로 가기"} onClick={goBack} />}
          rightChild={
            <Button
              text={"회원삭제"}
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
