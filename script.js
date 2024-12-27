// Daftar harga produk
const prices = {
  mie_Ayam: 10000,
  martabak_Kari: 10000,
  mie_Goreng: 8000,
  nasi_Goreng: 10000,
  mie_Tumis: 10000,
  nasi_AyamGeprek: 10000,
  sosis_Bakso: 1000,
  es_Jeruk: 5000,
  cappucino: 5000,
  bengbeng: 5000,
  pop_Ice: 5000,
  nutrisari: 4000,
  milo: 5000,
  teh_Sisri: 2000,
  teajus: 2000,
  jus_Mangga: 5000,
  jus_BuahNaga: 5000,
  jus_Apel: 5000,
  jus_Alpukat: 5000,
};
document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  const productIDs = Object.keys(prices);

  let found = false;
  for (let id of productIDs) {
    const normalizedID = id.toLowerCase().replace(/\s+/g, "");

    if (normalizedID === searchTerm) {
      const targetElement = document.getElementById(id);
      targetElement.scrollIntoView({ behavior: "smooth" });
      targetElement.style.fontStyle = "italic";
      found = true;
      break;
    }
  }

  if (!found) {
    alert("Produk tidak ditemukan!");
  }
});

// Tombol untuk membuka menu
const openMenu = document.getElementById("openMenu");

// Elemen modal dan tombol tutup
const menuModal = document.getElementById("menuModal");
const closeMenu = document.getElementById("closeMenu");

// Event Listener untuk membuka menu
openMenu.addEventListener("click", () => {
  menuModal.style.display = "flex"; // Tampilkan modal
});

// Event Listener untuk menutup menu
closeMenu.addEventListener("click", () => {
  menuModal.style.display = "none"; // Sembunyikan modal
});

function increment(id) {
  const countElement = document.getElementById(id + "_count");
  let count = parseInt(countElement.textContent, 10);

  if (isNaN(count)) {
    count = 0;
  }

  count++;
  countElement.textContent = count;
  updateTotal();
}

function decrement(id) {
  const countElement = document.getElementById(id + "_count");
  let count = parseInt(countElement.textContent, 10);

  if (isNaN(count)) {
    count = 0;
  }

  if (count > 0) {
    count--;
    countElement.textContent = count;
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  for (let item in prices) {
    const quantity =
      parseInt(document.getElementById(item + "_count").textContent, 10) || 0;
    total += prices[item] * quantity;
  }
  document.getElementById("total-harga").textContent =
    "Rp " + total.toLocaleString();
}

function resetOrder() {
  const counts = document.querySelectorAll(".count");
  counts.forEach((count) => {
    count.textContent = "0";
  });
  document.getElementById("total-harga").textContent = "Rp 0";
  document.getElementById("catatanPembeli").value = "";
  document.getElementById("output").innerText = "";
}

function submitOrder() {
  let orderDetails = "";
  let total = 0;

  for (let item in prices) {
    const quantity =
      parseInt(document.getElementById(item + "_count").textContent, 10) || 0;
    if (quantity > 0) {
      orderDetails += `${
        item.charAt(0).toUpperCase() + item.slice(1)
      }: ${quantity} x Rp ${prices[item].toLocaleString()}<br>`;
      total += prices[item] * quantity;
    }
  }

  const namaPembeli = document.getElementById("inputText")?.value.trim();
  const catatan =
    document.getElementById("catatanPembeli")?.value.trim() ||
    "Tidak ada catatan";
  const deliveryOption =
    document.getElementById("deliveryOption")?.value || "makan_di_tempat";

  if (!namaPembeli) {
    alert("Nama pembeli tidak boleh kosong!");
    return;
  }

  alert("Pesanan berhasil dibuat! silahkan salin struk dibawah ini");

  if (orderDetails) {
    const output = document.getElementById("output");
    const strukContainer = document.createElement("div");
    const copyButton = document.createElement("button");

    const strukContent = `  
      <h3>Struk Pesanan</h3>
      ${orderDetails}
      <p><strong>Nama Pembeli:</strong> ${namaPembeli}</p>
      <strong>Catatan:</strong> ${catatan}<br>
      <strong>Pengantaran:</strong> ${
        deliveryOption === "makan_di_tempat"
          ? "Makan di Tempat"
          : "Anter ke Lobi"
      }
      <strong>Total: Rp ${total.toLocaleString()}</strong>`;

    strukContainer.innerHTML = strukContent;

    copyButton.textContent = "Salin Struk";
    copyButton.style.cssText = `
        padding: 8px 16px;
        margin: 10px 0;
        cursor: pointer;
        background-color: #d92323;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 10px; 
    `;

    copyButton.onclick = function () {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = strukContent;
      const strukText = tempDiv.innerText;

      navigator.clipboard
        .writeText(strukText)
        .then(() => {
          alert(
            "Struk berhasil tersalin! Silakan mengirimkan struk ini ke nomor +6288286291706 di bagian contact / hubungi kami"
          );
        })
        .catch((err) => {
          console.error("Gagal menyalin teks: ", err);
          alert("Gagal menyalin struk. Silakan coba lagi.");
        });
    };

    output.style.display = "block";
    output.innerHTML = "";
    output.appendChild(strukContainer);
    output.appendChild(copyButton);
  }

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".best-saller");
  const content = section.querySelector(".content");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Deteksi ketika bagian section masuk ke dalam viewport
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Cek apakah section sudah berada dalam viewport
    if (currentScroll > sectionTop - window.innerHeight / 2) {
      content.classList.add("visible");
    } else {
      content.classList.remove("visible");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});

  
}
