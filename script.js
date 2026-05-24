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
    const galleryImages = [
        "https://sun9-61.userapi.com/s/v1/ig1/PhcvJoRaIVX8ViQRMKRJh4jQcKZLYB6LdusTriYJaY_SS9gGSTpznE8CQxd1GiJ3bHIQPpse.jpg?quality=96&as=32x21,48x32,72x48,108x72,160x106,240x160,360x240,480x319,540x359,640x426,720x479,1080x719,1280x852,1440x958,2560x1704&from=bu&cs=2560x0",
        "https://sun9-24.userapi.com/s/v1/ig1/k7ntPXn3iR937whn-qdTPZqLyYY1GebSjlVeZV9yhmGU_oALfNHGeMaUzj2oip5VnWB5zfJT.jpg?quality=96&as=32x21,48x32,72x48,108x72,160x106,240x160,360x239,480x319,540x359,640x426,720x479,1080x718,1280x851,1440x958,2560x1703&from=bu&cs=2560x0",
        "https://sun9-77.userapi.com/s/v1/ig1/iKH8zs-GzqtTddbdVXqcqibbUvQ10QwVjXQBpTX8dXRjltPFqzcZ-hl5Q1HCP95soBPHxS_a.jpg?quality=96&as=32x48,48x72,72x108,108x162,160x240,240x361,360x541,480x721,540x812,640x962,720x1082,1080x1623,1280x1924,1437x2160&from=bu&cs=1437x0",
        "https://sun9-32.userapi.com/s/v1/ig1/F6TmSnj5IEnqwyYF2V3kdQoz95SZH-cv0qDbsfDxRNsWm14facpsGVZUvNigiqUlPEHBlqb-.jpg?quality=96&as=32x21,48x32,72x48,108x72,160x106,240x160,360x239,480x319,540x359,640x426,720x479,1080x718,1280x851,1440x958,2560x1703&from=bu&cs=2560x0"
    ];

    let currentIndex = 0;
    const modal = document.getElementById('galleryModal');
    const galleryImg = document.getElementById('galleryImage');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const closeBtn = document.querySelector('.gallery-close');
    const downloadLink = document.getElementById('downloadBtn');

    function openLightbox(index) {
        if (!modal || !galleryImages[index]) return;
        currentIndex = index;
        updateLightboxImage();
        modal.style.display = 'flex';
    }

    function updateLightboxImage() {
        if (galleryImg && galleryImages[currentIndex]) {
            galleryImg.src = galleryImages[currentIndex];
            if (downloadLink) {
                downloadLink.href = galleryImages[currentIndex];
                const urlParts = galleryImages[currentIndex].split('/');
                let filename = urlParts.pop().split('?')[0];
                if (!filename || filename.length < 5) filename = `candid_${currentIndex+1}.jpg`;
                downloadLink.download = filename;
            }
        }
    }

    function nextImage(e) {
        if (e) e.stopPropagation();
        if (currentIndex + 1 < galleryImages.length) {
            currentIndex++;
            updateLightboxImage();
        } else {
            if (galleryImages.length > 0) currentIndex = 0;
            updateLightboxImage();
        }
    }

    function prevImage(e) {
        if (e) e.stopPropagation();
        if (currentIndex - 1 >= 0) {
            currentIndex--;
            updateLightboxImage();
        } else {
            if (galleryImages.length > 0) currentIndex = galleryImages.length - 1;
            updateLightboxImage();
        }
    }

    function closeLightbox() {
        if (modal) modal.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.candid-card');
        cards.forEach((card, idx) => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                let index = card.getAttribute('data-index');
                if (index !== null) index = parseInt(index);
                else index = idx;
                if (!isNaN(index) && galleryImages[index]) {
                    openLightbox(index);
                }
            });
        });

    });

    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeLightbox();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
})();
