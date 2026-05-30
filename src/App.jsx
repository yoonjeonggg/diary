import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import React, { useReducer, useRef, useEffect, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE": {
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
const mockData = [
  {
    id: 0,
    date: new Date().getTime() - 1,
    content: "박보건",
    phone: "010-2345-2345",
    emotionId: 1,
  },
  {
    id: 1,
    date: new Date().getTime() - 2,
    content: "우효림",
    phone: "010-1234-1234",
    emotionId: 2,
  },
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
function App() {
  const [isDataLoaded, setIsDataLoded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoded(true);
  }, []);

  const onCreate = (date, content, phone, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        phone,
        emotionId,
      },
    });
    idRef.current += 1;
  };
  const onUpdate = (targetId, date, content, phone, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        phone,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
