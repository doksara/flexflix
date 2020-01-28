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

    const spinnerJSX = <Spinner />;
    const alertJSX = <Alert type="danger" message="Neispravno korisničko ime / lozinka!" />

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
                {submitting && spinnerJSX}
                <Field name="username">
                    {props => (
                        <div>
                            <Input type="text" label="Username" name={props.input.name} value={props.input.value} onChange={props.input.onChange} />
                        </div>
                    )}
                </Field>
                <Field name="password">
                    {props => (
                        <div>
                            <Input type="password" label="Password" name={props.input.name} value={props.input.value} onChange={props.input.onChange} />
                        </div>
                    )}
                </Field>
                {submitError && alertJSX}
                <Button type="submit">Prijavi se</Button>
            </form>
                )}
        />
    );
};

export default LoginForm;
