export function renderProfile() {
    const app = document.querySelector("#app");

    const profile = JSON.parse(localStorage.getItem("profile"));

    app.innerHTML = `
        <h1>My Profile</h1>
        <h2>${profile.name}</h2>
        <p>${profile.email}</p>
    `;
}
