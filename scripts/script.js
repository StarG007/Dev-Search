var myVar;

async function searchDev() {
  let query = document.getElementById("searchInput").value;
  document.getElementById("progress").style.display = "block";

  if (!query) {
    alert("Opps! you forget to enter dev name");
    return;
  }
  let response = await fetch(
    `https://api.github.com/search/users?q=${query}&per_page=10`
  );
  let data = await response.json();

  let devDiv = document.getElementById("resultContainer");
  devDiv.style.display = "block";

  myVar = setTimeout(showPage, 3000);
  function showPage() {
    document.getElementById("progress").style.display = "none";
  }

  let resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  if (data.items && data.items.length > 0) {
    data.items.forEach(async (devs) => {
      let userDetails = await fetch(
        `https://api.github.com/users/${devs.login}`
      );
      let userData = await userDetails.json();

      let userCard = document.createElement("div");
      userCard.classList.add("results-container");
      userCard.innerHTML = `
    <div class="devCard"> <div class="devDetails">
    <div class="username">
    <img
          class="userimg" src="${devs.avatar_url}" alt="user image" width="84" height="auto"/>
    <h3>${devs.login}</h3>
    </div>
    <div class="vertDivider"></div>
    <div class="devinfo">
    <div class="followers"><h4>${userData.followers}</h4><p>Followers</p></div>
    <div class="followers"><h4>${userData.public_repos}</h4><p>Repositories</p></div>
    </div>
    </div></div>
    `;
      resultDiv.appendChild(userCard);
    });
  } else {
    resultDiv.innerHTML = `<p class="error-state">Sorry! No devs with this name found. Please search different name.</p>`;
  }
}
