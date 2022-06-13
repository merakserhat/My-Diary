import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {
  getDateForInputAtt,
  isBeforeYesterday,
} from "../../../utils/date-utils";
import classes from "./WriteDiaryScreen.module.css";

import {
  getOneDiary,
  writeDiary,
  editDiary,
} from "../../../store/diary/diaryActions";
import { connect } from "react-redux";

const detectEditMode = (location) => {
  const searchParams = new URLSearchParams(location.search);
  const diaryId = searchParams.get("editId");
  return diaryId;
};

const WriteDiaryScreen = ({
  isLoading,
  editDiaryFunc,
  writeDiaryFunc,
  getOneDiaryFunc,
  diaryWillBeEdited,
}) => {
  const location = useLocation();

  const diaryId = detectEditMode(location);

  useEffect(() => {
    getOneDiaryFunc(
      { id: diaryId },
      () => {},
      (error) => {}
    );
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = () => {};

  const disableDate =
    diaryWillBeEdited && isBeforeYesterday(new Date(diaryWillBeEdited.date));

  return (
    <Card className="relative">
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={classes["diary-header"]}>
          <div>
            <input
              className={`${classes.titleInput} ${
                errors.title && classes.error
              }`}
              placeholder="Title"
              type="text"
              {...register("title", { required: "Title can not be empty" })}
            />
          </div>
          <input
            type="date"
            max={getDateForInputAtt()}
            min={getDateForInputAtt(null, true)}
            disabled={disableDate}
          />
        </div>
        <textarea
          placeholder={"Write your diary..."}
          className={`${classes.textarea} ${errors.diary && classes.error}`}
          {...register("diary", { required: "Your diary can not be empty" })}
        />
        <button className={`${classes.saveButton} `}>
          {diaryWillBeEdited ? "Update" : "Save"}
        </button>
      </form>
      {isLoading && <LoadingSpinner />}
    </Card>
  );
};

const mapStateToProps = ({ diary }) => ({
  isLoading: diary?.isLoading || false,
});

const mapDispatchToProps = {
  getOneDiaryFunc: getOneDiary,
  writeDiaryFunc: writeDiary,
  editDiaryFunc: editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteDiaryScreen);
