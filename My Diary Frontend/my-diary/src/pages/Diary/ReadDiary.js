import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import ReadingDiary from "../../components/Diary/Reading/ReadingDiary";
import useDiary from "../../hooks/useDiary";
import useErrorHandler from "../../hooks/useErrorHandler";
import ErrorPage from "../Error/ErrorPage";

const ReadDiary = (props) => {
  const [diary, setDiary] = useState();
  const { getOneDiary, removeDiary, error, unsubscribe } = useDiary();
  useErrorHandler(error);

  const { onReadDiary } = props;
  const location = useLocation();
  const history = useHistory();

  //fetch

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const data = await getOneDiary("_id", queryParams.get("_id"));
      if (!data || !mounted) return;

      if (!data.error) {
        setDiary(data);
        onReadDiary(data);
      } else {
        setDiary({});
      }
    };

    fetchData();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [getOneDiary, location, onReadDiary, unsubscribe]);
  //

  const removeHandler = async () => {
    const reply = await removeDiary(diary.date, diary._id);
    if (!reply) return;

    if (!reply.error) {
      history.push("/diary");
    } else {
      //handle error
    }
  };

  return (
    <div>
      {error && <ErrorPage error={error} />}

      <ReadingDiary
        date={diary ? diary.date : null}
        title={diary ? diary.title : null}
        text={diary ? diary.text : null}
        id={diary ? diary._id : null}
        onRemove={removeHandler}
        isLoading={!diary && !error}
      />

      {/* {!diary && !error && (
        <div className="spinner-holder">
          <LoadingSpinner />
        </div>
      )} */}
    </div>
  );
};

export default ReadDiary;
