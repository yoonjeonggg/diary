import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
const Diray = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  if (!data) {
    return <div>일기를 불러오고 있습니다.</div>;
  } else {
    const { emotionId, content, phone } = data;
    const title = `${content}님의 정보`;
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"<뒤로가기"} onClick={goBack} />}
          rightChild={<Button text={"수정하기"} onClick={goEdit} />}
        />
        <Viewer content={content} phone={phone} emotionId={emotionId} />
      </div>
    );
  }
};
export default Diray;
