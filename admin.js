function checkPassword() {
  const input = document.getElementById("adminPassword").value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById("adminSection").style.display = "block";
  } else {
    alert("পাসওয়ার্ড ভুল!");
  }
}

async function loadEntries() {
  try {
    const response = await fetch(`${BIN_URL}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });
    const data = await response.json();
    const entries = data.record.entries || [];
    const list = document.getElementById("entriesList");
    list.innerHTML = "";

    if (entries.length === 0) {
      list.innerHTML = "<li>কোন এন্ট্রি পাওয়া যায়নি।</li>";
      return;
    }

    entries.forEach((entry, idx) => {
      const li = document.createElement("li");
      li.textContent = `${idx + 1}. ফোন: ${entry.phone}, Telegram: ${entry.telegram}, প্ল্যাটফর্ম: ${entry.platform}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert("ডেটা লোড করতে সমস্যা হয়েছে!");
  }
}

async function selectWinner() {
  try {
    const response = await fetch(`${BIN_URL}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });
    const data = await response.json();
    const entries = data.record.entries || [];

    if (entries.length === 0) {
      alert("কোনো এন্ট্রি নেই।");
      return;
    }

    const winner = entries[Math.floor(Math.random() * entries.length)];

    document.getElementById("winnerDisplay").innerText =
      `🏆 বিজয়ী: ফোন: ${winner.phone}, Telegram: ${winner.telegram}, প্ল্যাটফর্ম: ${winner.platform}`;
  } catch (error) {
    console.error(error);
    alert("বিজয়ী নির্বাচন করতে সমস্যা হয়েছে!");
  }
}
