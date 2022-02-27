import Card from "../../UI/Card";
import "./ReadingDiary.css";
import { mmddyyyytoCustomDateObject } from "../../../utils/date-utils";
import { useHistory } from "react-router";
import { useState } from "react";
import RemoveDiaryModal from "../../UI/Modals/RemoveDiaryModal";
import LoadingSpinner from "../../UI/LoadingSpinner";

const ReadingDiary = (props) => {
  const { date, title, text, id } = props;
  const history = useHistory();
  const [removeModal, setRemoveModal] = useState(false);

  const customDateObject = mmddyyyytoCustomDateObject(date);

  const dateString = `${customDateObject.day} ${customDateObject.monthLong} ${customDateObject.year}`;

  const editClickHandler = () => {
    history.push({
      pathname: "/diary/write",
      search: `?editId=${id}`,
    });
  };

  const removeModalHandler = () => {
    setRemoveModal(true);
  };

  return (
    <Card className="Reading-Card">
      <div className="ReadingCard-Header">
        <h2>{title}</h2>
        <div>{dateString}</div>
      </div>
      <div className="Reading-Card__text">{text}</div>
      <div className="Reading-Card__buttons">
        <div className="Reading-Card__edit" onClick={editClickHandler}>
          Edit
        </div>
        <div className="Reading-Card__remove" onClick={removeModalHandler}>
          Remove
        </div>
      </div>
      {removeModal && (
        <RemoveDiaryModal
          onRemove={props.onRemove}
          onCancel={() => setRemoveModal(false)}
          customDate={customDateObject}
        />
      )}
      {props.isLoading && <LoadingSpinner />}
    </Card>
  );
};

export default ReadingDiary;
