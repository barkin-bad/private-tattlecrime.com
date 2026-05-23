    (function() {
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input');
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query === "") {
                    alert("Please enter something to search on tattlecrime.com");
                } else {
                    alert(`Searching for: "${query}"\n(Search is not actually implemented, it's just for the vibe.)`);
                }
            });
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchBtn.click();
                }
            });
        }
        
        const modal = document.getElementById('authModal');
        const loginLink = document.getElementById('loginLink');
        const signupLink = document.getElementById('signupLink');
        const closeModalBtn = document.querySelector('.close-modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubmitBtn = document.getElementById('modalSubmitBtn');
        const authForm = document.getElementById('authForm');
        const usernameInput = document.getElementById('modalUsername');
        const passwordInput = document.getElementById('modalPassword');
        const confirmGroup = document.getElementById('confirmPasswordGroup');
        const confirmInput = document.getElementById('modalConfirmPassword');

        let currentMode = 'login';
        
        function openModal(mode) {
            currentMode = mode;
            usernameInput.value = '';
            passwordInput.value = '';
            if (confirmInput) confirmInput.value = '';
            usernameInput.setCustomValidity('');
            passwordInput.setCustomValidity('');
            if (confirmInput) confirmInput.setCustomValidity('');
            
            if (mode === 'login') {
                modalTitle.textContent = 'Login';
                modalSubmitBtn.textContent = 'Login';
                confirmGroup.style.display = 'none';
                confirmInput.removeAttribute('required');
            } else {
                modalTitle.textContent = 'Sign Up';
                modalSubmitBtn.textContent = 'Sign Up';
                confirmGroup.style.display = 'block';
                confirmInput.setAttribute('required', 'required');
            }
            modal.style.display = 'flex';
            setTimeout(() => usernameInput.focus(), 50);
        }
        function closeModal() {
            modal.style.display = 'none';
        }
        function showJokeMessage() {
            alert("Sorry, this website is just a joke. You can't register or log in, silly. :)");
        }
        function handleSubmit(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            if (username === '') {
                alert("Please enter a username.");
                usernameInput.focus();
                return false;
            }
            if (password === '') {
                alert("Please enter a password.");
                passwordInput.focus();
                return false;
            }
            
            if (currentMode === 'signup') {
                const confirm = confirmInput.value.trim();
                if (confirm === '') {
                    alert("Please confirm your password.");
                    confirmInput.focus();
                    return false;
                }
                if (password !== confirm) {
                    alert("Passwords do not match. Try again.");
                    confirmInput.focus();
                    return false;
                }
            }
            showJokeMessage();
            closeModal();
            return false;
        }
        if (loginLink) {
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('login');
            });
        }
        if (signupLink) {
            signupLink.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('signup');
            });
        }
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        if (authForm) {
            authForm.addEventListener('submit', handleSubmit);
        }
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeModal();
            }
        });
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    })();

.press-article {
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 20px 0 40px;
}

.article-header {
  margin-bottom: 32px;
  border-bottom: 2px solid #e2b7c2;
  padding-bottom: 20px;
}

.article-section {
  display: inline-block;
  background: #88354A;
  color: white;
  font-family: 'Cabin Condensed', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 4px 12px;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.article-title {
  font-size: 42px;
  font-weight: 700;
  color: #b13e5a;
  line-height: 1.2;
  margin: 0 0 12px 0;
  font-family: 'Merriweather', Georgia, serif;
}

.article-meta {
  font-family: 'Courier Prime', monospace;
  font-size: 14px;
  color: #555;
  border-left: 3px solid #2c8c7a;
  padding-left: 14px;
}

.article-lead {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  color: #1a1a1a;
  margin: 24px 0 32px 0;
  font-family: 'Merriweather', Georgia, serif;
}

.article-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  margin: 32px 0;
}

.article-main-text p {
  font-size: 17px;
  line-height: 1.65;
  margin-bottom: 24px;
  color: #2a2a2a;
}

.pull-quote {
  margin: 32px 0;
  padding: 20px 30px;
  background: #f9f1e4;
  border-left: 6px solid #b13e5a;
  font-style: normal;
}

.pull-quote p {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 0 0 12px 0;
  line-height: 1.3;
  font-family: 'Merriweather', Georgia, serif;
}

.pull-quote span {
  font-size: 14px;
  color: #555;
  font-family: 'Courier Prime', monospace;
}

.article-sidebar .sidebar-box {
  background: #f5f5f0;
  padding: 24px;
  border: 1px solid #ddd8cf;
}

.sidebar-box h3 {
  font-size: 20px;
  font-weight: 700;
  color: #88354A;
  margin: 0 0 16px 0;
  font-family: 'Cabin Condensed', sans-serif;
  letter-spacing: 0.5px;
}

.sidebar-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-box li {
  font-size: 15px;
  line-height: 1.5;
  padding: 8px 0 8px 20px;
  position: relative;
  font-family: 'Merriweather', Georgia, serif;
  border-bottom: 1px dashed #ddd;
}

.sidebar-box li:before {
  content: "•";
  color: #b13e5a;
  font-size: 18px;
  position: absolute;
  left: 0;
  top: 6px;
}

.article-image {
  margin: 32px 0;
  text-align: center;
}

.article-image img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  border: 1px solid #eae3d8;
}

.article-image figcaption {
  font-family: 'Courier Prime', monospace;
  font-size: 13px;
  color: #555;
  margin-top: 8px;
  text-align: center;
}

.article-image-lead img {
  max-height: 500px;
  width: 100%;
  object-fit: cover;
}

.article-image-inline {
  float: right;
  width: 45%;
  margin: 0 0 20px 24px;
}

.article-closing {
  font-size: 18px;
  font-weight: 500;
  border-top: 2px solid #e2b7c2;
  padding-top: 28px;
  margin-top: 20px;
  color: #2c2c2c;
  font-style: normal;
}

@media (max-width: 850px) {
  .article-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .article-image-inline {
    float: none;
    width: 100%;
    margin: 24px 0;
  }
  .article-title {
    font-size: 32px;
  }
  .pull-quote p {
    font-size: 20px;
  }
}

@media (max-width: 550px) {
  .press-article {
    padding: 10px 0 30px;
  }
  .article-title {
    font-size: 26px;
  }
  .article-lead {
    font-size: 18px;
  }
  .pull-quote {
    padding: 16px 20px;
  }
  .pull-quote p {
    font-size: 18px;
  }
  .sidebar-box {
    padding: 18px;
  }
}
