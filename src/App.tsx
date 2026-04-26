import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import memoryOne from './assets/ChatGPT Image Apr 27, 2026, 12_15_56 AM.png'
import memoryTwo from './assets/ChatGPT Image Apr 27, 2026, 12_19_04 AM.png'
import memoryThree from './assets/ChatGPT Image Apr 27, 2026, 12_26_44 AM.png'
import memoryFour from './assets/ChatGPT Image Apr 27, 2026, 12_28_32 AM.png'
import memoryFive from './assets/ChatGPT Image Apr 27, 2026, 12_30_36 AM.png'
import welcomeBackground from './assets/create_couples_goal_202604270041.jpeg'
import './App.css'

const CONFIG = {
  herName: import.meta.env.VITE_HER_NAME || 'birthday girl',
  yourName: import.meta.env.VITE_YOUR_NAME || 'THUSHANTH',
  secretWord: (import.meta.env.VITE_SECRET_WORD || 'moonlight').trim(),
  birthdayDate: import.meta.env.VITE_BIRTHDAY_DATE || '2026-04-27',
  unlockAtIso: import.meta.env.VITE_UNLOCK_AT_ISO || '',
  previewUnlock: import.meta.env.VITE_PREVIEW_UNLOCK === 'true',
  videoUrl: import.meta.env.VITE_FINAL_VIDEO_URL || '',
  playlistUrl: import.meta.env.VITE_PLAYLIST_URL || '',
  giftUrl: import.meta.env.VITE_GIFT_URL || '',
}

type Reason = {
  title: string
  note: string
  detail: string
  proof: string
  color: 'rose' | 'sun' | 'sage' | 'sky' | 'lavender' | 'peach'
}

type Letter = {
  id: string
  title: string
  mood: string
  preview: string
  body: string[]
  signature: string
}

type DateOption = {
  id: string
  title: string
  icon: string
  tone: 'cinema' | 'dinner' | 'music' | 'game' | 'moon' | 'surprise'
  note: string
  promise: string
  location: string
}

type Gift = {
  id: string
  title: string
  label: string
  href?: string
  fallback: string
}

const reasons: Reason[] = [
  {
    title: 'You make people feel safe',
    note: 'Your kindness is not loud or showy. It is in the way you listen, remember, and make someone feel like their feelings matter.',
    detail:
      'That is one of the first things I adored about you: you have a soft heart, but it is also thoughtful and steady.',
    proof: 'Kindness that feels like home',
    color: 'rose',
  },
  {
    title: 'Your smile changes my day',
    note: 'Your smile feels real. It is not just pretty to look at, it has a warmth that makes even a normal conversation feel special.',
    detail:
      'When I imagine your face while we talk, the distance feels less sharp for a moment.',
    proof: 'The quickest way my day becomes lighter',
    color: 'sun',
  },
  {
    title: 'Your voice calms me',
    note: 'There is something about hearing you speak that makes the day slow down. Calls with you do not feel ordinary to me.',
    detail:
      'Even a small conversation with you can make me feel close, understood, and quietly happy.',
    proof: 'My favorite sound after a long day',
    color: 'sky',
  },
  {
    title: 'You are stronger than you think',
    note: 'I admire the way you keep going, even when things are not easy. You do it with more grace than you probably realize.',
    detail:
      'I do not adore you only when you are happy. I adore the brave, tired, trying parts of you too.',
    proof: 'Strength with a gentle heart',
    color: 'sage',
  },
  {
    title: 'You care in small details',
    note: 'You notice little things. You remember. You make love feel present in small, believable ways.',
    detail:
      'Those details matter to me because they show the kind of person you are when nobody is asking you to be anything.',
    proof: 'Small things that become everything',
    color: 'peach',
  },
  {
    title: 'You make distance feel bearable',
    note: 'Being far from you is hard, but somehow you still make me feel connected. You turn messages and calls into something I can hold onto.',
    detail:
      'That is rare. Even across countries, you still feel close to the most honest part of my heart.',
    proof: 'Same sky, smaller distance',
    color: 'lavender',
  },
]

