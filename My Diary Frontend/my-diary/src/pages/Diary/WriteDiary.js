import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  getDateForInputAtt,
  inputDateTommddyyyy,
} from "../../utils/date-utils";
import DiaryWritingForm from "../../components/Diary/Write/DiaryWritingForm";
import useDiary from "../../hooks/useDiary";
import useErrorHandler from "../../hooks/useErrorHandler";

/*
  When you want to hide a component and you need the states of it, dont remove that component from render
  {draw && <Component /> } => when draw is false, your states will be gone 
*/

const detectEditMode = (location) => {
  const searchParams = new URLSearchParams(location.search);
  const diaryId = searchParams.get("editId");
  return diaryId;
};

const WriteDiary = (props) => {
  const location = useLocation();
  const history = useHistory();
  const diaryId = detectEditMode(location);

  const [diary, setDiary] = useState(props.diaryWillBeEdited);
  const { getOneDiary, writeDiary, editDiary, isLoading, error, unsubscribe } =
    useDiary();
  useErrorHandler(error);

  const fetchDiary = useCallback(
    async (type, filter, dontListen) => {
      const data = await getOneDiary(type, filter, dontListen);
      if (!data) return;

      if (!data.error) {
        return data;
      } else {
        return;
      }
    },
    [getOneDiary]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const data = await fetchDiary(
        "date",
        inputDateTommddyyyy(getDateForInputAtt())
      );
      if (!mounted) return;

      setDiary(data);
    };

    if (!diaryId && !diary) {
      fetchData();
    }

    return () => {
      mounted = false;
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const data = await fetchDiary("_id", diaryId);
      if (!mounted) return;

      setDiary(data);
    };

    if (diaryId && !diary) {
      fetchData();
    }

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [diaryId, diary, unsubscribe, fetchDiary]);

  const saveHandler = async (title, date, text, isEditMode, diaryFromForm) => {
    console.log("nurada save ettik");
    console.log(diaryFromForm);
    if (isEditMode) {
      const data = await editDiary(
        title,
        date,
        text,
        diaryId ? diaryId : diaryFromForm
      );
      if (!data) return;

      if (data.error) {
        //TODO
      } else {
        history.push("/diary");
      }
    } else {
      const data = await writeDiary(title, date, text);
      if (!data) return;

      if (data.error) {
        //TODO
      } else {
        history.push("/diary");
      }
    }
  };

  const dateChangeHandler = (date) => {
    fetchDiary("date", date).then((data) => {
      if (data) {
        setDiary(data);
        //   history.push({
        //     pathname: "/diary/write",
        //     search: `?editId=${data._id}`,
        //   });
      } else {
        if (diaryId) {
          history.push("/diary/write");
        }
        if (diary) {
          setDiary(null);
        } else return;
      }
    });
  };

  const renderScreen = () => {
    return (
      <React.Fragment>
        <DiaryWritingForm
          isLoading={isLoading}
          onSuccessSave={saveHandler}
          diaryWillBeEdited={diary}
          dateChangeHandler={dateChangeHandler}
        />
      </React.Fragment>
    );
  };

  return <React.Fragment>{renderScreen()}</React.Fragment>;
};

export default WriteDiary;
