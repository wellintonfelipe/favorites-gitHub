import { GitHubUser } from "./GitHubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

    this.tbody = this.root.querySelector("section table tbody");

    this.load();
    GitHubUser.search("wellintonfelipe").then((data) => data);
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }
  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username);

      if (userExists) {
        throw new Error(`${username}, já esta cadastrado! `);
      }

      const user = await GitHubUser.search(username);

      if (user.login === undefined) {
        throw new Error("Usuario não encontrado!");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    //Principio da imutabilidade
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.update();
    this.onAdd();
  }

  onAdd() {
    const addButton = this.root.querySelector("header div button");

    addButton.onclick = () => {
      const { value } = this.root.querySelector("header div input");

      this.add(value);
    };
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
