// Service Worker Registrierung
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker erfolgreich registriert:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker Registrierung fehlgeschlagen:', error);
      });
  });
}
