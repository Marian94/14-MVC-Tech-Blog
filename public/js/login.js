const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");

const login = async (event) => {
  event.preventDefault();

  const user = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch("api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      window.location.replace("/");
    } else {
      alert("Incorrect username or password");
    }
  } catch (err) {
    console.log(err);
  }
};

loginBtn.addEventListener("click", login);
