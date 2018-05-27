import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) =>{
    
    const reviewField = _.map(formFields, ({name, label}) =>{
        return(
            <div key={name}>
                <label>
                    {label}
                </label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    })

    return (
        <div>
            <h1>Review this...</h1>
            {reviewField}
            <button className="btn red btn-flat white-text" onClick={onCancel}>Back</button>
            <button className="btn teal right btn-flat white-text" onClick={()=>submitSurvey(formValues, history)}>
                Submit
                <i className="material-icons right">email</i>
            </button>

        </div>
    );
};



function mapStateToProps(state){
    return {formValues: state.form.surveyForm.values};
    
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));