// lista de archivos q se van a cahear
const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js",
    "./index.js"
];

// nombre del serviceWorker
const CACHE_NAME = "v1_cache_contador_react";

// self es una constante igual a this const self = this
// capturar el evento install del serviceWorker
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            }).catch((err) => {
                console.log("error en el cacheo", err);
            });
        })
    );
});

// capturar el evento activate del serviceWorker
self.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME];    
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    cacheWhiteList.indexOf(cache) === -1 && caches.delete(cache);
                    // if (cache !== CACHE_NAME) {
                    //     return caches.delete(cache);
                    // }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// capturar el evento fetch del serviceWorker
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

// quitar arrow function
// self.addEventListener("fetch", (e) => {
//     e.respondWith(() => {
//         caches.match(e.request).then((response) => {
//             if (response) {
//                 return response;
//             }
//             return fetch(e.request);
//         });
//     });
// });