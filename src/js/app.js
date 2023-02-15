export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

    this.tbody = this.root.querySelector("section table tbody");

    this.load();
  }

  load() {
    this.entries = [
      {
        login: "wellintonfelipe",
        name: "Wellinton Felipe",
        public_repos: "76",
        followers: "1200000",
      },
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "76",
        followers: "1200000",
      },
    ];
  }

  delete(user) {
    //Principio da imutabilidade
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    console.log(filteredEntries);
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
      row.querySelector(".user p").textContent = user.name;
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
        <p>/wellintonfelipe</p>
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
