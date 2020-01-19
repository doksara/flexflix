import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import { RootStoreContext } from "../../store/rootStore";
import './Login.scss';

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    let spinnerJSX = null;
    let alertJSX = null;

    /*if (this.state.loading) {
        spinnerJSX = <Spinner />;
    }

    if (this.state.invalidCredentials) {
        alertJSX = <Alert type="danger" message="Neispravno korisničko ime / lozinka!" />
    }*/

    return (
        <Form
            onSubmit={(values) => login(values)}
            render={({
                 handleSubmit,
                 submitting,
                 submitError,
                 invalid,
                 pristine,
                 dirtySinceLastSubmit
            }) => (
            <form className="form form--login" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {spinnerJSX}
                <Field name="username">
                    {props => (
                        <div>
                            <Input label="Username" name={props.input.name} value={props.input.value} onChange={props.input.onChange} />
                        </div>
                    )}
                </Field>
                <Field name="password">
                    {props => (
                        <div>
                            <Input label="Password" name={props.input.name} value={props.input.value} onChange={props.input.onChange} />
                        </div>
                    )}
                </Field>
                {alertJSX}
                <Button type="submit">Prijavi se</Button>
            </form>
                )}
        />
    );
};

export default LoginForm;
