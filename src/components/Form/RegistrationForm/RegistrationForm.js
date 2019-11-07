import React, { Component } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import inputConfiguration from './inputConfiguration';
import classes from './RegistrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: inputConfiguration,
            isValid: false
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.onlyLowercase) {
            isValid = value.toLowerCase() === value && isValid;
        }

        if (rules.noSpace) {
            isValid = value.split(' ').length < 2 && isValid;
        }

        if (rules.minLength && rules.maxLength) {
            isValid = (value.length >= rules.minLength) && (value.length <= rules.maxLength) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, id) => {
        const updatedFormControls = {
            ...this.state.formControls
        }

        const updatedFormInput = {
            ...updatedFormControls[id]
        }

        updatedFormInput.value = event.target.value;
        updatedFormInput.valid = this.checkValidity(updatedFormInput.value, updatedFormInput.validation);
        updatedFormInput.touched = true;

        updatedFormControls[id] = updatedFormInput;

        this.setState({
            formControls: updatedFormControls
        });
    }

    render() {
        const formControlsArray = [];

        for (let key in this.state.formControls) {
            formControlsArray.push({
                id: key,
                config: this.state.formControls[key]
            });
        }

        return (
            <div className={classes.RegistrationForm}>
                {formControlsArray.map(formElement => {
                    return (
                        <Input elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            key={formElement.id}
                            touched={formElement.config.touched}
                            invalid={!formElement.config.valid}
                            warningMessage={formElement.config.validation.warningMessage}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    )
                })}
                <Button type="primary">Register</Button>
            </div>
        );
    }
}

export default RegistrationForm;
