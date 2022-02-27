import { useCallback } from "react";
import { useSelector } from "react-redux";
import useHttps from "./use-https";

const useDiary = () => {
  const { sendRequest, isLoading, error, unsubscribe } = useHttps();

  const token = useSelector((state) => state.auth.token);

  const getDiaryList = useCallback(
    async (pageNumber) => {
      const config = {
        url: `/diary/list?page=${pageNumber}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await sendRequest(config);
      return data;
    },
    [token, sendRequest]
  );

  const getOneDiary = useCallback(
    async (type, filter, dontListen) => {
      if (type === "_id") {
        filter = `?_id=${filter}`;
      } else if (type === "date") {
        filter = `?date=${filter}`;
      } else {
        return;
      }

      const config = {
        url: `/diary/get-one${filter}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await sendRequest(config, dontListen);
      return data;
    },
    [token, sendRequest]
  );

  const writeDiary = useCallback(
    async (title, date, text) => {
      const config = {
        url: `/diary/write`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          date,
          text,
          title,
        },
      };
      const data = await sendRequest(config);
      return data;
    },
    [token, sendRequest]
  );

  const editDiary = useCallback(
    async (title, date, text, diaryId) => {
      const config = {
        url: `/diary/edit`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          date,
          text,
          title,
          diaryId,
        },
      };
      const data = await sendRequest(config);
      return data;
    },
    [token, sendRequest]
  );

  const removeDiary = useCallback(
    async (date, diaryId) => {
      const config = {
        url: `/diary/delete`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          date,
          diaryId,
        },
      };
      const data = await sendRequest(config);
      return data;
    },
    [token, sendRequest]
  );

  return {
    isLoading,
    error,
    getDiaryList,
    getOneDiary,
    writeDiary,
    editDiary,
    unsubscribe,
    removeDiary,
  };
};

export default useDiary;
