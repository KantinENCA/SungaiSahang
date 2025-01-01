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

const openMenu = document.getElementById("openMenu");
const menuModal = document.getElementById("menuModal");
const closeMenu = document.getElementById("closeMenu");

openMenu.addEventListener("click", () => {
  menuModal.style.display = "flex";
});

closeMenu.addEventListener("click", () => {
  menuModal.style.display = "none";
});

function increment(id) {
  const countElement = document.getElementById(id + "_count");
  let count = parseInt(countElement.textContent, 10);
  if (isNaN(count)) count = 0;
  count++;
  countElement.textContent = count;
  updateTotal();
}

function decrement(id) {
  const countElement = document.getElementById(id + "_count");
  let count = parseInt(countElement.textContent, 10);
  if (isNaN(count)) count = 0;
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

  const confirmationModal = document.createElement("div");
  confirmationModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  `;

  const orderString = `
    <h2 style="color: #333; margin-bottom: 20px;">Konfirmasi Pesanan</h2>
    <div style="text-align: left; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
      <h3 style="color: #2c3e50; margin-bottom: 10px;">Detail Pesanan:</h3>
      ${orderDetails.replace(/\n/g, "<br>")}
      <p style="margin-top: 10px;"><strong>Nama:</strong> ${namaPembeli}</p>
      <p><strong>Catatan:</strong> ${catatan}</p>
      <p><strong>Pengantaran:</strong> ${
        deliveryOption === "makan_di_tempat"
          ? "Makan di Tempat"
          : "Anter ke Lobi"
      }</p>
      <p style="font-size: 1.2em; color: #2c3e50; margin-top: 10px;"><strong>Total: Rp ${total.toLocaleString()}</strong></p>
    </div>
    <p style="margin: 20px 0; font-size: 1.1em; color: #444;">Apakah Anda yakin dengan pesanan ini?</p>
    <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
      <button id="confirmYes" style="
        padding: 12px 30px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1em;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(40, 167, 69, 0.2);
      ">Ya</button>
      <button id="confirmNo" style="
        padding: 12px 30px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1em;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
      ">Tidak</button>
    </div>
  `;

  modalContent.innerHTML = orderString;
  confirmationModal.appendChild(modalContent);
  document.body.appendChild(confirmationModal);

  const buttons = modalContent.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow =
        this.id === "confirmYes"
          ? "0 4px 8px rgba(40, 167, 69, 0.3)"
          : "0 4px 8px rgba(220, 53, 69, 0.3)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow =
        this.id === "confirmYes"
          ? "0 2px 4px rgba(40, 167, 69, 0.2)"
          : "0 2px 4px rgba(220, 53, 69, 0.2)";
    });
  });

  
const confirmButton = document.getElementById('confirm-order');
const loadingBar = document.getElementById('loading-bar');

confirmButton.addEventListener('click', () => {
  let width = 0;
  loadingBar.style.width = '0%';

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval); 
      alert('Pesanan Anda berhasil dikonfirmasi!');
    } else {
      width++;
      loadingBar.style.width = width + '%';
    }
  }, 50);
});

  document.getElementById("confirmYes").addEventListener("click", function () {
    modalContent.innerHTML = `
    <div class="loading-container">
      <div class="loading-bar-wrapper">
        <div class="loading-bar"></div>
      </div>
      <div class="loading-text">Pesanan Anda sedang dibuat...</div>
    </div>  
  `;

    setTimeout(() => {
      alert("Pesanan berhasil dibuat! Silakan kirim struk melalui WhatsApp");
      confirmationModal.remove();

      const strukContent = `
Struk Pesanan
${orderDetails}
Nama Pembeli: ${namaPembeli}
Catatan: ${catatan}
Pengantaran: ${
        deliveryOption === "makan_di_tempat"
          ? "Makan di Tempat"
          : "Anter ke Lobi"
      }
Total: Rp ${total.toLocaleString()}`;

      const output = document.getElementById("output");
      const strukContainer = document.createElement("div");
      const whatsappButton = document.createElement("button");

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
        const phoneNumber = "6288286291706";
        const encodedText = encodeURIComponent(strukContent);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        window.open(whatsappUrl, "_blank");
      };

      output.style.display = "block";
      output.innerHTML = "";
      output.appendChild(strukContainer);
      output.appendChild(whatsappButton);
    }, 3000);
  });

  document.getElementById("confirmNo").addEventListener("click", function () {
    confirmationModal.remove();
  });
}

document
  .getElementById("resetButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

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

    document
      .getElementById("confirmYes")
      .addEventListener("click", function () {
        resetOrder();
        modal.style.display = "none";
      });

    document.getElementById("confirmNo").addEventListener("click", function () {
      modal.style.display = "none";
    });
  });

document
  .getElementById("resetButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

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

      const handleYes = function () {
        resetOrder();
        modal.remove();
      };

      const handleNo = function () {
        modal.remove();
      };

      document
        .getElementById("confirmYes")
        .addEventListener("click", handleYes, { once: true });
      document
        .getElementById("confirmNo")
        .addEventListener("click", handleNo, { once: true });

      document.body.appendChild(modal);
    }

    modal.style.display = "flex";
  });

function cleanupConfirmationModal() {
  const existingModal = document.querySelector('.confirmation-modal');
  if (existingModal) {
    existingModal.remove();
  }
}

function submitOrder() {
  cleanupConfirmationModal();
  
  let orderDetails = "";
  let total = 0;
  let isOrderEmpty = true;

  for (let item in prices) {
    const quantity = parseInt(document.getElementById(item + "_count").textContent, 10) || 0;
    if (quantity > 0) {
      orderDetails += `${item.charAt(0).toUpperCase() + item.slice(1)}: ${quantity} x Rp ${prices[item].toLocaleString()}\n`;
      total += prices[item] * quantity;
      isOrderEmpty = false;
    }
  }

  const namaPembeli = document.getElementById("inputText")?.value.trim();
  const catatan = document.getElementById("catatanPembeli")?.value.trim() || "Tidak ada catatan";
  const deliveryOption = document.getElementById("deliveryOption")?.value || "makan_di_tempat";

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

  const confirmationModal = document.createElement("div");
  confirmationModal.className = 'confirmation-modal';
  confirmationModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContent = `
    <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
      <h2 style="color: #333; margin-bottom: 20px;">Konfirmasi Pesanan</h2>
      <div style="text-align: left; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
        <h3 style="color: #2c3e50; margin-bottom: 10px;">Detail Pesanan:</h3>
        ${orderDetails.replace(/\n/g, "<br>")}
        <p style="margin-top: 10px;"><strong>Nama:</strong> ${namaPembeli}</p>
        <p><strong>Catatan:</strong> ${catatan}</p>
        <p><strong>Pengantaran:</strong> ${deliveryOption === "makan_di_tempat" ? "Makan di Tempat" : "Anter ke Lobi"}</p>
        <p style="font-size: 1.2em; color: #2c3e50; margin-top: 10px;"><strong>Total: Rp ${total.toLocaleString()}</strong></p>
      </div>
      <p style="margin: 20px 0; font-size: 1.1em; color: #444;">Apakah Anda yakin dengan pesanan ini?</p>
      <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
        <button onclick="handleOrderConfirm(true)" style="padding: 12px 30px; background-color: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer;">Ya</button>
        <button onclick="handleOrderConfirm(false)" style="padding: 12px 30px; background-color: #dc3545; color: white; border: none; border-radius: 8px; cursor: pointer;">Tidak</button>
      </div>
    </div>
  `;


  
  confirmationModal.innerHTML = modalContent;
  document.body.appendChild(confirmationModal);

  window.handleOrderConfirm = function(isConfirmed) {
    if (isConfirmed) {
      confirmationModal.innerHTML = `
       <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
        <div class="loading-text">Pesanan Anda sedang dibuat...</div>
  <div class="loading-bar">
    <div class="progress"></div>
  </div>
</div>
      `;

      setTimeout(() => {
        alert("Pesanan berhasil dibuat! Silakan kirim struk melalui WhatsApp");
        cleanupConfirmationModal();

        const strukContent = `
Struk Pesanan
${orderDetails}
Nama Pembeli: ${namaPembeli}
Catatan: ${catatan}
Pengantaran: ${deliveryOption === "makan_di_tempat" ? "Makan di Tempat" : "Anter ke Lobi"}
Total: Rp ${total.toLocaleString()}`;

        const output = document.getElementById("output");
        output.innerHTML = `
          <div>
            <h3>Struk Pesanan</h3>
            ${orderDetails.replace(/\n/g, "<br>")}
            <p><strong>Nama Pembeli:</strong> ${namaPembeli}</p>
            <p><strong>Catatan:</strong> ${catatan}</p>
            <p><strong>Pengantaran:</strong> ${deliveryOption === "makan_di_tempat" ? "Makan di Tempat" : "Anter ke Lobi"}</p>
            <p><strong>Total: Rp ${total.toLocaleString()}</strong></p>
          </div>
          <button onclick="sendToWhatsApp('${encodeURIComponent(strukContent)}')" 
            style="padding: 8px 16px; margin: 10px 0; cursor: pointer; background-color: #25D366; color: white; border: none; border-radius: 4px; font-size: 14px;">
            <i class="fab fa-whatsapp"></i> Kirim via WhatsApp
          </button>
        `;
        output.style.display = "block";
      }, 3000);
    } else {
      cleanupConfirmationModal();
    }
  };

  window.sendToWhatsApp = function(strukContent) {
    const phoneNumber = "6288286291706";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${strukContent}`;
    window.open(whatsappUrl, "_blank");
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".best-seller");
  if (section) {
    const content = section.querySelector(".content");
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (currentScroll > sectionTop - window.innerHeight / 2) {
        content?.classList.add("visible");
      } else {
        content?.classList.remove("visible");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  }
});
