import React, { useState, createRef } from "react";
import classses from "./AddVideoForm.module.scss";
import PropTypes from "prop-types";

const FIELDS = ["artist", "title", "videoURL"];

const AddVideoForm = props => {
  const [formState, setFormState] = useState({
    form: {
      artist: "",
      title: "",
      videoID: ""
    },
    submitable: false,
    errorMessage: ""
  });

  let videoForm = createRef();

  const { errorMessage } = formState;
  const hasError = !!errorMessage.length;

  const formContent = FIELDS.map((el, idx) => {
    const label = el.toUpperCase;
    return (
      <div className={classses.inputContainer} key={idx}>
        <label className={classses.inputLabel}>
          {el}
          <input
            name={el}
            type="text"
            className={classses.formInput}
            value={formState[el]}
            autoComplete="off"
            onChange={e => _handleChange(e)}
            required
          />
        </label>
      </div>
    );
  });

  const _updateError = message => {
    setFormState(prevState => {
      return {
        ...prevState,
        errorMessage: message
      };
    });
  };

  const _validateInput = (name, value) => {
    switch (name) {
      case "videoID":
        let invalidUrlErrorMessage = "URL is invalid";
        if (
          value.length &&
          /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(value)
        ) {
          invalidUrlErrorMessage = "";
          _updateError(invalidUrlErrorMessage);
          return true;
        }
        _updateError(invalidUrlErrorMessage);
        return true;
      default:
        if (!value.length) {
          let lengthErrorMessage = "Please fill out all fields";
          _updateError(lengthErrorMessage);
          return;
        }
        _updateError("");
        return !value.length;
    }
  };

  const _extractVideoID = url => url.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/)[2];

  const handleSubmit = e => {
    e.preventDefault();
    const { onVideoSubmited } = props;
    const { form } = formState;
    const updatedData = {
      ...form,
      videoID: _extractVideoID(form.videoID)
    };
    onVideoSubmited(updatedData);
    _resetForm();
  };

  const _handleChange = e => {
    const { name, value } = e.target;
    _validateInput(name, value);

    setFormState(prevState => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          [name]: value
        }
      };
    });
  };

  const _resetForm = () => {
    videoForm.current.reset();
  };

  return (
    <form ref={videoForm} onSubmit={(e) => handleSubmit(e)}>
      {formContent}
      <div className={classses.inputContainer}>
        {hasError ? errorMessage : null}
        <button disabled={hasError} className={classses.submitButton} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

AddVideoForm.propTypes = {
  onVideoSubmited: PropTypes.func.isRequired
};

export default AddVideoForm;