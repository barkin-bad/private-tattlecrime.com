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

(function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    let currentIndex = 0;
    let fullImages = [];
    
    galleryItems.forEach((item, idx) => {
        const fullUrl = item.getAttribute('data-full');
        fullImages.push(fullUrl);
        item.addEventListener('click', () => {
            currentIndex = idx;
            openLightbox(fullImages[currentIndex]);
        });
    });
    
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
    }
    
    function closeLightboxFunc() {
        lightbox.style.display = 'none';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
        lightboxImg.src = fullImages[currentIndex];
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % fullImages.length;
        lightboxImg.src = fullImages[currentIndex];
    }
    
    function downloadImage() {
        const url = fullImages[currentIndex];
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                const objectUrl = URL.createObjectURL(blob);
                link.href = objectUrl;
                link.download = `tattlecrime_candid_${currentIndex+1}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(objectUrl);
            })
            .catch(() => {
                window.open(url, '_blank');
            });
    }
    
    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxFunc);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadImage);
    
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFunc();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox || lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightboxFunc();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
})();
