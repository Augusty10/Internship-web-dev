const images = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

/* Open Modal */
images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        modal.setAttribute('aria-hidden', 'false');
    });
});

/* Close Modal */
function closeModal() {
    modal.style.display = 'none';
    modalImage.src = '';
    document.body.style.overflow = 'auto';
    modal.setAttribute('aria-hidden', 'true');
}

/* Close on X */
closeBtn.addEventListener('click', closeModal);

/* Close on background click */
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

/* Keyboard support (ESC key) */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});
