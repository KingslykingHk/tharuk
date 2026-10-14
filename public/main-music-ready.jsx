import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, ChevronDown, Gift, Heart, LockKeyhole, MoonStar, Sparkles, Star, X, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import './styles.css'

// EDIT THESE VALUES to personalize the experience.
const FRIEND_NAME = 'Your Best Friend'
const FROM_NAME = 'Your Bestie'
const BIRTHDAY_LETTER = `Some people make ordinary days feel special without even trying. You’re one of those people. I hope this new chapter brings you reasons to laugh until your cheeks hurt, courage to chase the things you love, and people who make you feel as appreciated as you are. Thank you for the little moments, the silly conversations, and the memories still waiting for us. No matter how much life changes, I’m always cheering for you. Keep being wonderfully, unapologetically you. Happy 22nd birthday!`

const starMessages = [
  { title: 'A little reminder', text: 'You make the world brighter just by being yourself.' },
  { title: 'For your next chapter', text: 'May you be brave enough to try, and gentle enough with yourself while you learn.' },
  { title: 'Our friendship', text: 'The best memories are often the small moments we never planned.' },
  { title: 'Your kind of magic', text: 'Never underestimate the good you bring into the lives around you.' },
  { title: 'A wish for you', text: 'May you always find a reason to smile, even on the ordinary days.' },
]
const memories = [
  { title: 'The little things', note: 'Replace this card with a favourite photo and a real memory.', mark: '01' },
  { title: 'Our funniest day', note: 'Add a photo from a moment that still makes you laugh.', mark: '02' },
  { title: 'A day to remember', note: 'A trip, a celebration, or simply a day together.', mark: '03' },
  { title: 'More memories ahead', note: 'Leave this space for the next unforgettable moment.', mark: '04' },
]
const timeline = [
  { date: 'THE BEGINNING', title: 'When our story started', text: 'Add the real date or moment you first became friends.' },
  { date: 'A FAVOURITE MEMORY', title: 'The day we still talk about', text: 'Write a short, personal detail that only the two of you understand.' },
  { date: 'ALL THE LITTLE MOMENTS', title: 'A thousand tiny stories', text: 'The jokes, the conversations, and the times we showed up for each other.' },
  { date: 'WHAT COMES NEXT', title: 'The best is still ahead', text: 'More adventures, more laughter, and more memories to make together.' },
]
const wishes = [
  { icon: '✧', name: 'Happiness', line: 'May your days hold more belly laughs, calm moments, and little reasons to celebrate.' },
  { icon: '↗', name: 'Big dreams', line: 'May you trust your ideas, keep learning, and surprise yourself with what you can do.' },
  { icon: '♡', name: 'Confidence', line: 'May you remember your worth, speak kindly to yourself, and take up space as you are.' },
  { icon: '✦', name: 'Adventure', line: 'May the year ahead bring new places, new stories, and beautiful firsts.' },
  { icon: '∞', name: 'Friendship', line: 'May you always be surrounded by people who celebrate your wins and stay for the hard days.' },
]

