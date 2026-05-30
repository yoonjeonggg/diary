import "./Viewer.css";
import { emotionList } from "../utils";

const Viewer = ({ content, phone, emotionId }) => {
  const emotionItem = emotionList.find((it) => it.id === emotionId);
  return (
    <div className="Viewer">
      <section>
        <h4>회원등급</h4>
        <div
          className={[
            "emotion_img_wrapper",
            "emotion_img_wrapper_",
            `emotion_img_wrapper_${emotionId}`,
          ].join(" ")}
        >
          <img alt={emotionItem.name} src={emotionItem.img} />
          <div className="emotion_descript">{emotionItem.name}</div>
        </div>
      </section>
      <section>
        <h4>회원정보</h4>
        <div className="content_wrapper">
          <p>이름: {content}</p>
          <p>전화번호: {phone}</p>
        </div>
      </section>
    </div>
  );
};
export default Viewer;
