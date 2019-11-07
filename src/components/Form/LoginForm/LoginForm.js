import React, { Component } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import inputConfiguration from './inputConfiguration';
import classes from './RegistrationForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: inputConfiguration,
            isValid: false
        }
    }

    inputChangedHandler = (event, id) => {
        const updatedFormControls = {
            ...this.state.formControls
        }

        const updatedFormInput = {
            ...updatedFormControls[id]
        }

        updatedFormInput.value = event.target.value;
        updatedFormInput.touched = true;

        updatedFormControls[id] = updatedFormInput;

        this.setState({
            formControls: updatedFormControls
        })

    }

    render() {
        const formControlsArray = [];

        for (let key in this.state.formControls) {
            formControlsArray.push({
                id: key,
                config: this.state.formControls[key]
            })
        }

        console.log(formControlsArray);

        return (
            <div className={classes.RegistrationForm}>
                {formControlsArray.map(formElement => {
                    return (
                        <Input elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            key={formElement.id}
                            invalid={!formElement.valid}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    )
                })}
                <Button type="primary">Register</Button>
            </div>
        );
    }
}

export default LoginForm;
