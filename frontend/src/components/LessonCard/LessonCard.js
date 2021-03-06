import { useDispatch, useSelector } from "react-redux";
import { RefreshData } from "@pages/RefreshData";
import "./LessonCard.scss";
const LessonCard = ({ title, coach, date, subscribe, ID }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  let id = ID;

  let day = date.split(" ")[0].split(".")[0];
  let month = date.split(" ")[0].split(".")[1];
  let year = date.split(" ")[0].split(".")[2];
  let datepass = false;

  let dateles = new Date(`${day}/${month}/${year}`);
  if (dateles <= Date.now()) {
    datepass = true;
  }

  const subOnLesson = (id) => {
    let body = {
      user_id: user.id,
      lesson_id: id,
    };
    fetch("http://127.0.0.1:5000/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(function (response) {
      RefreshData(dispatch);
    });
  };
  const DeleteSubOnLesson = (id) => {
    let body = {
      user_id: user.id,
      lesson_id: id,
    };
    fetch("http://127.0.0.1:5000/api/DeleteSubscribe", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(function (response) {
      RefreshData(dispatch);
    });
  };
  let disable = "";
  if (datepass) {
    disable = "disable";
  }

  return (
    <div className={disable}>
      <div className="lesson-card">
        <div className="info-block">
          <span className="info-block__title">{title}</span>
          <span className="info-block__coach">{coach}</span>
          <span className="info-block__date">{date}</span>
        </div>
        {subscribe === true ? (
          <button
            className="button button_out"
            onClick={() => DeleteSubOnLesson(id)}
          >
            Отписаться
          </button>
        ) : (
          <button className="button button_in" onClick={() => subOnLesson(id)}>
            Записаться
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