const memories = [
  {
    title: 'The first thing I loved about you',
    caption: 'How soft your heart felt, even through a screen.',
    image: memoryOne,
    alt: 'A dreamy birthday memory illustration',
  },
  {
    title: 'A moment I always replay',
    caption: 'That little pause before you laugh, like the whole world gets sweeter.',
    image: memoryTwo,
    alt: 'A soft romantic memory illustration',
  },
  {
    title: 'The time I missed you the most',
    caption: 'Every quiet night when I wished the distance could fold in half.',
    image: memoryThree,
    alt: 'A moonlit long-distance love memory illustration',
  },
  {
    title: 'My favorite little thing about you',
    caption: 'The way you make simple words feel like home.',
    image: memoryFour,
    alt: 'A sweet personal memory illustration',
  },
  {
    title: 'A memory I want to keep forever',
    caption: 'The first birthday I turned into a tiny world because I love you.',
    image: memoryFive,
    alt: 'A magical birthday world memory illustration',
  },
]

const letters: Letter[] = [
  {
    id: 'miss-me',
    title: 'Open when you miss me',
    mood: 'For the quiet ache',
    preview: 'For the moments when the distance feels too loud.',
    body: [
      'My love, if you are opening this because you miss me, I want you to pause for a second and remember that missing you is something I carry too. It means what we have is real enough to be felt even across countries.',
      'I wish I could appear beside you, hold your hand, and make the room feel less empty. Until I can, let this letter be my small way of sitting next to you. I am under the same sky, thinking of you with the same heart, choosing you again without hesitation.',
      'Distance can take away the easy things, but it cannot take away how deeply I adore you. I am still here. I am still yours. And every day between us is one day closer to being close for real.',
    ],
    signature: 'A long hug from Sri Lanka',
  },
  {
    id: 'smile',
    title: 'Open when you need a smile',
    mood: 'For your softest laugh',
    preview: 'For the days that need something sweet and silly.',
    body: [
      'Birthday girl, this letter has one very serious mission: to bring back that beautiful smile I love so much.',
      'I hope you remember how easily you make my world brighter. Even one message from you can change the whole shape of my day. Your smile is not a small thing to me. It is proof that the world still knows how to be gentle.',
      'So smile for me, even a little. Imagine me being dramatic about it, because honestly I would be. Smile loading... 100%. There it is. My favorite little miracle.',
    ],
    signature: 'Your biggest fan',
  },
  {
    id: 'lonely',
    title: 'Open when you feel lonely',
    mood: 'For when the room feels empty',
    preview: 'For the nights when you need to feel chosen.',
    body: [
      'My love, if tonight feels lonely, please let these words come close to you. You are not forgotten. You are not alone. You are loved with intention, with patience, and with a heart that keeps finding its way back to you.',
      'I know a screen is not the same as arms around you. I know words cannot replace being there. But I hope these words still reach the part of you that needs warmth. I hope they remind you that I am always making space for you in my day, my plans, and my future.',
      'You are my person across the miles. Even in silence, even between calls, even when life feels heavy, my love is still beside you.',
    ],
    signature: 'Still here, still yours',
  },
  {
    id: 'heavy-day',
    title: 'Open when your day feels heavy',
    mood: 'For tired heart days',
    preview: 'For when you have been strong for too long.',
    body: [
      'My darling, put the heavy thing down for a moment. You do not have to carry everything perfectly. You do not have to be brave every second. You are allowed to be tired and still be deeply loved.',
      'If I were there, I would make the world quieter for you. I would remind you to breathe, bring you something warm, and stay close without asking you to explain everything. Since I am far, I am sending that gentleness through this little world.',
      'Nothing about a hard day makes you less wonderful. Rest your heart. I am proud of you for getting through today, and I will love you through the soft days and the difficult ones.',
    ],
    signature: 'Rest here, my love',
  },
  {
    id: 'loved',
    title: 'Open when you want to feel loved',
    mood: 'For reassurance',
    preview: 'For when you want to hear how precious you are.',
    body: [
      'You are loved. Not casually. Not only when it is easy. You are loved in the ordinary minutes, in the sleepy messages, in the way I think about your happiness even when we are busy with different days.',
      'I love the soft parts of you, the strong parts of you, the little habits that are completely yours, and the way you make my life feel warmer just by being in it. You do not have to earn that love. You already have it.',
      'If you ever wonder whether you matter to me, come back to this letter. You matter in the way home matters. You matter in the way the moon matters to the night.',
    ],
    signature: 'With all the love I have',
  },
  {
    id: 'birthday-hug',
    title: 'Open when you want a birthday hug',
    mood: 'For birthday warmth',
    preview: 'For the hug I wish I could give you in person.',
    body: [
      'Happy birthday again, my beautiful girl. This is your official birthday hug, wrapped inside a letter because my arms are unfairly far away today.',
      'If I were beside you, I would hold you long enough for you to feel every bit of how grateful I am that you exist. I would tell you softly that you are loved, celebrated, and precious beyond what one birthday website can ever fully say.',
      'So here is the hug: warm, patient, close, and completely yours. Keep it for today. Keep it for tomorrow. Keep it for every time you need to remember that someone in Sri Lanka is loving you with his whole heart.',
    ],
    signature: 'Your birthday hug, saved forever',
  },
]

