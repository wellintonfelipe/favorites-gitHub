export class GitHubUser {
  static async search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    return await fetch(endpoint)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers,
      }));
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

    this.tbody = this.root.querySelector("section table tbody");

    this.load();
    GitHubUser.search("wellintonfelipe").then((data) => console.log(data));
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
    console.log(this.entries);
  }

  delete(user) {
    //Principio da imutabilidade
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    this.entries = filteredEntries;
    this.update();
  }
}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.update();
  }

  update() {
    this.removeAll();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;

      row.querySelector(".user img").alt = `Avatar gitHub ${user.name}`;
      row.querySelector(".user h2").textContent = user.name;
      row.querySelector(".user p").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;
      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("tem certeza que deseja remover essa linha?");
        if (isOk) {
          this.delete(user);
        }
      };
      this.tbody.append(row);
    });
  }
  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <tr>
    <td class="user">
      <img
        src="https://github.com/wellintonfelipe.png"
        alt="avatar github"
      />
      <a href="https://github.com/wellintonfelipe" target="_blank">
        <h2>Wellinton Felipe</h2>
        <p>/</p>
      </a>
    </td>
    <td class="repositories">5</td>
    <td class="followers">1000</td>
    <td>
      <button class='remove'>Remover</button>
    </td>
  </tr>
    `;
    return tr;
  }

  removeAll() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
