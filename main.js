document.getElementById("lotteryForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const telegram = document.getElementById("telegram").value;
  const platform = document.getElementById("platform").value;

  const newEntry = { phone, telegram, platform, timestamp: new Date().toISOString() };

  try {
    const response = await fetch(`${BIN_URL}/latest`, {
      method: "GET",
      headers: {
        "X-Master-Key": API_KEY
      }
    });

    const data = await response.json();
    const currentEntries = data.record.entries || [];

    currentEntries.push(newEntry);

    await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
        "X-Bin-Versioning": false
      },
      body: JSON.stringify({ entries: currentEntries })
    });

    alert("✅ আপনার তথ্য সাবমিট হয়েছে!");
    document.getElementById("lotteryForm").reset();
  } catch (err) {
    alert("❌ সাবমিট করতে সমস্যা হচ্ছে!");
    console.error(err);
  }
});
