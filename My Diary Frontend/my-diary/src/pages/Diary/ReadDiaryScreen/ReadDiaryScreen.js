import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import "./ReadDiaryScreen.css";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import RemoveDiaryModal from "../../../components/UI/Modals/RemoveDiaryModal";
import { deleteDiary, getOneDiary } from "../../../store/diary/diaryActions";
import {
  inputDateTommddyyyy,
  mmddyyyytoCustomDateObject,
} from "../../../utils/date-utils";
import ErrorPage from "../../Error/ErrorPage";

const ReadDiary = ({
  isLoading,
  diary,
  error,
  getOneDiaryFunc,
  deleteDiaryFunc,
}) => {
  const [removeModal, setRemoveModal] = useState(false);

  const editClickHandler = () => {
    history.push({
      pathname: "/diary/write",
      search: `?editId=${diary._id}`,
    });
  };

  let customDateObject = {};
  let dateString = "";

  useEffect(() => {
    if (diary != null) {
      const customDateObject = mmddyyyytoCustomDateObject(diary.date);
      dateString = `${customDateObject.day} ${customDateObject.monthLong} ${customDateObject.year}`;
    }
  }, [diary]);

  const location = useLocation();
  const history = useHistory();

  //fetch
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("_id");
    getOneDiaryFunc(
      { id },
      () => {},
      (error) => {}
    );
  }, []);
  //

  const removeHandler = async () => {
    deleteDiaryFunc(
      { diaryId: diary._id, date: inputDateTommddyyyy(diary.date) },
      () => {
        history.push("/diary");
      },
      (error) => {
        //handle error
      }
    );
  };

  return (
    <div>
      {error && <ErrorPage error={error} />}

      <Card className="Reading-Card">
        <div className="ReadingCard-Header">
          <h2>{diary?.title}</h2>
          <div>{dateString}</div>
        </div>
        <div className="Reading-Card__text">{diary?.text}</div>
        <div className="Reading-Card__buttons">
          <div className="Reading-Card__edit" onClick={editClickHandler}>
            Edit
          </div>
          <div
            className="Reading-Card__remove"
            onClick={() => setRemoveModal(true)}
          >
            Remove
          </div>
        </div>
        {removeModal && (
          <RemoveDiaryModal
            onRemove={removeHandler}
            onCancel={() => setRemoveModal(false)}
            customDate={customDateObject}
          />
        )}
        {isLoading && <LoadingSpinner />}
      </Card>

      {/* {!diary && !error && (
        <div className="spinner-holder">
          <LoadingSpinner />
        </div>
      )} 
      
      
      <ReadingDiary
        date={diary ? diary.date : null}
        title={diary ? diary.title : null}
        text={diary ? diary.text : null}
        id={diary ? diary._id : null}
        onRemove={removeHandler}
        isLoading={isLoading}
      />
      */}
    </div>
  );
};

const mapStateToProps = ({ diary }) => ({
  isLoading: diary?.isLoading,
  diary: diary?.diary,
  error: diary?.error,
});
const mapDispatchToProps = {
  getOneDiaryFunc: getOneDiary,
  deleteDiaryFunc: deleteDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadDiary);