const dateOptions: DateOption[] = [
  {
    id: 'movie',
    title: 'Movie night',
    icon: '🍿',
    tone: 'cinema',
    note: 'A cozy film, synced play buttons, and your laugh as my favorite scene.',
    promise: 'I will choose something sweet, stay till the credits, and listen to every comment you make.',
    location: 'One movie, two screens, same heartbeat',
  },
  {
    id: 'dinner',
    title: 'Dinner video call',
    icon: '🍝',
    tone: 'dinner',
    note: 'We dress cute, eat together, and pretend the table is only a little wider than usual.',
    promise: 'I will bring dinner, soft questions, and all my attention to you.',
    location: 'A tiny table between Sri Lanka and the UK',
  },
  {
    id: 'music',
    title: 'Music night',
    icon: '🎧',
    tone: 'music',
    note: 'Songs for missing each other, slow smiles, and the lyrics that feel like us.',
    promise: 'I will make a little playlist and tell you which songs remind me of you.',
    location: 'Same playlist, different bedrooms',
  },
  {
    id: 'game',
    title: 'Game night',
    icon: '🎮',
    tone: 'game',
    note: 'Silly competition, dramatic victories, and me letting you win only sometimes.',
    promise: 'I will bring the game, the jokes, and a very serious celebration when you win.',
    location: 'Online lobby, full of love',
  },
  {
    id: 'sleepy',
    title: 'Sleepy late-night call',
    icon: '🌙',
    tone: 'moon',
    note: 'Quiet voices, tired smiles, and staying there until the night feels softer.',
    promise: 'I will stay gently, talk softly, and let the silence feel warm too.',
    location: 'Under the same moon',
  },
  {
    id: 'surprise',
    title: 'Surprise date chosen by me',
    icon: '🎁',
    tone: 'surprise',
    note: 'A secret little plan made only to make you feel chosen and spoiled.',
    promise: 'I will plan everything and keep the sweetest part hidden until it begins.',
    location: 'A secret place inside our little world',
  },
]

const gifts: Gift[] = [
  {
    id: 'video',
    title: 'Private video message',
    label: 'Open video',
    href: CONFIG.videoUrl,
    fallback:
      'This little screen is reserved for the private video message I made for you.',
  },
  {
    id: 'playlist',
    title: 'Birthday playlist',
    label: 'Play playlist',
    href: CONFIG.playlistUrl,
    fallback:
      'A playlist belongs here, filled with songs that sound like us and this birthday.',
  },
  {
    id: 'gift',
    title: 'Future date coupon',
    label: 'Reveal coupon',
    href: CONFIG.giftUrl,
    fallback:
      'One future date coupon, valid anytime you miss me, redeemable under the same sky.',
  },
]

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Local storage is optional. The world still works without it.
    }
  }, [key, value])

  return [value, setValue] as const
}

