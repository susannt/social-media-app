const REGISTER_URL = "https://v2.api.noroff.dev/auth/register";
const LOGIN_URL = "https://v2.api.noroff.dev/auth/login";

export async function login(email, password) {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email,
            password            
        })
    });

    const result = await response.json();

    return result;
}