import React, { useEffect, useReducer } from "react";
import {
  getDateForInputAtt,
  isBeforeYesterday,
} from "../../../utils/date-utils";
import Card from "../../UI/Card";
import classes from "./DiaryWritingForm.module.css";
import { inputDateTommddyyyy } from "../../../utils/date-utils";
import LoadingSpinner from "../../UI/LoadingSpinner";

const initialState = {
  text: {
    value: "",
    error: false,
  },
  title: {
    value: "",
    error: false,
  },
  date: {
    value: getDateForInputAtt(),
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "set-text":
      return {
        ...state,
        text: { error: state.text.error, value: action.payload },
      };
    case "set-title":
      return {
        ...state,
        title: { error: state.title.error, value: action.payload },
      };
    case "set-date":
      return {
        ...state,
        date: { value: action.payload },
      };
    case "set-text-error":
      return {
        ...state,
        text: { error: action.payload, value: state.text.value },
      };
    case "set-title-error":
      return {
        ...state,
        title: { error: action.payload, value: state.title.value },
      };
    case "set-form":
      return {
        text: {
          value: action.payload.text,
          error: false,
        },
        title: {
          value: action.payload.title,
          error: false,
        },
        date: {
          value: getDateForInputAtt(new Date(action.payload.date)),
        },
      };
    case "reset-form":
      return {
        text: {
          value: "",
          error: false,
        },
        title: {
          value: "",
          error: false,
        },
        date: state.date,
      };
    default:
      throw new Error("Action type is not recognized");
  }
}

const DiaryWritingForm = (props) => {
  const { dateChangeHandler } = props;
  const [formState, dispatchForm] = useReducer(reducer, initialState);

  const submitHandler = (event) => {
    event.preventDefault();

    const titleHasError = !(formState.title.value.trim().length > 0);
    const textHasError = !(formState.text.value.trim().length > 0);

    titleHasError &&
      dispatchForm({ type: "set-title-error", payload: titleHasError });
    textHasError &&
      dispatchForm({ type: "set-text-error", payload: textHasError });

    if (!titleHasError && !textHasError) {
      props.onSuccessSave(
        formState.title.value,
        inputDateTommddyyyy(formState.date.value),
        formState.text.value,
        props.diaryWillBeEdited ? true : false,
        props.diaryWillBeEdited ? props.diaryWillBeEdited._id : null
      );
    }
  };

  let didSomethingChange = true;
  if (props.diaryWillBeEdited) {
    if (
      props.diaryWillBeEdited.text === formState.text.value &&
      props.diaryWillBeEdited.title === formState.title.value
    ) {
      didSomethingChange = false;
    } else {
      didSomethingChange = true;
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (props.diaryWillBeEdited) {
        dispatchForm({ type: "set-form", payload: props.diaryWillBeEdited });
      } else {
        dispatchForm({ type: "reset-form" });
      }
    }

    return () => (mounted = false);
  }, [props.diaryWillBeEdited]);

  const disableDate =
    props.diaryWillBeEdited &&
    isBeforeYesterday(new Date(props.diaryWillBeEdited.date));

  return (
    <Card className="relative">
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes["diary-header"]}>
          <input
            className={`${classes.titleInput} ${
              formState.title.error && classes.error
            }`}
            placeholder="Title"
            type="text"
            value={formState.title.value}
            onChange={(event) =>
              dispatchForm({ type: "set-title", payload: event.target.value })
            }
            onFocus={() =>
              dispatchForm({ type: "set-title-error", payload: false })
            }
          />
          <input
            type="date"
            max={getDateForInputAtt()}
            min={getDateForInputAtt(null, true)}
            disabled={disableDate}
            value={formState.date.value}
            onChange={(event) => {
              dispatchForm({ type: "set-date", payload: event.target.value });
              dateChangeHandler(inputDateTommddyyyy(event.target.value));
            }}
          />
        </div>
        <textarea
          placeholder={"Write your diary..."}
          className={`${classes.textarea} ${
            formState.text.error && classes.error
          }`}
          value={formState.text.value}
          onChange={(event) =>
            dispatchForm({ type: "set-text", payload: event.target.value })
          }
          onFocus={() =>
            dispatchForm({ type: "set-text-error", payload: false })
          }
        />
        <button
          className={`${classes.saveButton} ${
            !didSomethingChange && classes.disabled
          }`}
        >
          {props.diaryWillBeEdited ? "Update" : "Save"}
        </button>
      </form>
      {props.isLoading && <LoadingSpinner />}
    </Card>
  );
};

export default DiaryWritingForm;
