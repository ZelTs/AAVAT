document.addEventListener('scroll', function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var parallaxElements = document.querySelectorAll('.sc__img');

    parallaxElements.forEach(function(element) {
        var parallaxOffset = scrollTop * 0.5; // Ajusta el factor de paralaje según sea necesario
        element.style.backgroundPositionY = parallaxOffset + 'px';
    });
});

document.addEventListener('scroll', function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var parallaxElements = document.querySelectorAll('.contact__img');

    parallaxElements.forEach(function(element) {
        var parallaxOffset = scrollTop * 0.5; // Ajusta el factor de paralaje según sea necesario
        element.style.backgroundPositionY = parallaxOffset + 'px';
    });
});