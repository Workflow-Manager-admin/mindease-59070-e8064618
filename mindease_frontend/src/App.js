import React, { useState } from 'react';
import './App.css';

// Define the color scheme via CSS variables (will override App.css if inside a style tag)
const themeStyle = {
  '--primary': '#4A90E2',
  '--secondary': '#50E3C2',
  '--accent': '#F5A623',
  '--background': '#ffffff',
  '--text-main': '#22223B',
  '--nav-bg': '#F7FAFD',
};

/**
 * PUBLIC_INTERFACE
 * MainContainer is the primary component containing navigation
 * and feature placeholders for MindEase.
 */
function MainContainer() {
  // State for navigation between features
  const [selectedFeature, setSelectedFeature] = useState('mood');

  // Feature display mapping
  const featureComponents = {
    mood: <MoodCheckInPlaceholder />,
    journal: <JournalingPlaceholder />,
    tasks: <TaskPlanningPlaceholder />,
    music: <MusicSuggestionsPlaceholder />,
  };

  return (
    <div className="main-container" style={themeStyle}>
      <nav className="navbar mindease-navbar" style={{ background: 'var(--nav-bg)', borderBottom: '1px solid var(--primary)' }}>
        <div className="container">
          <div className="logo" style={{ color: 'var(--primary)' }}>
            <span className="logo-symbol" style={{ color: 'var(--accent)', marginRight: 8 }}>☀️</span>
            MindEase
          </div>
          <FeatureNav selected={selectedFeature} setSelected={setSelectedFeature} />
        </div>
      </nav>
      <main className="mindease-main-content" style={{
        marginTop: 90,
        padding: '2rem 0',
        background: 'var(--background)',
        minHeight: 'calc(100vh - 90px)',
      }}>
        <div className="container" style={{ maxWidth: 720 }}>
          {featureComponents[selectedFeature]}
        </div>
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Renders navigation between the app's four main features.
 */
function FeatureNav({ selected, setSelected }) {
  const navItems = [
    { key: 'mood', label: 'Mood Check-in', icon: '😊' },
    { key: 'journal', label: 'Journaling', icon: '📝' },
    { key: 'tasks', label: 'Task Planning', icon: '📋' },
    { key: 'music', label: 'Music', icon: '🎵' },
  ];
  return (
    <div className="feature-nav" style={{ display: 'flex', gap: 20 }}>
      {navItems.map(item => (
        <button
          key={item.key}
          className="mindease-nav-btn"
          style={{
            background: selected === item.key ? 'var(--primary)' : 'transparent',
            color: selected === item.key ? '#fff' : 'var(--primary)',
            border: 'none',
            borderRadius: 6,
            padding: '10px 16px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background .16s',
          }}
          aria-current={selected === item.key}
          onClick={() => setSelected(item.key)}
        >
          <span style={{ marginRight: 7 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

// Placeholders for core features

/**
 * PUBLIC_INTERFACE
 * Placeholder for Mood Check-in feature.
 */
function MoodCheckInPlaceholder() {
  return (
    <section style={{ textAlign: 'center', padding: '2rem 0' }}>
      <h2 style={{ color: 'var(--primary)' }}>Mood Check-in</h2>
      <p style={{ color: 'var(--text-main)', maxWidth: 420, margin: '0 auto' }}>
        Track your mood daily and gain insights into your emotional wellbeing.
      </p>
      <div style={{
        margin: '1.5rem auto',
        padding: '1.5rem',
        borderRadius: 12,
        background: 'var(--nav-bg)',
        boxShadow: '0 1px 6px rgba(60,110,190,0.04)'}}>
        <span role="img" aria-label="mood" style={{ fontSize: '2.3rem', marginBottom: 12 }}>😊</span>
        <p style={{ color: 'var(--accent)' }}>
          Mood Check-in form coming soon!
        </p>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Placeholder for Journaling feature.
 */
function JournalingPlaceholder() {
  return (
    <section style={{ textAlign: 'center', padding: '2rem 0' }}>
      <h2 style={{ color: 'var(--secondary)' }}>Journaling</h2>
      <p style={{ color: 'var(--text-main)', maxWidth: 420, margin: '0 auto' }}>
        Write your thoughts and feelings for self-reflection and personal growth.
      </p>
      <div style={{
        margin: '1.5rem auto',
        padding: '1.5rem',
        borderRadius: 12,
        background: 'var(--nav-bg)',
        boxShadow: '0 1px 6px rgba(60,110,190,0.04)' }}>
        <span role="img" aria-label="journal" style={{ fontSize: '2.3rem', marginBottom: 12 }}>📝</span>
        <p style={{ color: 'var(--accent)' }}>
          Journaling feature coming soon!
        </p>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Placeholder for Smart Task Planning feature.
 */
function TaskPlanningPlaceholder() {
  return (
    <section style={{ textAlign: 'center', padding: '2rem 0' }}>
      <h2 style={{ color: 'var(--primary)' }}>Smart Task Planning</h2>
      <p style={{ color: 'var(--text-main)', maxWidth: 420, margin: '0 auto' }}>
        Organize your tasks and plan your day for a balanced lifestyle.
      </p>
      <div style={{
        margin: '1.5rem auto',
        padding: '1.5rem',
        borderRadius: 12,
        background: 'var(--nav-bg)',
        boxShadow: '0 1px 6px rgba(60,110,190,0.04)' }}>
        <span role="img" aria-label="tasks" style={{ fontSize: '2.3rem', marginBottom: 12 }}>📋</span>
        <p style={{ color: 'var(--accent)' }}>
          Task Planner coming soon!
        </p>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Placeholder for Calming Music Suggestions feature.
 */
function MusicSuggestionsPlaceholder() {
  return (
    <section style={{ textAlign: 'center', padding: '2rem 0' }}>
      <h2 style={{ color: 'var(--secondary)' }}>Calming Music Suggestions</h2>
      <p style={{ color: 'var(--text-main)', maxWidth: 420, margin: '0 auto' }}>
        Listen to calming tracks, curated for your mental wellness journey.
      </p>
      <div style={{
        margin: '1.5rem auto',
        padding: '1.5rem',
        borderRadius: 12,
        background: 'var(--nav-bg)',
        boxShadow: '0 1px 6px rgba(60,110,190,0.04)' }}>
        <span role="img" aria-label="music" style={{ fontSize: '2.3rem', marginBottom: 12 }}>🎵</span>
        <p style={{ color: 'var(--accent)' }}>
          Music suggestions coming soon!
        </p>
      </div>
    </section>
  );
}

// Export as the App root
export default MainContainer;
