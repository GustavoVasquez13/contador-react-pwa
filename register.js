// una forma de saber si esta disponible el serviceWorker
if ("serviceWorker" in navigator) {
    console.log('Existe el serviceWorker');
}

// otra forma
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js');
}