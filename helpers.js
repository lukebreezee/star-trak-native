const checkPassword = password => {
    // Checks password length
    if (password.length < 10 || password.length > 25) {
        return 'Password must be 10-25 characters';
    }
    // Regular expressions for testing
    const capitalRegex = /[A-Z]/;
    const specialRegex = /[@#$%^&*<>?,.]/;
    // All vars are false until proven true
    let hasCapital, hasSpecial, hasNumber = false;
    // Iterate through each character - check for capital
    // letters, special characters, and numbers. The password must have one of each.
    for (let i = 0; i < password.length; i++) {
        if (capitalRegex.test(password[i])) {
            hasCapital = true;
        } else if (specialRegex.test(password[i])) {
            hasSpecial = true;
        } else if (!isNaN(password[i])) {
            hasNumber = true;
        }
    }
    // Now we check our vars and return different messages based on
    // the outcome.
    if (!hasCapital) {
        return 'Password must contain a capital letter.'
    } else if (!hasSpecial) {
        return 'Password must contain a special character.';
    } else if (!hasNumber) {
        return 'Password must contain a number.';
    } else {
        return '';
    }
};

const checkEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const updateUser = (key, updateValue, username) => {
    axios.post('https://star-trak.herokuapp.com/update-user', {
        key,
        updateValue,
        username
    })
    .then(res => {
        if (res.data.message) {
            return res.data.message;
        } else {
            store.dispatch({type: 'USER LOGIN', userObj: res.data});
            return 'Success';
        }
    });
};

export { checkPassword, checkEmail, updateUser };