const target = document.querySelectorAll('.target');
const options = {
    threshold: 0.3

};
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
        else {
            entry.target.classList.remove('active');
        }
    });
}
const observer = new IntersectionObserver(callback, options);
target.forEach(section => {
    observer.observe(section);
});