import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * MoodTracker implements mood selection (emoji scale), journal form,
 * and displays GPT-generated feedback (mocked) below input.
 */
const moodList = [
  { value: 5, emoji: "😁", color: "#6DC36D", label: "Very Happy" },
  { value: 4, emoji: "😊", color: "#A3D877", label: "Happy" },
  { value: 3, emoji: "😐", color: "#EFC375", label: "Neutral" },
  { value: 2, emoji: "🙁", color: "#FDAE6C", label: "Sad" },
  { value: 1, emoji: "😭", color: "#F47272", label: "Very Sad" },
];

/**
 * PUBLIC_INTERFACE
 * MoodTracker implements mood selection (emoji scale), journal form,
 * and displays GPT-generated feedback (from real API) below input.
 */
const GPT_API_URL = "/api/gpt-analyze"; // Placeholder: update to your backend endpoint.

function MoodTracker() {
  const [mood, setMood] = useState(null); // value: 1...5
  const [journal, setJournal] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null); // { summary, tip }
  const [error, setError] = useState(null);

  // Save mood data locally (simulate persistence for a day)
  const saveMood = (selectedMood, journalText) => {
    const todayKey = "mindease-mood-" + new Date().toISOString().slice(0, 10);
    localStorage.setItem(
      todayKey,
      JSON.stringify({ selectedMood, journal: journalText || "" })
    );
  };

  // PUBLIC_INTERFACE
  // On form submit, save mood and call GPT API for insights/tip.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);

    if (!mood) {
      setError("Please select your mood for today.");
      return;
    }

    setSaving(true);
    saveMood(mood, journal);

    try {
      // NETWORK INTEGRATION: Call real GPT feedback API.
      // Replace GPT_API_URL with actual endpoint in production.
      const response = await fetch(GPT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mood,
          journal
        }),
      });

      if (!response.ok) {
        throw new Error("There was a problem processing your entry. Please try again.");
      }
      const data = await response.json();

      // Expected response shape: { summary: string, tip: string }
      if (!data.summary || !data.tip) {
        throw new Error("API response incomplete. Please try again later.");
      }
      setFeedback({
        summary: data.summary,
        tip: data.tip
      });
    } catch (err) {
      // Show API/execution error in themed style
      setError(
        typeof err === "string"
          ? err
          : (err && err.message) || "Unexpected error occurred."
      );
      setFeedback(null);
    }
    setSaving(false);
  };

  return (
    <section className="mood-tracker-section" style={{ textAlign: "center", padding: "2rem 0" }}>
      <h2 style={{ color: "var(--primary)" }}>Mood Check-in</h2>
      <p style={{ color: "var(--text-main)", maxWidth: 420, margin: "0 auto" }}>
        How are you feeling today? Choose an emoji and write a little if you wish.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "1.5rem auto 0",
          padding: "2rem 1.2rem",
          borderRadius: 14,
          background: "var(--nav-bg)",
          boxShadow: "0 2px 12px rgba(60,110,190,0.06)",
          maxWidth: 430,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <MoodEmojiScale mood={mood} setMood={setMood} />
        </div>
        <textarea
          className="mood-journal-ta"
          rows={4}
          placeholder="Write a short journal about your day (optional)..."
          style={{
            width: "100%",
            minWidth: 260,
            maxWidth: 370,
            fontSize: "1rem",
            border: "1px solid var(--border-color)",
            borderRadius: 6,
            padding: "12px 10px",
            marginBottom: 16,
            background: "#fff",
            color: "var(--text-main)",
            resize: "vertical",
          }}
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          disabled={saving}
        />
        {error && (
          <div
            style={{
              color: "#e43f29",
              marginBottom: 10,
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-large"
          style={{
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 32px",
            fontWeight: 500,
            fontSize: "1.08rem",
            marginTop: 4,
            boxShadow: "0 1px 3px rgba(60,110,190,0.12)",
            cursor: saving ? "progress" : "pointer",
            opacity: saving ? 0.82 : 1,
            transition: "all .16s",
          }}
          disabled={saving}
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </form>
      {feedback && (
        <div
          className="gpt-feedback-card"
          style={{
            margin: "2rem auto 0",
            background: "#fbfaf9",
            border: "1px solid var(--border-color)",
            borderRadius: 10,
            padding: "1.5rem 1.2rem",
            boxShadow: "0 4px 28px 0px rgba(35,68,120,0.07)",
            maxWidth: 430,
            color: "var(--text-main)",
            textAlign: "left",
          }}
        >
          <h4 style={{ marginTop: 0, color: "var(--primary)" }}>Today's Insights</h4>
          <div style={{ margin: "8px 0", fontSize: "1.06rem" }}>
            <b>Summary: </b>{feedback.summary}
          </div>
          <div style={{
            marginTop: 12,
            fontSize: "1.06rem",
            color: "var(--secondary)",
            fontWeight: 500,
          }}>
            <span role="img" aria-label="tip" style={{ marginRight: 4 }}>💡</span>
            <b>Self-care tip:</b> {feedback.tip}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * MoodEmojiScale renders a row of selectable emoji (Very Happy ... Very Sad).
 */
function MoodEmojiScale({ mood, setMood }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 22 }}>
      {moodList.map((m) => (
        <button
          key={m.value}
          type="button"
          aria-label={m.label}
          onClick={() => setMood(m.value)}
          style={{
            fontSize: "2.38rem",
            background: "none",
            border: mood === m.value ? "2.5px solid " + m.color : "2px solid transparent",
            borderRadius: "50%",
            outline: "none",
            cursor: "pointer",
            transition: "border .14s",
            boxShadow: mood === m.value ? "0 0 0 3px #e1eefa" : undefined,
            filter: mood === m.value ? "drop-shadow(0 1px 4px rgba(76,140,230,.08))": "none",
            padding: 3,
          }}
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
}

export default MoodTracker;
