document.getElementById("lotteryForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const telegram = document.getElementById("telegram").value.trim();
  const platform = document.getElementById("platform").value;

  if (!phone || !telegram || !platform) {
    alert("সকল তথ্য পূরণ করুন");
    return;
  }

  try {
    // পুরোনো এন্ট্রি নিয়ে আসা
    const response = await fetch(`${BIN_URL}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });
    const data = await response.json();

    const entries = data.record.entries || [];
    entries.push({ phone, telegram, platform, timestamp: new Date().toISOString() });

    // নতুন এন্ট্রি আপলোড করা
    await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
        "X-Bin-Versioning": "false",
      },
      body: JSON.stringify({ entries }),
    });

    document.getElementById("status").innerText = "✅ আপনার তথ্য সফলভাবে জমা হয়েছে!";
    this.reset();
  } catch (error) {
    console.error(error);
    alert("❌ কিছু ভুল হয়েছে, আবার চেষ্টা করুন!");
  }
});
