import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import './Login.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            invalidCredentials: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let url = 'http://localhost:5000/api/authenticate';
        const data = { username: this.state.username, password: this.state.password };

        this.setState({ loading: true });

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(data => localStorage.setItem('token', data.token))
                    this.setState({ loading: false });
                    this.props.history.push('/discover');
                } else {
                    this.setState({ loading: false, invalidCredentials: true });
                }
            }).catch(err => {
                console.error(err);
            });
    }

    componentWillUnmount() {
        this.setState({ loading: false });
    }

    render() {

        let spinnerJSX = null;
        let alertJSX = null;

        if (this.state.loading) {
            spinnerJSX = <Spinner />;
        }

        if (this.state.invalidCredentials) {
            alertJSX = <Alert type="danger" message="Neispravno korisničko ime / lozinka!" />
        }

        return (
            <form className="form form--login" onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                {spinnerJSX}
                <Input name="username" type="text" label="Username" changed={this.handleChange} />
                <Input name="password" type="password" label="Password" changed={this.handleChange} />
                {alertJSX}
                <Button type="submit">Prijavi se</Button>
            </form>
        );
    }
}

export default LoginForm;