function getTimeZoneOffset(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })

  const parts = formatter.formatToParts(date).reduce<Record<string, string>>(
    (result, part) => {
      if (part.type !== 'literal') {
        result[part.type] = part.value
      }
      return result
    },
    {},
  )

  const wallTime = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  )

  return wallTime - date.getTime()
}

function londonMidnightToDate(dateText: string) {
  const [year, month, day] = dateText.split('-').map(Number)

  if (!year || !month || !day) {
    return new Date()
  }

  let timestamp = Date.UTC(year, month - 1, day, 0, 0, 0)
  const initialOffset = getTimeZoneOffset(
    new Date(timestamp),
    'Europe/London',
  )
  timestamp -= initialOffset

  const finalOffset = getTimeZoneOffset(new Date(timestamp), 'Europe/London')
  if (finalOffset !== initialOffset) {
    timestamp = Date.UTC(year, month - 1, day, 0, 0, 0) - finalOffset
  }

  return new Date(timestamp)
}

function getUnlockDate() {
  if (CONFIG.unlockAtIso) {
    const configured = new Date(CONFIG.unlockAtIso)
    if (!Number.isNaN(configured.getTime())) {
      return configured
    }
  }

  return londonMidnightToDate(CONFIG.birthdayDate)
}

function formatCountdown(target: Date, now: Date) {
  const totalSeconds = Math.max(
    0,
    Math.floor((target.getTime() - now.getTime()) / 1000),
  )
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    { label: 'days', value: days },
    { label: 'hours', value: hours },
    { label: 'minutes', value: minutes },
    { label: 'seconds', value: seconds },
  ]
}

function FloatingSky() {
  return (
    <div className="floating-sky" aria-hidden="true">
      <span className="cloud cloud-one" />
      <span className="cloud cloud-two" />
      <span className="cloud cloud-three" />
      <span className="star star-one">✦</span>
      <span className="star star-two">✧</span>
      <span className="star star-three">✦</span>
      <span className="tiny-heart heart-one">♥</span>
      <span className="tiny-heart heart-two">♥</span>
      <span className="tiny-heart heart-three">♥</span>
    </div>
  )
}

function CountdownScreen({
  target,
  now,
}: {
  target: Date
  now: Date
}) {
  const countdown = formatCountdown(target, now)

  return (
    <main className="lock-screen">
      <FloatingSky />
      <section className="countdown-panel" aria-labelledby="countdown-title">
        <p className="eyebrow">A Little World for You</p>
        <h1 id="countdown-title">A little surprise is waiting for you...</h1>
        <p className="lead">
          It opens at midnight, UK time.
          <br />
          Made with love from Sri Lanka.
        </p>
        <div className="countdown-grid" aria-label="Birthday countdown">
          {countdown.map((item) => (
            <div className="countdown-unit" key={item.label}>
              <strong>{String(item.value).padStart(2, '0')}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <p className="soft-note">Love delivery: scheduled.</p>
      </section>
    </main>
  )
}

function SecretGate({
  secretInput,
  secretError,
  onSecretChange,
  onSubmit,
}: {
  secretInput: string
  secretError: string
  onSecretChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <main className="gate-screen">
      <FloatingSky />
      <section className="gate-panel" aria-labelledby="gate-title">
        <div className="garden-gate" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">The secret garden gate</p>
        <h1 id="gate-title">Welcome, {CONFIG.herName} 🌸</h1>
        <p className="lead">Enter the secret word to open your little world.</p>
        <form className="secret-form" onSubmit={onSubmit}>
          <label htmlFor="secret-word">Secret word</label>
          <div className="secret-row">
            <input
              id="secret-word"
              value={secretInput}
              onChange={(event) => onSecretChange(event.target.value)}
              type="password"
              autoComplete="off"
              placeholder="the word only we know"
            />
            <button type="submit">Open</button>
          </div>
          {secretError ? <p className="form-error">{secretError}</p> : null}
        </form>
        <p className="soft-note">Distance status: almost defeated.</p>
      </section>
    </main>
  )
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}

function playMoonSong() {
  const audioWindow = window as Window &
    typeof globalThis & {
      webkitAudioContext?: typeof AudioContext
    }
  const AudioContextConstructor =
    window.AudioContext || audioWindow.webkitAudioContext

  if (!AudioContextConstructor) {
    return
  }

  const context = new AudioContextConstructor()
  const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46]
  const now = context.currentTime

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = now + index * 0.24
    const end = start + 0.42

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.08, start + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, end)

    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(start)
    oscillator.stop(end)
  })
}

