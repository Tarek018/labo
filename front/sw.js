// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js');
//   });
// }

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRegisterSW = void 0;
function useRegisterSW(options) {
    var needRefresh = Object(Solid.createSignal)(false);
    var offlineReady = Object(Solid.createSignal)(false);
    var updateServiceWorker = function (reloadPage) {
        if (reloadPage === void 0) { reloadPage = false; }
        return new Promise(function (resolve, reject) {
            if (!('serviceWorker' in navigator)) {
                reject(new Error('Service workers are not supported.'));
                return;
            }
            var swUrl = "/service-worker.js";
            navigator.serviceWorker
                .register(swUrl)
                .then(function (registration) {
                if (options === null || options === void 0 ? void 0 : options.onRegisteredSW) {
                    options.onRegisteredSW(swUrl, registration);
                }
                else if (options === null || options === void 0 ? void 0 : options.onRegistered) {
                    options.onRegistered(registration);
                }
                else {
                    console.log('Service worker registered.');
                }
                if (navigator.serviceWorker.controller) {
                    if (reloadPage) {
                        window.location.reload();
                    }
                    else {
                        needRefresh[1](true);
                    }
                }
                else {
                    offlineReady[1](true);
                }
                resolve();
            })
                .catch(function (error) {
                console.error('Error during service worker registration:', error);
                if (options === null || options === void 0 ? void 0 : options.onRegisterError) {
                    options.onRegisterError(error);
                }
                reject(error);
            });
        });
    };
    if (options === null || options === void 0 ? void 0 : options.immediate) {
        updateServiceWorker();
    }
    return { needRefresh: needRefresh, offlineReady: offlineReady, updateServiceWorker: updateServiceWorker };
}
exports.useRegisterSW = useRegisterSW;

