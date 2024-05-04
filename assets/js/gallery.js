// Array con los nombres de las imágenes
const imageNames = [
    "gallery__01",
    "gallery__02",
    "gallery__03",
    "gallery__04",
    "gallery__05"
];

// Variable para almacenar el índice actual de la imagen
let currentIndex = 0;

// Variables para almacenar la posición inicial del toque
let touchStartX = 0;
let touchEndX = 0;

// Función para cargar las imágenes
function loadGalleryImages() {
    const galleryViewport = document.querySelector(".gallery__viewport");
    const imageIndicators = document.getElementById("imageIndicators");

    // Limpiar el contenedor de la galería y los indicadores
    galleryViewport.innerHTML = "";
    imageIndicators.innerHTML = "";

    // Iterar sobre los nombres de las imágenes y crear elementos <img> y indicadores
    imageNames.forEach((imageName, index) => {
        const img = document.createElement("img");
        img.classList.add("gallery__image");
        img.classList.add("slide-animation"); // Agregar la clase slide-animation
        img.src = `/assets/img/jpg/${imageName}.jpg`;
        img.alt = `Image ${index + 1}`;
        img.style.transform = `translateX(${index * 100}%)`; // Posicionar la imagen

        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        if (index === 0) {
            indicator.classList.add("active");
        }
        indicator.addEventListener("click", () => {
            showImage(index);
        });

        galleryViewport.appendChild(img);
        imageIndicators.appendChild(indicator);
    });
}

// Función para mostrar la siguiente imagen en la galería
function showNextImage() {
    currentIndex = (currentIndex + 1) % imageNames.length; // Obtener el índice de la siguiente imagen
    showImage(currentIndex); // Mostrar la siguiente imagen
}

// Función para mostrar la imagen anterior en la galería
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length; // Obtener el índice de la imagen anterior
    showImage(currentIndex); // Mostrar la imagen anterior
}

function showImage(index) {
    const galleryViewport = document.querySelector(".gallery__viewport");
    const images = document.querySelectorAll(".gallery__image");
    const indicators = document.querySelectorAll(".indicator");

    // Removemos la clase "active" de todos los indicadores
    indicators.forEach(indicator => {
        indicator.classList.remove("active");
    });

    // Agregamos la clase "active" solo al indicador correspondiente
    indicators[index].classList.add("active");

    // Iteramos sobre las imágenes y ajustamos su posición según el índice seleccionado
    images.forEach((image, i) => {
        const displacement = -index * 100; // Calculamos el desplazamiento
        const transformValue = `translateX(${displacement}%)`; // Construimos el valor de transformación
        image.style.transform = transformValue; // Aplicamos la transformación a cada imagen
    });

    // Añadir la clase slide-animation nuevamente
    images.forEach(image => {
        image.classList.add("slide-animation");
    });
}


// Función para manejar el inicio del deslizamiento táctil
function handleTouchStart(event) {
    const images = document.querySelectorAll(".gallery__image");
    // Remover la clase de animación de deslizamiento para permitir el desplazamiento táctil
    images.forEach(image => {
        image.classList.remove("slide-animation");
    });
    touchStartX = event.touches[0].clientX;
}

// Función para manejar el final del deslizamiento táctil
function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleGesture();
    const images = document.querySelectorAll(".gallery__image");
    // Restaurar la clase de animación de deslizamiento después de que se complete el deslizamiento táctil
    images.forEach(image => {
        image.classList.add("slide-animation");
    });
}

// Función para manejar el gesto de deslizamiento
function handleGesture() {
    const swipeThreshold = 50; // Umbral de deslizamiento (en píxeles)

    // Calculamos la distancia del deslizamiento
    const deltaX = touchEndX - touchStartX;

    // Si el deslizamiento es mayor que el umbral, cambiamos la imagen
    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            // Deslizamiento hacia la derecha, mostrar la imagen anterior
            showPreviousImage();
        } else {
            // Deslizamiento hacia la izquierda, mostrar la siguiente imagen
            showNextImage();
        }
    }
}

// Añadir listeners de eventos táctiles a la ventana
window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchend', handleTouchEnd, false);

// Llamar a la función para cargar las imágenes cuando se cargue el documento
document.addEventListener("DOMContentLoaded", loadGalleryImages);
