import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import './Login.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
        const data = { ...this.state };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.props.history.push('/shows');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
                console.error(err);
            })
    }

    render() {

        return (
            <form className="form form--login" onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <Input name="username" type="text" label="Username" changed={this.handleChange} />
                <Input name="password" type="password" label="Password" changed={this.handleChange} />
                <Button type="submit">Prijavi se</Button>
            </form>
        );
    }
}

export default LoginForm;
