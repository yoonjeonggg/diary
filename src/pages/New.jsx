import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
const New = () => {
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  const onSubmit = (data) => {
    const { date, content, phone, emotionId } = data;
    onCreate(date, content, phone, emotionId);
    navigate("/", { replace: true });
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Header
        title={"신규회원등록"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};
export default New;
