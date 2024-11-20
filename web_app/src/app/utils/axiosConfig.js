import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/KiloShare",
  // baseURL: 'https://m2acode.com'
});

instance.interceptors.response.use(
  (response) => response, // Si la requête est réussie, on la laisse passer.
  (error) => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      // Si le jeton est expiré, on peut rediriger ou afficher un message
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      window.location.href = "/"; // Redirige vers la page de connexion
    }
    return Promise.reject(error);
  }
);

export default instance;