function App() {
  const [openedGift, setOpenedGift] = useState(false)
  const [candlesOut, setCandlesOut] = useState(false)
  const [selectedStar, setSelectedStar] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [letterOpen, setLetterOpen] = useState(false)
  const [selectedWish, setSelectedWish] = useState(0)
  const [fireworks, setFireworks] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (soundOn) {
        audio.pause()
        setSoundOn(false)
      } else {
        await audio.play()
        setSoundOn(true)
      }
    } catch (error) {
      console.error('Could not play birthday music. Check public/birthday-song.mp3.', error)
      setSoundOn(false)
      alert('Could not play the song. Check that public/birthday-song.mp3 exists and is a valid MP3 file.')
    }
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setSelectedStar(null); setLightbox(null) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const replay = () => {
    setOpenedGift(false); setCandlesOut(false); setSelectedStar(null); setLightbox(null); setLetterOpen(false); setSelectedWish(0); setFireworks((n) => n + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <main>
    <div className="ambient-glow" aria-hidden="true" />
    <nav className="topbar" aria-label="Main navigation">
      <a className="brand" href="#welcome" onClick={(e) => { e.preventDefault(); goTo('welcome') }}><span className="brand-mark"><Sparkles size={15} /></span> A LITTLE UNIVERSE</a>
      <button className="sound-toggle" onClick={toggleMusic} aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'} title={soundOn ? 'Pause birthday music' : 'Play birthday music'}>{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span></button>
      <audio ref={audioRef} src="/birthday-song.mp3" loop preload="auto" />
    </nav>

    <section className="hero section" id="welcome">
      <div className="hero-stars" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ '--i': i, '--x': `${(i * 37 + 11) % 100}%`, '--y': `${(i * 23 + 8) % 92}%`, '--delay': `${(i % 9) * -.7}s` }} />)}</div>
      <div className="eyebrow"><span /> A SURPRISE MADE JUST FOR YOU <span /></div>
      <h1>For someone<br /> <em>one of a kind.</em></h1>
      <p className="hero-copy">A tiny universe of wishes, memories, and all the things<br className="desktop-only" /> I hope this new year brings you.</p>
      <div className={`gift-stage ${openedGift ? 'is-open' : ''}`}>
        <div className="gift-aura" />
        <button className="gift-button" onClick={() => { setOpenedGift(true); setTimeout(() => goTo('cake'), 950) }} aria-label="Open your birthday gift" disabled={openedGift}>
          <span className="gift-lid"><span className="gift-bow" /></span><span className="gift-box"><span className="gift-ribbon" /></span>
          <span className="gift-glint glint-one">✦</span><span className="gift-glint glint-two">✧</span><span className="gift-glint glint-three">✦</span>
        </button>
        <p className="gift-hint">{openedGift ? 'YOUR SURPRISE IS UNFOLDING…' : 'TAP THE GIFT TO BEGIN'}</p>
      </div>
      <button className="scroll-cue" onClick={() => goTo('cake')}><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></button>
    </section>

    <section className="cake-section section" id="cake">
      <div className="section-head"><span className="kicker">01 — MAKE A WISH</span><h2>Twenty-two looks <em>golden</em> on you.</h2><p>Take a breath, make a wish, and let this moment be yours.</p></div>
      <div className={`cake-scene ${candlesOut ? 'blown' : ''}`}>
        <div className="cake-halo" />
        <div className="cake-illustration" role="img" aria-label="Birthday cake with exactly twenty-two candles">
          <div className="cake-candles">{Array.from({ length: 22 }, (_, i) => <div className="candle" key={i} style={{ '--candle-i': i, height: `${25 + (i % 4) * 5}px` }}><span className="flame" /><span className="wick" /></div>)}</div>
          <div className="cake-top"><span className="cake-top-line" /><span className="cake-dot d1" /><span className="cake-dot d2" /><span className="cake-dot d3" /></div>
          <div className="cake-layer layer-top"><span className="icing-drip drip1" /><span className="icing-drip drip2" /><span className="icing-drip drip3" /><span className="icing-drip drip4" /><span className="icing-drip drip5" /></div>
          <div className="cake-layer layer-bottom"><span className="cake-number">22</span></div><div className="cake-plate" />
        </div>
      </div>
      <h3 className="cake-title">Happy 22nd Birthday<span>.</span></h3>
      <p className="cake-caption">A new chapter. A thousand possibilities.</p>
      <button className="outline-button" onClick={() => setCandlesOut(!candlesOut)}>{candlesOut ? <><Sparkles size={15} /> Relight the candles</> : <><WindIcon /> Blow out the candles</>}</button>
      {candlesOut && <p className="wish-confirm" role="status">Wish made. May a little magic find its way to you. ✦</p>}
    </section>

    <section className="sky-section section" id="sky">
      <div className="section-head"><span className="kicker">02 — A SKY FULL OF WISHES</span><h2>Some stars are <em>just for you.</em></h2><p>Choose a star. There’s a little message waiting inside.</p></div>
      <div className="sky-canvas">
        {Array.from({ length: 54 }, (_, i) => <i className="background-star" key={i} style={{ left: `${(i * 41 + 7) % 98}%`, top: `${(i * 29 + 3) % 95}%`, '--duration': `${2.5 + (i % 5)}s`, '--delay': `${(i % 8) * -.5}s` }} />)}
        {starMessages.map((item, i) => <button key={item.title} className={`wish-star star-${i + 1}`} onClick={() => setSelectedStar(item)} aria-label={`Open star message: ${item.title}`}><Star size={i === 2 ? 27 : 20} fill="currentColor" /><span>{String(i + 1).padStart(2, '0')}</span></button>)}
        <div className="sky-center"><MoonStar size={25} strokeWidth={1.2} /><span>YOUR LITTLE CONSTELLATION</span></div>
      </div>
      <div className="star-legend"><span><i /> 5 little wishes</span><span>Made of friendship, wrapped in starlight</span></div>
    </section>

    <section className="memories-section section" id="memories">
      <div className="section-head"><span className="kicker">03 — THE GOOD OLD DAYS</span><h2>Little moments, <em>forever kept.</em></h2><p>Our story, told in snapshots. Add your favourite photos to make it yours.</p></div>
      <div className="memory-grid">{memories.map((memory, i) => <button className={`memory-card memory-${i + 1}`} key={memory.mark} onClick={() => setLightbox(memory)} aria-label={`View memory placeholder: ${memory.title}`}>
        <div className="memory-photo"><div className="photo-placeholder"><span className="photo-icon"><Heart size={19} /></span><span className="photo-mark">{memory.mark}</span><span className="photo-label">YOUR PHOTO HERE</span><span className="photo-hint">Replace with a real memory</span></div><span className="expand-photo"><ArrowUpRight size={17} /></span></div>
        <div className="memory-info"><span className="memory-index">MEMORY {memory.mark}</span><h3>{memory.title}</h3><p>{memory.note}</p></div>
      </button>)}</div>
      <p className="gallery-note"><span className="note-dot" /> These are editable placeholders — no photos or memories have been invented.</p>
    </section>

    <section className="timeline-section section" id="timeline">
      <div className="section-head"><span className="kicker">04 — OUR STORY SO FAR</span><h2>And the story <em>goes on.</em></h2><p>Every friendship has its own kind of timeline.</p></div>
      <div className="timeline">{timeline.map((item, i) => <article className="timeline-item" key={item.date}><div className="timeline-marker"><span>{String(i + 1).padStart(2, '0')}</span></div><div className="timeline-card"><span className="timeline-date">{item.date}</span><h3>{item.title}</h3><p>{item.text}</p><span className="timeline-sparkle">✧</span></div></article>)}</div>
    </section>

    <section className="letter-section section" id="letter">
      <div className="section-head"><span className="kicker">05 — SOMETHING FROM THE HEART</span><h2>A few words, <em>just for you.</em></h2><p>Some things deserve more than a quick message.</p></div>
      <button className={`letter-envelope ${letterOpen ? 'letter-is-open' : ''}`} onClick={() => setLetterOpen(!letterOpen)} aria-expanded={letterOpen}>
        <div className="envelope-back"><div className="letter-paper"><div className="letter-paper-top"><span>TO SOMEONE SPECIAL</span><Heart size={17} /></div><h3>Dear {FRIEND_NAME},</h3><p>{BIRTHDAY_LETTER}</p><div className="letter-signoff">With all my love,<br /><em>{FROM_NAME}</em></div></div></div>
        <div className="envelope-front"><div className="envelope-flap" /><span className="seal"><Heart size={19} fill="currentColor" /></span><span className="envelope-instruction">{letterOpen ? 'YOUR LETTER IS OPEN' : 'TAP TO OPEN YOUR LETTER'}</span></div>
      </button>
      <p className="edit-hint"><LockKeyhole size={13} /> Personalize the name and message in <code>src/main.jsx</code>.</p>
    </section>

    <section className="wishes-section section" id="wishes">
      <div className="section-head"><span className="kicker">06 — PICK A LITTLE WISH</span><h2>If I could gift you <em>one thing…</em></h2><p>Choose the wish you want to carry into this new year.</p></div>
      <div className="wish-cards">{wishes.map((wish, i) => <button key={wish.name} onClick={() => setSelectedWish(i)} className={`wish-card ${selectedWish === i ? 'wish-selected' : ''}`} aria-pressed={selectedWish === i}><span className="wish-card-icon">{wish.icon}</span><span className="wish-card-name">{wish.name}</span><span className="wish-card-check">{selectedWish === i ? <Check size={14} /> : <ArrowUpRight size={14} />}</span></button>)}</div>
      <div className="wish-reveal" key={selectedWish}><span className="reveal-star">✦</span><span className="kicker">YOUR WISH, UNWRAPPED</span><h3>{wishes[selectedWish].name}</h3><p>{wishes[selectedWish].line}</p></div>
    </section>

    <section className="finale-section section" id="finale" key={fireworks}>
      <div className="firework-field" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <div className={`firework fw-${i + 1}`} key={i}>{Array.from({ length: 12 }, (_, j) => <i key={j} style={{ '--ray': j, '--rays': 12 }} />)}</div>)}{Array.from({ length: 42 }, (_, i) => <i className="final-spark" key={i} style={{ '--x': `${(i * 31 + 5) % 100}%`, '--y': `${(i * 19 + 2) % 90}%`, '--delay': `${(i % 12) * -.65}s` }} />)}</div>
      <div className="finale-content"><span className="kicker"><Sparkles size={13} /> THE WORLD IS YOURS TO DISCOVER <Sparkles size={13} /></span><div className="finale-number">22</div><h2>Happy Birthday,<br /><em>{FRIEND_NAME}.</em></h2><p>May your twenty-second year be full of golden hours,<br className="desktop-only" /> unexpected joy, and people who feel like home.</p><div className="finale-rule"><span /> <Star size={15} fill="currentColor" /> <span /></div><p className="finale-from">Made with love, just for you.<br /><strong>{FROM_NAME}</strong></p><button className="gold-button" onClick={replay}><RotateCcw size={15} /> Replay the magic</button></div>
      <footer className="site-footer"><span>A LITTLE UNIVERSE <Sparkles size={12} /></span><span>MADE WITH LOVE · JUST FOR YOU</span></footer>
    </section>

    {selectedStar && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedStar(null)}><div className="message-modal" role="dialog" aria-modal="true" aria-labelledby="star-modal-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedStar(null)} aria-label="Close message"><X size={18} /></button><span className="modal-star"><Star size={26} fill="currentColor" /></span><span className="kicker">A MESSAGE FROM THE STARS</span><h3 id="star-modal-title">{selectedStar.title}</h3><p>{selectedStar.text}</p><span className="modal-footer">A LITTLE WISH FOR YOU · ✦</span></div></div>}
    {lightbox && <div className="modal-backdrop" role="presentation" onClick={() => setLightbox(null)}><div className="memory-modal" role="dialog" aria-modal="true" aria-labelledby="memory-modal-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setLightbox(null)} aria-label="Close photo detail"><X size={18} /></button><div className="modal-photo-placeholder"><Heart size={28} /><span>YOUR PHOTO HERE</span></div><span className="kicker">MEMORY {lightbox.mark}</span><h3 id="memory-modal-title">{lightbox.title}</h3><p>{lightbox.note}</p><span className="modal-footer">REPLACE THIS PLACEHOLDER WITH YOUR PHOTO</span></div></div>}
  </main>
}

function WindIcon() { return <span className="wind-icon" aria-hidden="true">≈</span> }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
