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
// CANDIDS GALLERY & LIGHTBOX
const candidCards = document.querySelectorAll('.candid-card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.lightbox-close');
const prevDot = document.querySelector('.prev-dot');
const nextDot = document.querySelector('.next-dot');
const downloadBtn = document.getElementById('download-btn');

let currentIndex = 0;
const images = [];

candidCards.forEach((card, idx) => {
    const img = card.querySelector('img');
    images.push(img.src);
    card.addEventListener('click', () => {
        currentIndex = idx;
        openLightbox(currentIndex);
    });
});

function openLightbox(index) {
    lightbox.style.display = 'flex';
    lightboxImg.src = images[index];
    updateDownloadLink(index);
}

function updateDownloadLink(index) {
    const url = images[index];
    downloadBtn.href = url;
    const fileName = `candid_${index+1}.jpg`;
    downloadBtn.download = fileName;
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
    updateDownloadLink(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
    updateDownloadLink(currentIndex);
}

if (prevDot) prevDot.addEventListener('click', showPrev);
if (nextDot) nextDot.addEventListener('click', showNext);
if (closeLightbox) closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') showPrev();
        else if (e.key === 'ArrowRight') showNext();
        else if (e.key === 'Escape') lightbox.style.display = 'none';
    }
});
}
    })();
