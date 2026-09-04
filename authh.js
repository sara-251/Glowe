const signForm = document.querySelector('.sign');
if (signForm) {
    signForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('full').value;
        const email = document.getElementById('Email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm').value;
        const errorMsg = document.getElementById('signupError');

        if (password !== confirmPassword) {
            errorMsg.textContent = 'Passwords do not match';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(u => u.email === email)) {
            errorMsg.textContent = 'This email is already registered';
            return;
        }

        errorMsg.textContent = '';
        const newUser = { fullName, email, password, address: '' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        window.location.href = 'home.html';
    });
}

const loginForm = document.querySelector('.log');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('Email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('loginError');

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userByEmail = users.find(u => u.email === email);

        if (!userByEmail) {
            errorMsg.textContent = 'This email is not registered';
            return;
        }

        if (userByEmail.password !== password) {
            errorMsg.textContent = 'Incorrect password';
            return;
        }

        errorMsg.textContent = '';
        localStorage.setItem('currentUser', JSON.stringify(userByEmail));
        window.location.href = 'home.html';
    });
}