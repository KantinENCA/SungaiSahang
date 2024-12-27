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
  let isOrderEmpty = true;

  for (let item in prices) {
    const quantity =
      parseInt(document.getElementById(item + "_count").textContent, 10) || 0;
    if (quantity > 0) {
      orderDetails += `${
        item.charAt(0).toUpperCase() + item.slice(1)
      }: ${quantity} x Rp ${prices[item].toLocaleString()}\n`;
      total += prices[item] * quantity;
      isOrderEmpty = false;
    }
  }

  const namaPembeli = document.getElementById("inputText")?.value.trim();
  const catatan =
    document.getElementById("catatanPembeli")?.value.trim() ||
    "Tidak ada catatan";
  const deliveryOption =
    document.getElementById("deliveryOption")?.value || "makan_di_tempat";

  if (!namaPembeli && isOrderEmpty) {
    alert("Nama dan pesanan belum terisi!");
    return;
  }

  if (!namaPembeli) {
    alert("Nama pembeli tidak boleh kosong!");
    return;
  }

  if (isOrderEmpty) {
    alert("Pesanan belum diisi, silakan membuat pesanan.");
    return;
  }

  alert("Pesanan berhasil dibuat! Silakan kirim struk melalui WhatsApp");

  if (orderDetails) {
    const output = document.getElementById("output");
    const strukContainer = document.createElement("div");
    const whatsappButton = document.createElement("button");

    const strukContent = `
Struk Pesanan
${orderDetails}
Nama Pembeli: ${namaPembeli}
Catatan: ${catatan}
Pengantaran: ${
      deliveryOption === "makan_di_tempat" ? "Makan di Tempat" : "Anter ke Lobi"
    }
Total: Rp ${total.toLocaleString()}`;

    // Membuat konten HTML untuk ditampilkan
    const strukHTML = `  
      <h3>Struk Pesanan</h3>
      ${orderDetails.replace(/\n/g, "<br>")}
      <p><strong>Nama Pembeli:</strong> ${namaPembeli}</p>
      <strong>Catatan:</strong> ${catatan}<br>
      <strong>Pengantaran:</strong> ${
        deliveryOption === "makan_di_tempat"
          ? "Makan di Tempat"
          : "Anter ke Lobi"
      }<br>
      <strong>Total: Rp ${total.toLocaleString()}</strong>`;

    strukContainer.innerHTML = strukHTML;

    // Membuat tombol WhatsApp
    whatsappButton.innerHTML =
      '<i class="fab fa-whatsapp"></i> Kirim via WhatsApp';
    whatsappButton.style.cssText = `
        padding: 8px 16px;
        margin: 10px 0;
        cursor: pointer;
        background-color: #25D366;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
    `;

    whatsappButton.onclick = function () {
      // Nomor WhatsApp tujuan
      const phoneNumber = "6288286291706";

      // Encode pesan untuk URL
      const encodedText = encodeURIComponent(strukContent);

      // Buat URL WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      // Buka WhatsApp di tab baru
      window.open(whatsappUrl, "_blank");
    };

    output.style.display = "block";
    output.innerHTML = "";
    output.appendChild(strukContainer);
    output.appendChild(whatsappButton);
  }
}

document.getElementById("resetButton").addEventListener("click", function (event) {
  event.preventDefault();

  // Periksa apakah ada pesanan
  let isOrderEmpty = true;
  for (let item in prices) {
    const quantity =
      parseInt(document.getElementById(item + "_count").textContent, 10) || 0;
    if (quantity > 0) {
      isOrderEmpty = false;
      break;
    }
  }

  if (isOrderEmpty) {
    alert("Tidak dapat mereset! Pilih menu terlebih dahulu!");
    return;
  }

  // Buat elemen modal jika belum ada
  let modal = document.getElementById("confirmationModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "confirmationModal";
    modal.style.cssText = `
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        max-width: 400px;
        width: 100%; ">
        <p>Apakah Anda yakin ingin mereset pesanan?</p>
        <button id="confirmYes" style="
          background-color: #28a745;
          color: white;
          margin: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;">Ya</button>
        <button id="confirmNo" style="
          background-color: #dc3545;
          color: white;
          margin: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;">Tidak</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.style.display = "flex";

  document.getElementById("confirmYes").addEventListener("click", function () {
    resetOrder();
    modal.style.display = "none";
  });

  document.getElementById("confirmNo").addEventListener("click", function () {
    modal.style.display = "none";
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".best-saller");
  const content = section.querySelector(".content");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (currentScroll > sectionTop - window.innerHeight / 2) {
      content.classList.add("visible");
    } else {
      content.classList.remove("visible");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