function DateTicket({ date }: { date: DateOption }) {
  if (date.tone === 'cinema') {
    return (
      <div className="date-ticket date-ticket-cinema" aria-live="polite">
        <div className="ticket-stub">
          <span>Admit two</span>
          <strong>Forever Row</strong>
        </div>
        <div className="ticket-main">
          <p className="ticket-kicker">Private Moonlight Cinema</p>
          <h3>{date.icon} A Film Night With My Favorite Girl</h3>
          <p>
            For {CONFIG.herName}, with {CONFIG.yourName}. I will press play at
            the same second, stay close through every scene, and make your laugh
            the best part of the movie.
          </p>
          <div className="ticket-lines">
            <span>{date.location}</span>
            <span>{date.promise}</span>
          </div>
        </div>
      </div>
    )
  }

  if (date.tone === 'dinner') {
    return (
      <div className="date-ticket date-ticket-dinner" aria-live="polite">
        <p className="ticket-kicker">A tiny table for two</p>
        <h3>{date.icon} Dinner Invitation</h3>
        <p className="ticket-script">
          {CONFIG.herName}, you are formally invited to sit across from me on a
          video call and still somehow feel close enough to touch my heart.
        </p>
        <div className="dinner-menu">
          <span>Starter: your smile</span>
          <span>Main: stories from our day</span>
          <span>Dessert: one very long goodnight</span>
        </div>
        <strong>{date.promise}</strong>
      </div>
    )
  }

  if (date.tone === 'music') {
    return (
      <div className="date-ticket date-ticket-music" aria-live="polite">
        <div className="mixtape-top">
          <span>{date.icon}</span>
          <div>
            <p className="ticket-kicker">Love songs queued</p>
            <h3>Our Little Listening Night</h3>
          </div>
        </div>
        <ol className="track-list">
          <li>The song that sounds like missing you</li>
          <li>The song that sounds like your smile</li>
          <li>The song I want to send instead of a hug</li>
        </ol>
        <p>{date.promise}</p>
      </div>
    )
  }

  if (date.tone === 'game') {
    return (
      <div className="date-ticket date-ticket-game" aria-live="polite">
        <p className="ticket-kicker">Mission unlocked</p>
        <h3>{date.icon} Two-Player Love Quest</h3>
        <div className="quest-board">
          <span>Player one: {CONFIG.herName}</span>
          <span>Player two: {CONFIG.yourName}</span>
          <span>Reward: unlimited teasing and one victory speech</span>
        </div>
        <p>
          Your mission is to laugh with me until the distance feels silly. My
          mission is to make the whole night feel easy, cute, and completely
          ours.
        </p>
      </div>
    )
  }

  if (date.tone === 'moon') {
    return (
      <div className="date-ticket date-ticket-moon" aria-live="polite">
        <span className="ticket-moon" aria-hidden="true" />
        <p className="ticket-kicker">Reserved under the same moon</p>
        <h3>{date.icon} Sleepy Late-Night Call</h3>
        <p>
          No big plans. Just your voice, my voice, sleepy little pauses, and the
          comfort of knowing we are both still here.
        </p>
        <blockquote>
          I will stay gently. I will talk softly. I will make the silence feel
          loved too.
        </blockquote>
      </div>
    )
  }

  return (
    <div className="date-ticket date-ticket-surprise" aria-live="polite">
      <div className="surprise-ribbon">sealed by {CONFIG.yourName}</div>
      <p className="ticket-kicker">Secret date voucher</p>
      <h3>{date.icon} A Surprise Made Only For You</h3>
      <p>
        Redeem this when you want to feel chosen. I will plan the time, the
        little details, and the sweetest reveal, then meet you inside our tiny
        world like it is a real doorway.
      </p>
      <div className="surprise-pledge">
        <span>{date.location}</span>
        <strong>{date.promise}</strong>
      </div>
    </div>
  )
}

