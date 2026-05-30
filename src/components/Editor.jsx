import "./Editor.css";
import { useState, useEffect } from "react";
import { emotionList, getFormattedDate } from "../utils";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
const Editor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 5,
    content: "",
    phone: "",
  });

  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };
  const handleChangePhone = (e) => {
    setState({
      ...state,
      phone: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleOnGoBack = () => {
    navigate(-1);
  };

  const handleChangeEmotion = (emotionId) => {
    setState({
      ...state,
      emotionId,
    });
  };

  return (
    <div className="Editor">
      <div className="editor_section">
        <h4>회원가입일</h4>
        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="editor_section">
        <h4>회원등급</h4>
        <div className="input_wrapper emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId == it.id}
            />
          ))}
        </div>
      </div>
      <div className="editor_section">
        <h4>회원이름</h4>
        <div className="input_wrapper">
          <textarea
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
        <h4>회원 전화번호</h4>
        <div className="input_wrapper">
          <textarea value={state.phone} onChange={handleChangePhone} />
        </div>
      </div>
      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"수정하기"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;
