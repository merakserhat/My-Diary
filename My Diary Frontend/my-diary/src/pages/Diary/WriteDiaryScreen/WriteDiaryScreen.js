import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {
  getDateForInputAtt,
  inputDateTommddyyyy,
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
  diary,
  editDiaryFunc,
  writeDiaryFunc,
  getOneDiaryFunc,
  diaryWillBeEdited,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const location = useLocation();
  const history = useHistory();

  const diaryId = detectEditMode(location);

  const onSaveSuccess = () => {
    history.push("/diary");
  };

  const onSaveError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (diaryId != null) {
      getOneDiaryFunc(
        { id: diaryId },
        () => {},
        (error) => {}
      );
    }
  }, []);

  useEffect(() => {
    if (diaryId != null && diary?._id === diaryId) {
      setValue("title", diary.title);
      setValue("text", diary.text);
      setValue("date", getDateForInputAtt(new Date(diary.date)));
    }
  }, [diary]);

  const submitHandler = (data, e) => {
    if (diaryId == null) {
      writeDiaryFunc(
        {
          date: inputDateTommddyyyy(data.date),
          text: data.text,
          title: data.title,
        },
        onSaveSuccess,
        onSaveError
      );
    } else {
      editDiaryFunc({});
    }
  };

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
            {...register("date", { valueAsDate: true })}
          />
        </div>
        <textarea
          placeholder={"Write your diary..."}
          className={`${classes.textarea} ${errors.diary && classes.error}`}
          {...register("text", { required: "Your diary can not be empty" })}
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
  diary: diary?.diary || null,
});

const mapDispatchToProps = {
  getOneDiaryFunc: getOneDiary,
  writeDiaryFunc: writeDiary,
  editDiaryFunc: editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteDiaryScreen);
