import React from 'react';

function RightHeader() {
    const handleInstall = (e) => {
        e.preventDefault();
        window.open('/download.html', '_blank');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        window.open('/login.html', '_blank');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        window.open('/signup.html', '_blank');
    };

    return (
        <div className="right-header flex items-center space-x-6">
            <a href="#">Premium</a>
            <a href="#">Support</a>
            <a href="#">Download</a>

            <div className="border-l border-gray-600 h-6"></div>

            <a href="/download.html" className="install-app" onClick={handleInstall}>
                ↓ Install App
            </a>

            <button className="signup-btn" onClick={handleSignup}>Sign up</button>
            <button className="login-btn" onClick={handleLogin}>Log in</button>
        </div>
    );
}

export default RightHeader;