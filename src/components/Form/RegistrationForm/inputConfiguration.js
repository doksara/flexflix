const inputConfiguration = {
    fullName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Full name',
            placeholder: 'Your full name'
        },
        value: '',
        validation: {
            required: true,
            warningMessage: 'Full name is required!'
        },
        valid: false,
        touched: false
    },
    username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Username',
            placeholder: 'Username'
        },
        value: '',
        validation: {
            required: true,
            onlyLowercase: true,
            noSpace: true,
            warningMessage: 'Username must not contain spaces nor uppercase letters!'
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            label: 'Password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6,
            maxLength: 10,
            warningMessage: 'Password must be between 6-10 characters!'
        },
        valid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            label: 'Email',
            placeholder: 'Your email'
        },
        value: '',
        validation: {
            required: true,
            warningMessage: 'E-mail is required!'
        },
        valid: false,
        touched: false
    }
}

export default inputConfiguration;
