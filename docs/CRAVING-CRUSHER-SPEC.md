# Craving Crusher — Product Specification

**Version:** 2.0
**Status:** Production-Ready
**Ecosystem:** HealthQuest Hub
**Owner:** Equilibria Insights LLC
**Last Updated:** February 2026

---

## 1. Overview

### What is Craving Crusher?

Craving Crusher is a **gamified craving management tool** designed for children ages 6-12. It teaches kids that cravings are like waves — they build up, peak, and fade in about 90 seconds. Players "escape" a friendly Munchie Monster by completing fun activities before a timer runs out.

### Core Learning Outcome

> "Cravings are normal. They pass. I have tools to help them pass faster."

### Ecosystem Placement

Craving Crusher is one game within the **HealthQuest Hub** — a suite of health education games by Equilibria Insights. It should:

- Use HealthQuest branding guidelines
- Share the HealthQuest color palette and voice
- Link back to HealthQuest Hub when appropriate
- Support future cross-game features (shared XP, achievements)

---

## 2. Target Audience

| Attribute | Value |
|-----------|-------|
| Age Range | 6-12 years old |
| Reading Level | 2nd grade (7-8 year old) |
| Primary Use | During craving moments or as prevention practice |
| Device | Mobile-first (iOS/Android PWA), tablet, desktop |
| Context | Home, school wellness programs, clinical settings |

---

## 3. Game Mechanics

### 3.1 Core Loop

```
1. Player feels a craving (or practices proactively)
2. Opens Craving Crusher
3. Chooses difficulty (time commitment)
4. Chooses category (activity type) or spins "Surprise Me" wheel
5. Munchie Monster appears with countdown
6. Player completes activity before timer expires
7. Success = Monster defeated, XP earned, bingo stamped
8. Time runs out = Monster escapes (NO punishment, encouraging message)
9. Return to hub or play again
```

### 3.2 Difficulty Levels

| Level | Label | Duration | XP Reward | Coin Reward | Unlock Requirement |
|-------|-------|----------|-----------|-------------|-------------------|
| Quick | Quick Escape | 30 seconds | 10 XP | 5 coins | None |
| Standard | Standard Room | 90 seconds | 25 XP | 15 coins | None |
| Boss | Boss Room | 180 seconds | 50 XP | 30 coins | Complete 3 challenges |

### 3.3 Activity Categories

| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| Move Your Body | 🏃 | Teal (#2eae8f) | Physical movement activities |
| Use Your Brain | 🧠 | Orange (#fa8a10) | Mental puzzles and challenges |
| Chill Out | 🧘 | Light Teal (#7bcec6) | Calming and mindfulness activities |

### 3.4 Surprise Me Wheel

A 24-segment spinner wheel that randomly selects an activity across all categories. Features:
- Animated spin with easing (3 seconds)
- Click-tick sound during spin
- Center hub displays mascot (👾)
- Post-spin: "Let's Go!" or "Spin Again" options

### 3.5 Munchie Monster

The **Munchie Monster** is a friendly purple alien (👾) that represents the craving. It is NOT scary or threatening — it's cute and silly.

**Behavior:**
- Bounces in from bottom of screen when challenge starts
- Size scales with difficulty (small → medium → large)
- On defeat: shrinks, spins, disappears with particle effect
- On escape (timer expires): grows slightly, shakes, fades out

**Emotional Design:**
- The monster is not "bad" — it's just visiting
- Defeating it means "the craving passed," not "I won against food"
- No shame if it escapes — "Your brain got stronger just by trying!"

---

## 4. Reward Systems

### 4.1 XP (Experience Points)

- Earned on EVERY challenge completion (win or not)
- Win: Full XP for difficulty level
- Time expires: 25% of difficulty XP (encouragement)
- Displayed in top bar with ⭐ icon
- Persists across sessions

### 4.2 Coins

- Earned only on successful completion
- Future use: cosmetic unlocks, avatar items
- Displayed in top bar with 🪙 icon

### 4.3 Bingo Board (Boost Builder Bingo)

A **4×4 grid** (16 squares) of activities. Each activity maps to a bingo square.

**Mechanics:**
- Completing an activity stamps its corresponding square
- Squares are color-coded by category
- Line completions (row/column/diagonal) earn bonus XP
- Blackout (all 16) earns major reward
- **Weekly reset**: Every Monday at midnight local time
- Week streak tracking for consistent players

**Bingo Square Distribution:**
- 6 Move Your Body activities
- 5 Use Your Brain activities
- 5 Chill Out activities

### 4.4 Badges

12 unlockable badges based on progress milestones:

| Badge | Emoji | Requirement |
|-------|-------|-------------|
| First Crush | 🌟 | Complete 1 challenge |
| Getting Started | 🚀 | Complete 5 challenges |
| Craving Crusher | 💪 | Complete 25 challenges |
| Super Crusher | 🦸 | Complete 50 challenges |
| Move Master | 🏃 | Complete 10 Move activities |
| Brain Master | 🧠 | Complete 10 Brain activities |
| Chill Master | 🧘 | Complete 10 Chill activities |
| Bingo Champ | 📊 | Complete 3 bingo lines |
| Blackout Star | ⭐ | Complete 1 bingo blackout |
| Boss Beater | 👑 | Complete 5 Boss Room challenges |
| Week Warrior | 🔥 | Play 7 days in a row |
| Munchie Master | 👾 | Unlock all other badges |

---

## 5. Activities Database

### 5.1 Structure

Each activity has:
```typescript
{
  id: string;           // Unique identifier (e.g., "move-jumping-jacks")
  name: string;         // Display name (e.g., "Jumping Jacks")
  instructions: string; // 2nd grade reading level instructions
  category: "move" | "brain" | "chill";
  icon: string;         // Emoji for display
  bingoSquareId: number; // Maps to bingo grid (1-16)
}
```

### 5.2 Activity Requirements

**Per Category (minimum 8 activities each):**

**Move Your Body:**
- Jumping jacks, running in place, dancing
- Stretching, yoga poses
- Balance challenges
- Animal walks (bear crawl, crab walk)

**Use Your Brain:**
- Counting backwards
- Word games (rhymes, categories)
- Memory challenges
- Puzzle descriptions
- Story starters

**Chill Out:**
- Deep breathing exercises
- Body scan relaxation
- Visualization (calm place)
- Gentle stretching
- Mindful observation

### 5.3 Writing Guidelines for Activities

- **Reading level:** 2nd grade (age 7-8)
- **Sentence length:** Max 10 words per sentence
- **Instructions:** 2-3 short sentences max
- **Tone:** Encouraging, playful
- **No food references** in activity content
- **Action-oriented:** Start with verbs

**Good example:**
> "Stand up tall! Jump up and down 20 times. Count out loud as you go!"

**Bad example:**
> "Perform twenty repetitions of vertical jumps while maintaining proper form and counting each repetition aloud."

---

## 6. Educational Content

### 6.1 Science Facts

Pop-up facts appear at 50% timer completion during challenges. They teach the science behind craving management in kid-friendly language.

**Topics:**
- How the brain works
- Why cravings happen
- The craving wave concept
- Blood sugar basics
- Emotion-hunger connection
- Neuroplasticity ("Your brain is like a muscle!")

**Format:**
```typescript
{
  id: string;
  title: string;     // Short catchy title
  text: string;      // 2-3 simple sentences
  category: string;  // Topic area
}
```

### 6.2 Encouragement Messages

Rotating messages during active challenge:
- "You're doing amazing!"
- "Your brain is getting stronger!"
- "The craving wave is passing!"
- "Almost there, keep going!"
- "You've got this!"

---

## 7. User Interface

### 7.1 Screen Flow

```
┌─────────────┐
│   Welcome   │ ← Entry point
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Difficulty │ ← Quick / Standard / Boss
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  Category   │────▶│ Surprise Me │ (optional wheel)
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 ▼
       ┌─────────────┐
       │Monster Intro│ ← 👾 bounces in
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  Countdown  │ ← 3... 2... 1...
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  Challenge  │ ← Timer + Activity + "I Did It!" button
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │   Result    │ ← Win/Encourage message
       └──────┬──────┘
              │
              ▼ (if won)
       ┌─────────────┐
       │Bingo Update │ ← Stamp animation
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │ XP Summary  │ ← Rewards tally + new badges
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │   Welcome   │ ← Loop back
       └─────────────┘

Side Routes (nav accessible):
├── Bingo Board (full grid view)
├── Badge Case (collection)
└── Settings (sound, reset, sign out)
```

### 7.2 Top Bar

Fixed top bar with:
- XP pill (⭐ + count)
- Coins pill (🪙 + count)
- Nav buttons: 📊 (Bingo) | 🏆 (Badges) | ⚙️ (Settings)
- Nav hidden during active challenge

### 7.3 Key UI Components

**Timer Ring:**
- Circular progress indicator
- Color transitions: Green → Yellow → Orange → Red
- Urgency pulse animation at 10 seconds remaining
- Large centered time display

**Activity Card:**
- Category-colored glow border
- Icon, name, instructions
- Card-style with glass morphism

**Buttons:**
- Minimum 44×44px touch targets
- Primary: Filled, rounded
- Ghost: Outlined
- Disabled state for locked content

---

## 8. Visual Design

### 8.1 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| CC Blue | #0970a7 | Primary brand, links |
| CC Teal | #2eae8f | Move category, success |
| CC Light Teal | #7bcec6 | Chill category |
| CC Yellow | #fdda01 | Highlights, encouragement |
| CC Orange | #fa8a10 | Brain category, warnings |
| CC Dark | #0a1628 | Background |
| CC Dark Mid | #0d2847 | Card backgrounds |
| White | #ffffff | Text, icons |

### 8.2 Typography

| Use | Font | Weight |
|-----|------|--------|
| Headings | Fredoka | 500-700 |
| Body | Nunito | 400-800 |
| Numbers/Stats | Fredoka | 700 |

- Minimum body font size: 16px
- Headings: 24-32px
- Load fonts locally (not CDN) for offline PWA support

### 8.3 Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Screen transitions | Slide up + fade | 200ms |
| Monster entrance | Bounce in from bottom | 500ms |
| Monster defeat | Shrink + spin + fade | 800ms |
| Bingo stamp | Scale pop + color fill | 300ms |
| Timer urgency | Pulse scale | 500ms loop |
| Star field | Twinkle opacity | 2-3s alternate |
| Buttons | Hover scale | 100ms |

**Reduced Motion:**
- Respect `prefers-reduced-motion`
- Disable all decorative animations
- Keep functional feedback (button press, etc.)

### 8.4 Mascot Usage

The mascot is the **Purple Alien** (👾 emoji or custom SVG).

| Context | Implementation |
|---------|---------------|
| Welcome screen | Large centered, floating animation |
| Spinner center | Static in wheel hub |
| Monster | Animated character |
| Encouragement | Small inline with text |
| Favicon/PWA icon | Purple alien head |
| Badge "Munchie Master" | 👾 emoji |

**CRITICAL:** No dragon (🐉) or other mascot references. The alien IS the Munchie Monster.

---

## 9. Technical Requirements

### 9.1 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18+ |
| Build Tool | Vite 5+ |
| Language | TypeScript 5+ |
| Styling | Tailwind CSS 4+ |
| Animations | Framer Motion 11+ |
| Sound | Howler.js 2.2+ |
| PWA | vite-plugin-pwa (Workbox) |
| Auth | Firebase Auth (Google Sign-In) |
| Storage (client) | localStorage |
| Storage (server) | Netlify Blobs |
| Hosting | Netlify or GitHub Pages |

### 9.2 Project Structure

```
project-root/
├── public/
│   ├── manifest.json
│   ├── favicon.svg
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── maskable-512.png
│   └── sounds/
│       └── *.mp3
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── StarField.tsx
│   │   ├── screens/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── DifficultySelect.tsx
│   │   │   ├── CategorySelect.tsx
│   │   │   ├── MonsterIntro.tsx
│   │   │   ├── CountdownScreen.tsx
│   │   │   ├── ActiveChallenge.tsx
│   │   │   ├── ResultScreen.tsx
│   │   │   ├── BingoUpdate.tsx
│   │   │   ├── XPSummary.tsx
│   │   │   ├── BingoBoard.tsx
│   │   │   ├── BadgeCase.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── game/
│   │   │   ├── Timer.tsx
│   │   │   ├── SurpriseWheel.tsx
│   │   │   ├── MunchieMonster.tsx
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── SciencePop.tsx
│   │   │   └── EncouragementToast.tsx
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx
│   │   │   └── GoogleSignIn.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── ProgressRing.tsx
│   │       └── Modal.tsx
│   ├── hooks/
│   │   ├── useGameState.ts
│   │   ├── useProgress.ts
│   │   ├── useBingo.ts
│   │   ├── useTimer.ts
│   │   ├── useSound.ts
│   │   ├── useAuth.ts
│   │   └── useSync.ts
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── storage.ts
│   │   └── analytics.ts
│   ├── data/
│   │   ├── activities/
│   │   │   ├── move-your-body.json
│   │   │   ├── use-your-brain.json
│   │   │   └── chill-out.json
│   │   ├── bingo/
│   │   │   └── bingo-card-config.json
│   │   ├── spinner/
│   │   │   └── surprise-me-wheel.json
│   │   ├── dialogue/
│   │   │   └── alien-dialogue.json
│   │   ├── rewards/
│   │   │   └── xp-badges.json
│   │   ├── science/
│   │   │   └── evidence-based-education.json
│   │   └── config/
│   │       └── game-config.json
│   └── types/
│       ├── game.ts
│       ├── progress.ts
│       └── auth.ts
├── netlify/
│   └── functions/
│       ├── save-progress.ts
│       ├── load-progress.ts
│       └── sync-progress.ts
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── netlify.toml
└── package.json
```

### 9.3 Data Persistence

**Layer 1: localStorage (always active)**
```
Keys (all prefixed with cc_):
- cc_total_xp
- cc_total_coins
- cc_challenges_completed
- cc_bingo_card
- cc_bingo_week_start
- cc_badges
- cc_category_history
- cc_last_play_date
- cc_week_streak
- cc_sound_enabled
```

**Layer 2: Server sync (signed-in users)**
- Netlify Blobs store keyed by Firebase UID
- Sync on app load, merge conflicts by taking higher values
- Queue syncs during offline, retry on reconnect

### 9.4 PWA Requirements

- **Offline-first:** Full gameplay without network
- **Installable:** Valid manifest with icons
- **Service Worker:** Precache all assets
- **App-like:** Standalone display, no browser chrome
- **Fast:** LCP < 2.5s, TTI < 3s

### 9.5 Authentication

- **Google Sign-In** via Firebase Auth
- **Guest mode** must work without any Firebase config
- Signed-in users get cloud sync
- Guest users get localStorage only
- No account required to play

---

## 10. Accessibility

### 10.1 Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All interactive elements focusable |
| Screen reader | ARIA labels on buttons, live regions for timer |
| Touch targets | Minimum 44×44px |
| Color contrast | WCAG AA on dark background |
| Motion sensitivity | Respect prefers-reduced-motion |
| Text sizing | Minimum 16px body, scalable |

### 10.2 Timer Accessibility

- Visual ring indicator
- Numeric countdown display
- Optional haptic feedback (mobile)
- Screen reader announcements at 30s, 10s, 5s

---

## 11. HealthQuest Voice Guidelines

### 11.1 Tone

- **Warm and encouraging** — like a supportive coach
- **Playful but not silly** — fun without being condescending
- **Curious and growth-focused** — celebrate learning
- **Body-positive** — no shame, guilt, or judgment

### 11.2 Language Rules

**DO:**
- "You crushed it!"
- "Your brain got stronger just by trying!"
- "Cravings are normal — everyone has them!"
- "Nice work practicing!"
- "The craving wave is passing!"

**DON'T:**
- "You failed" / "You lost"
- "Bad food" / "Good food"
- "You need to try harder"
- "Don't eat that"
- Any weight or body size references
- Comparison to others

### 11.3 Result Screen Messages

**On success:**
- "You crushed it!"
- "Amazing job!"
- "The Munchie Monster didn't stand a chance!"
- "Your brain is so strong!"

**On time expiring:**
- "Nice try! The Munchie Monster got away this time."
- "Your brain got stronger just by playing!"
- "Every practice makes you better!"
- "You'll get it next time!"

---

## 12. Analytics Events

Track these events for product improvement:

```typescript
type AnalyticsEvent =
  | { event: 'game_start'; difficulty: string; category: string; surpriseMe: boolean }
  | { event: 'game_complete'; duration: number; completed: boolean; xp: number; coins: number }
  | { event: 'game_abandon'; duration: number; screen: string }
  | { event: 'bingo_stamp'; squareId: number; activityId: string }
  | { event: 'bingo_line'; lineType: 'row' | 'column' | 'diagonal' }
  | { event: 'bingo_blackout'; weekNumber: number }
  | { event: 'badge_unlock'; badgeId: string }
  | { event: 'surprise_spin'; activityId: string }
  | { event: 'science_fact_shown'; factId: string }
  | { event: 'auth_sign_in'; method: 'google' }
  | { event: 'auth_guest_play' }
  | { event: 'pwa_install' };
```

---

## 13. Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| Total bundle (gzip) | < 200KB (excl. sounds/fonts) |
| Lighthouse Performance | > 90 |
| Lighthouse PWA | 100 |
| Lighthouse Accessibility | > 90 |

---

## 14. Future Considerations

### 14.1 Planned Features
- Avatar customization with coins
- Daily challenges / streaks
- Parent dashboard
- School/class leaderboards
- More activity categories
- Seasonal themes

### 14.2 HealthQuest Integration
- Shared user accounts across games
- Cross-game achievements
- Hub navigation
- Unified reward currency
- Progress portfolio for parents/teachers

---

## 15. Reference Implementation

A complete reference implementation is available at:

**Repository:** `github.com/HealthQuestCEO/CravingsCrusher`
**Branch:** `claude/craving-crusher-react-pwa-uJ9K4`
**Live Preview:** `healthquestceo.github.io/CravingsCrusher/`

---

*Craving Crusher — Part of the HealthQuest ecosystem*
*© 2026 Equilibria Insights LLC. All rights reserved.*
