const logoutLink = document.querySelector("#logout");

const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "Application/JSON" },
  });
  if (response.ok) {
    window.location.replace("/");
  }
};

logoutLink.addEventListener("click", logout);
