import React, { Component, createRef } from "react";
import classses from "./AddVideoForm.module.scss";
import PropTypes from "prop-types";

const initialState = {
  form: {
    artist: "",
    title: "",
    videoID: ""
  },
  submitable: false,
  errorMessage: ''
};

export default class AddVideoForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.videoForm = createRef();
  }
  _updateError = (message) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errorMessage: message
      }
    });
  }
  _validateInput = (name, value) => {
    switch (name) {
      case "videoID":
        let invalidUrlErrorMessage = 'URL is invalid';
        debugger
        if(value.length && /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(value)){
          invalidUrlErrorMessage = '';
          this._updateError(invalidUrlErrorMessage);
          return true;
        }
        this._updateError(invalidUrlErrorMessage);
        return true;
      default:
        if(!value.length){
          let lengthErrorMessage = 'Please fill out all fields'
          this._updateError(lengthErrorMessage);
          return;    
        }
        this._updateError('') 
        return !value.length;
    }
  };

  _extractVideoID = url => url.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/)[2];

  handleSubmit = e => {
    debugger
    e.preventDefault();
    const { onVideoSubmited } = this.props;
    const {form} = this.state;
    const updatedData = {
      ...form,
      videoID: this._extractVideoID(form.videoID)
    }
    onVideoSubmited(updatedData);
    this._resetForm();
  };

  _handleChange = e => {
    const { name, value } = e.target;
    this._validateInput(name, value);
  
    this.setState(prevState => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          [name]: value
        }
      }
    });
  };

  _resetForm = () => { 
    this.videoForm.current.reset();
  }

  render() {
    const { errorMessage } = this.state;
    const hasError = !!errorMessage.length;
    const formContent = Object.keys(this.state.form).map((el, idx) => {
      const label = el.toUpperCase;
      return (
        <div className={classses.inputContainer} key={idx}>
          <label className={classses.inputLabel}>
            {el}
            <input
              name={el}
              type="text"
              className={classses.formInput}
              value={this.state[el]}
              autoComplete="off"
              onChange={e => this._handleChange(e)}
              required
            />
          </label>
        </div>
      );
    });
    

    return (
      <form ref={this.videoForm} onSubmit={this.handleSubmit}>
        {formContent}
        <div className={classses.inputContainer}>
          {
            hasError ? errorMessage : null
          }
          <button disabled={hasError} className={classses.submitButton} type="submit">Add</button>
        </div>
      </form>
    );
  }
}
AddVideoForm.propTypes = {
  onVideoSubmited: PropTypes.func.isRequired
};