function LittleWorld() {
  const worldRef = useRef<HTMLElement | null>(null)
  const [activeScene, setActiveScene] = useState('welcome')
  const [selectedReason, setSelectedReason] = useState<Reason>(reasons[0])
  const [openedLetters, setOpenedLetters] = useStoredState<string[]>(
    'little-world-opened-letters',
    [],
  )
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null)
  const [selectedDate, setSelectedDate] = useStoredState<string>(
    'little-world-date-ticket',
    '',
  )
  const [activeGift, setActiveGift] = useState<Gift>(gifts[0])

  const chosenDate = dateOptions.find((date) => date.id === selectedDate)

  useEffect(() => {
    const world = worldRef.current

    if (!world) {
      return
    }

    const sections = Array.from(
      world.querySelectorAll<HTMLElement>('[data-scene]'),
    )

    if (sections.length === 0) {
      return
    }

    let frame = 0

    const updateActiveScene = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rootTop = world.getBoundingClientRect().top
        let closestSection = sections[0]
        let closestDistance = Math.abs(
          closestSection.getBoundingClientRect().top - rootTop,
        )

        sections.forEach((section) => {
          const distance = Math.abs(section.getBoundingClientRect().top - rootTop)

          if (distance < closestDistance) {
            closestSection = section
            closestDistance = distance
          }
        })

        const scene = closestSection.getAttribute('data-scene')

        if (scene) {
          setActiveScene(scene)
        }
      })
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(updateActiveScene, {
            root: world,
            threshold: [0, 0.3, 0.6, 1],
          })
        : null

    sections.forEach((section) => observer?.observe(section))
    world.addEventListener('scroll', updateActiveScene, { passive: true })
    window.addEventListener('resize', updateActiveScene)
    updateActiveScene()

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      world.removeEventListener('scroll', updateActiveScene)
      window.removeEventListener('resize', updateActiveScene)
    }
  }, [])

  useEffect(() => {
    if (!activeLetter) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveLetter(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeLetter])

  const openLetter = (letter: Letter) => {
    setOpenedLetters((current) =>
      current.includes(letter.id) ? current : [...current, letter.id],
    )
    setActiveLetter(letter)
  }

  const sceneClass = (scene: string, className: string) =>
    `story-section ${className} ${activeScene === scene ? 'is-visible' : ''}`

  return (
    <main className={`world scene-${activeScene}`} ref={worldRef}>
      <section
        className={sceneClass('welcome', 'welcome-section')}
        data-scene="welcome"
        aria-labelledby="welcome-title"
      >
        <img
          className="welcome-bg-photo"
          src={welcomeBackground}
          alt=""
          aria-hidden="true"
        />
        <span className="welcome-bg-veil" aria-hidden="true" />
        <FloatingSky />
        <div className="welcome-copy">
          <p className="eyebrow">A Little World for You</p>
          <h1 id="welcome-title">I built this tiny world for you.</h1>
          <p>
            I made this tiny world because I couldn't be beside you today.
            <br />
            So I sent my love through the sky instead.
          </p>
        </div>
        <div className="sky-route" aria-label={`Love travelling from ${CONFIG.yourName} to the UK`}>
          <div className="place sri-lanka">
            <span>SRILANKA</span>
            <strong>{CONFIG.yourName}</strong>
          </div>
          <div className="route-line">
            <span className="paper-plane" aria-hidden="true" />
          </div>
          <div className="place uk">
            <span>UK</span>
            <strong>{CONFIG.herName}</strong>
          </div>
        </div>
        <div className="system-strip" aria-label="Tiny love status">
          <span>Made with 100% love and a little bit of code.</span>
          <span>Love delivery: successful.</span>
          <span>Distance status: defeated.</span>
        </div>
      </section>

      <section
        className={sceneClass('garden', 'garden-section')}
        data-scene="garden"
        aria-labelledby="reasons-title"
      >
        <SectionHeading
          eyebrow="A garden of reasons"
          title="Reasons I Adore You"
        >
          These are not random compliments. They are the quiet things I notice, keep, and love about you.
        </SectionHeading>
        <div className="garden-layout">
          <div className="flower-grid">
            {reasons.map((reason, index) => (
              <button
                className={`flower-button flower-${reason.color} ${
                  selectedReason.title === reason.title ? 'is-selected' : ''
                }`}
                key={reason.title}
                onClick={() => setSelectedReason(reason)}
                type="button"
              >
                <span className="flower-art" aria-hidden="true">
                  <span className="petal petal-one" />
                  <span className="petal petal-two" />
                  <span className="petal petal-three" />
                  <span className="petal petal-four" />
                  <span className="flower-center" />
                  <span className="flower-stem" />
                  <span className="flower-leaf" />
                </span>
                <span className="reason-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="reason-copy">
                  <span className="reason-title">{reason.title}</span>
                  <span className="reason-proof">{reason.proof}</span>
                </span>
              </button>
            ))}
          </div>
          <aside className={`bloom-note flower-${selectedReason.color}`}>
            <span className="note-kicker">A real reason</span>
            <h3>{selectedReason.title}</h3>
            <p>{selectedReason.note}</p>
            <p>{selectedReason.detail}</p>
          </aside>
        </div>
      </section>

      <section
        className={sceneClass('memories', 'memories-section')}
        data-scene="memories"
        aria-labelledby="memories-title"
      >
        <SectionHeading eyebrow="Little memory album" title="Memory Polaroids">
          Soft snapshots of us, waiting for your real photos and all the moments still coming.
        </SectionHeading>
        <div className="polaroid-grid">
          {memories.map((memory) => (
            <figure className="polaroid" key={memory.title}>
              <div className="memory-photo">
                <img src={memory.image} alt={memory.alt} loading="lazy" />
              </div>
              <figcaption>
                <strong>{memory.title}</strong>
                <span>{memory.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className={sceneClass('letters', 'letters-section')}
        data-scene="letters"
        aria-labelledby="letters-title"
      >
        <SectionHeading eyebrow="Keep these forever" title="Open When Love Letters">
          Tiny envelopes for the days when you want me close, even after your birthday.
        </SectionHeading>
        <div className="letters-grid">
          {letters.map((letter) => {
            const isOpen = openedLetters.includes(letter.id)
            return (
              <button
                className={`letter-card ${isOpen ? 'is-open' : ''}`}
                key={letter.id}
                onClick={() => openLetter(letter)}
                type="button"
              >
                <span className="envelope" aria-hidden="true">
                  <span className="envelope-flap" />
                  <span className="envelope-heart">♥</span>
                </span>
                <strong>{letter.title}</strong>
                <span>{isOpen ? letter.preview : 'Sealed with a little kiss. Tap to open.'}</span>
              </button>
            )
          })}
        </div>
      </section>

      {activeLetter ? (
        <div
          className="letter-dialog-backdrop"
          role="presentation"
          onClick={() => setActiveLetter(null)}
        >
          <article
            aria-labelledby="letter-dialog-title"
            aria-modal="true"
            className={`letter-dialog letter-dialog-${activeLetter.id}`}
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="letter-dialog-close"
              type="button"
              onClick={() => setActiveLetter(null)}
            >
              Close
            </button>
            <div className="letter-dialog-seal" aria-hidden="true">
              <span>♥</span>
            </div>
            <p className="letter-dialog-mood">{activeLetter.mood}</p>
            <h3 id="letter-dialog-title">{activeLetter.title}</h3>
            <div className="letter-dialog-body">
              {activeLetter.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="letter-dialog-signature">{activeLetter.signature}</p>
          </article>
        </div>
      ) : null}

      <section
        className={sceneClass('moon', 'moon-section')}
        data-scene="moon"
        aria-labelledby="moon-title"
      >
        <div className="moon-sky" aria-hidden="true">
          <span className="moon" />
          <span className="moon-star star-a">✦</span>
          <span className="moon-star star-b">✧</span>
          <span className="moon-star star-c">✦</span>
        </div>
        <div className="moon-copy">
          <p className="eyebrow">Birthday wish under the moon</p>
          <h2 id="moon-title">The moon is probably seeing both of us tonight.</h2>
          <p>
            So I asked it to carry my birthday wish from Sri Lanka to the UK.
          </p>
          <div className="wish-letter">
            <p>
              Happy birthday, my love. I hope today wraps you in the kind of warmth
              you bring into my life so easily.
            </p>
            <p>
              I hope you feel adored in every quiet second, celebrated in every
              little detail, and remembered in the sweetest way. I may not be
              beside you today, but my heart is beside you completely.
            </p>
            <p>
              You are my favorite thought, my soft place, and the person I would
              choose again under every sky.
            </p>
          </div>
          <button className="music-button" type="button" onClick={playMoonSong}>
            Play a tiny moon song
          </button>
        </div>
      </section>

      <section
        className={sceneClass('date', 'date-section')}
        data-scene="date"
        aria-labelledby="date-title"
      >
        <SectionHeading eyebrow="A promise after today" title="Choose Our Next Online Date">
          Choose the kind of night you want with me, and this little world will keep it as a promise.
        </SectionHeading>
        <div className="date-options">
          {dateOptions.map((date) => (
            <button
              className={`date-option date-${date.tone} ${
                selectedDate === date.id ? 'is-selected' : ''
              }`}
              key={date.id}
              onClick={() => setSelectedDate(date.id)}
              type="button"
            >
              <span aria-hidden="true">{date.icon}</span>
              <span className="date-option-copy">
                <strong>{date.title}</strong>
                <small>{date.note}</small>
              </span>
            </button>
          ))}
        </div>
        {chosenDate ? <DateTicket date={chosenDate} /> : null}
      </section>

      <section
        className={sceneClass('gift', 'gift-section')}
        data-scene="gift"
        aria-labelledby="gift-title"
      >
        <SectionHeading eyebrow="The final little room" title="Final Gift Room">
          You reached the final little room. This website was my first gift, but your final surprise is waiting here.
        </SectionHeading>
        <div className="gift-grid">
          {gifts.map((gift) =>
            gift.href ? (
              <a
                className="gift-tile"
                href={gift.href}
                key={gift.id}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true">✦</span>
                <strong>{gift.title}</strong>
                <small>{gift.label}</small>
              </a>
            ) : (
              <button
                className={`gift-tile ${
                  activeGift.id === gift.id ? 'is-selected' : ''
                }`}
                key={gift.id}
                onClick={() => setActiveGift(gift)}
                type="button"
              >
                <span aria-hidden="true">✦</span>
                <strong>{gift.title}</strong>
                <small>{gift.label}</small>
              </button>
            ),
          )}
        </div>
        <div className="gift-reveal" aria-live="polite">
          <div className="gift-box" aria-hidden="true">
            <span />
          </div>
          <p>{activeGift.fallback}</p>
        </div>
        <footer className="site-footer">
          <span>Bug fixed: birthday girl not smiling enough.</span>
          <span>Smile loading... 100%.</span>
        </footer>
      </section>
    </main>
  )
}

function App() {
  const unlockDate = useMemo(() => getUnlockDate(), [])
  const [now, setNow] = useState(() => new Date())
  const [secretInput, setSecretInput] = useState('')
  const [secretError, setSecretError] = useState('')
  const [gateOpen, setGateOpen] = useStoredState(
    'little-world-gate-open',
    false,
  )

  const isTimeUnlocked = CONFIG.previewUnlock || now >= unlockDate
  const normalizedSecret = CONFIG.secretWord.toLowerCase()

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const handleSecretSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (secretInput.trim().toLowerCase() === normalizedSecret) {
      setGateOpen(true)
      setSecretError('')
      return
    }

    setSecretError('The gate is still shy. Try the secret word only we know.')
  }

  if (!isTimeUnlocked) {
    return <CountdownScreen now={now} target={unlockDate} />
  }

  if (!gateOpen) {
    return (
      <SecretGate
        secretError={secretError}
        secretInput={secretInput}
        onSecretChange={setSecretInput}
        onSubmit={handleSecretSubmit}
      />
    )
  }

  return <LittleWorld />
}

export default App
