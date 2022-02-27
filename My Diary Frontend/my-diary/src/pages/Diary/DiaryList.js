import { useEffect, useState } from "react";
import ListItem from "../../components/Diary/List/ListItem";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import useDiary from "../../hooks/useDiary";
import useErrorHandler from "../../hooks/useErrorHandler";

const DiaryList = () => {
  const { getDiaryList, isLoading, error, unsubscribe } = useDiary();
  useErrorHandler(error);
  const [diaryList, setDiaryLisy] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const data = await getDiaryList(1);
      if (!data || !mounted) return;

      if (data.error) {
        //TODO: handle error
      } else {
        setDiaryLisy(data.diaries);
      }
    };

    if (mounted) {
      fetchData();
    }

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [getDiaryList, unsubscribe]);

  const renderListItems = () => {
    return diaryList.map((item) => (
      <ListItem
        key={item._id}
        date={item.date}
        title={item.title}
        id={item._id}
      />
    ));
  };
  return (
    <div>
      {!isLoading && renderListItems()}
      {isLoading && (
        <div className="spinner-holder">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default DiaryList;
