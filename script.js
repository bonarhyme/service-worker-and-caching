function register() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("cache.js")
      .then((isRegistered) =>
        console.log("Service Worker registered: ", isRegistered)
      )
      .catch((error) => console.log(error));
  }
}

function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        console.log("Service Worker Unregistered: ", registration);
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("cache.js")
      .then((isRegistered) =>
        console.log("Service worker registerd automatically:", isRegistered)
      )
      .catch((error) => console.log("Error occured now: ", error));
  });
}
