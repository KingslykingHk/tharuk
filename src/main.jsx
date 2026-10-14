import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  LockKeyhole,
  MoonStar,
  Sparkles,
  Star,
  X,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react'
import './styles.css'

const FRIEND_NAME = 'Tharu'
const FROM_NAME = 'Kingsly'

const BIRTHDAY_LETTER = `Dear Tharu,

Happy 22nd birthday to my favourite girl in the world. ❤️

Sometimes, I wonder how someone can become such an important part of my life without even realising it. From our 8th standard days to now, there are so many little things that I will always keep close to my heart.

There are things we never said out loud back then, feelings we kept to ourselves, and moments that still mean more to me than I can explain. Maybe we never needed to put everything into words for it to be real.

One thing I will always remember is how much you care for me. The way you look out for me, the little things you do, and the way you make me feel that I'm not alone — I notice them, Tharu. And I appreciate you more than I probably show.

You are genuinely one of the best people in my life. I hope you get everything your heart wishes for, especially your dreams in cosmetology. I hope you grow into the person you have always wanted to become, find happiness in what you do, and never stop believing in yourself.

And honestly, I hope we get to keep sharing this life in our own little way — more conversations, more stupid jokes, more memories, and more years of being there for each other.

I don't know what the future holds, but I'm really glad you're a part of my story. No matter how much things change, the memories we've made and the place you hold in my life will always mean something special to me.

Thank you for being you, Tharu.

Happy birthday, my favourite girl. Here's to 22 and all the beautiful things waiting for you.

With love,
❤️`

const starMessages = [
  {
    title: 'The Little Things',
    text: 'Random conversations, silly jokes, and little moments that somehow become the best memories.',
  },
  {
    title: 'Chapter 22',
    text: 'A new year to explore, learn new things, and get closer to the life you want for yourself.',
  },
  {
    title: 'Your Future in Beauty',
    text: 'I hope you get to explore your interest in cosmetology, build your skills, and turn that passion into something you’re proud of.',
  },
  {
    title: 'Your Own Path',
    text: 'Keep discovering what you love, trust your progress, and do things at your own pace. You have time to figure it all out.',
  },
  {
    title: 'To More Memories',
    text: 'More laughs, new experiences, exciting opportunities, and plenty of good stories in the year ahead.',
  },
]

const memories = [
  {
    title: 'The little things',
    note: 'A beautiful memory together.',
    mark: '01',
    image: '/images/photo 1.jpeg',
  },
  {
    title: 'Our funniest day',
    note: 'A moment that still makes us laugh.',
    mark: '02',
    image: '/images/photo 2.jpeg',
  },
  {
    title: 'A day to remember',
    note: 'One of our favourite memories.',
    mark: '03',
    image: '/images/photo 3.jpeg',
  },
  {
    title: 'More memories ahead',
    note: 'Many more beautiful moments to come.',
    mark: '04',
    image: '/images/photo 4.jpeg',
  },
]

const timeline = [
  {
    date: 'THE BEGINNING',
    title: '21 Years of Togetherness',
    text: 'From all the little moments to the memories we still carry, I’m glad we’ve shared so much of life together.',
  },
  {
    date: 'A FAVOURITE MEMORY',
    title: 'Always by My Side',
    text: 'You’ve always stood by my side. I hope life gives us many more years together, making memories just like we always have.',
  },
  {
    date: 'ALL THE LITTLE MOMENTS',
    title: 'Our Kind of Memories',
    text: 'The random talks, silly jokes, little fights, and moments that make our friendship uniquely ours.',
  },
  {
    date: 'WHAT COMES NEXT',
    title: 'Your Dreams, Your Journey',
    text: 'I hope you pursue your passion for cosmetology, achieve the things you dream of, and have me cheering for you along the way.',
  },
]

const wishes = [
  {
    icon: '✧',
    name: 'Little Happiness',
    line: 'I hope life gives you more reasons to laugh, peaceful days when you need them, and little moments that make you genuinely happy.',
  },
  {
    icon: '↗',
    name: 'Your Cosmetology Dream',
    line: 'I hope you get to explore cosmetology, learn everything you love about it, and build a future that makes you proud of yourself.',
  },
  {
    icon: '♡',
    name: 'Always Be You',
    line: 'Never feel like you have to change who you are to fit into someone else’s world. The person you are today is already someone worth appreciating.',
  },
  {
    icon: '✦',
    name: 'Our Unspoken Story',
    line: 'From our 8th standard days to today, some memories have a special place in my heart. I hope we get to create many more, in our own little way.',
  },
  {
    icon: '∞',
    name: 'A Little More Time',
    line: 'You have always cared for me in ways I truly appreciate. If there is one thing I wish for us, it is many more years of laughter, support, and being there for each other.',
  },
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
      if (audio.paused) {
        await audio.play()
        setSoundOn(true)
      } else {
        audio.pause()
        setSoundOn(false)
      }
    } catch (error) {
      console.warn('Check public/birthday-song.mp3', error)
      setSoundOn(false)
    }
  }

  // Attempt autoplay. Browsers may require a user interaction first.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5
    audio.loop = true

    const tryPlay = async () => {
      try {
        await audio.play()
        setSoundOn(true)
        document.removeEventListener('pointerdown', tryPlay)
        document.removeEventListener('keydown', tryPlay)
      } catch {
        setSoundOn(false)
      }
    }

    tryPlay()
    document.addEventListener('pointerdown', tryPlay)
    document.addEventListener('keydown', tryPlay)

    return () => {
      document.removeEventListener('pointerdown', tryPlay)
      document.removeEventListener('keydown', tryPlay)
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedStar(null)
        setLightbox(null)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const replay = () => {
    setOpenedGift(false)
    setCandlesOut(false)
    setSelectedStar(null)
    setLightbox(null)
    setLetterOpen(false)
    setSelectedWish(0)
    setFireworks((n) => n + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <audio ref={audioRef} src="/birthday-song.mp3" loop preload="auto" />
      <div className="ambient-glow" aria-hidden="true" />

      <nav className="topbar" aria-label="Main navigation">
        <a
          className="brand"
          href="#welcome"
          onClick={(e) => {
            e.preventDefault()
            goTo('welcome')
          }}
        >
          <span className="brand-mark">
            <Sparkles size={15} />
          </span>
          Tharu❤️
        </a>

        <button
          className="sound-toggle"
          onClick={toggleMusic}
          aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
        </button>
      </nav>

      {/* 1. Welcome and gift */}
      <section className="hero section" id="welcome">
        <div className="hero-stars" aria-hidden="true">
          {Array.from({ length: 32 }, (_, i) => (
            <i
              key={i}
              style={{
                '--i': i,
                '--x': `${(i * 37 + 11) % 100}%`,
                '--y': `${(i * 23 + 8) % 92}%`,
                '--delay': `${(i % 9) * -0.7}s`,
              }}
            />
          ))}
        </div>

        <div className="eyebrow">
          <span /> A SURPRISE MADE JUST FOR YOU <span />
        </div>
        <h1>
          For someone
          <br />
          <em>one of a kind.</em>
        </h1>
        <p className="hero-copy">
          A tiny universe of wishes, memories, and all the things
          <br className="desktop-only" /> Have A Blessing And Cheerful Year
          Ahead For You.
        </p>

        <div className={`gift-stage ${openedGift ? 'is-open' : ''}`}>
          <div className="gift-aura" />
          <button
            className="gift-button"
            onClick={() => {
              setOpenedGift(true)
              setTimeout(() => goTo('cake'), 950)
            }}
            aria-label="Open your birthday gift"
            disabled={openedGift}
          >
            <span className="gift-lid">
              <span className="gift-bow" />
            </span>
            <span className="gift-box">
              <span className="gift-ribbon" />
            </span>
            <span className="gift-glint glint-one">✦</span>
            <span className="gift-glint glint-two">✧</span>
            <span className="gift-glint glint-three">✦</span>
          </button>
          <p className="gift-hint">
            {openedGift
              ? 'YOUR SURPRISE IS UNFOLDING…'
              : 'TAP THE GIFT TO BEGIN'}
          </p>
        </div>

        <button className="scroll-cue" onClick={() => goTo('cake')}>
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={15} />
        </button>
      </section>

      {/* 2. Birthday cake */}
      <section className="cake-section section" id="cake">
        <div className="section-head">
          <span className="kicker">01 — MAKE A WISH</span>
          <h2>
            Twenty-two looks <em>golden</em> on you.
          </h2>
          <p>Take a breath, make a wish, and let this moment be yours.</p>
        </div>

        <div className={`cake-scene ${candlesOut ? 'blown' : ''}`}>
          <div className="cake-halo" />
          <div
            className="cake-illustration"
            role="img"
            aria-label="Birthday cake with exactly twenty-two candles"
          >
            <div className="cake-candles">
              {Array.from({ length: 22 }, (_, i) => (
                <div
                  className="candle"
                  key={i}
                  style={{ '--candle-i': i, height: `${25 + (i % 4) * 5}px` }}
                >
                  <span className="flame" />
                  <span className="wick" />
                </div>
              ))}
            </div>
            <div className="cake-top">
              <span className="cake-top-line" />
              <span className="cake-dot d1" />
              <span className="cake-dot d2" />
              <span className="cake-dot d3" />
            </div>
            <div className="cake-layer layer-top">
              <span className="icing-drip drip1" />
              <span className="icing-drip drip2" />
              <span className="icing-drip drip3" />
              <span className="icing-drip drip4" />
              <span className="icing-drip drip5" />
            </div>
            <div className="cake-layer layer-bottom">
              <span className="cake-number">22</span>
            </div>
            <div className="cake-plate" />
          </div>
        </div>

        <h3 className="cake-title">
          Happy 22nd Birthday<span>.</span>
        </h3>
        <p className="cake-caption">A new chapter. A thousand possibilities.</p>
        <button
          className="outline-button"
          onClick={() => setCandlesOut(!candlesOut)}
        >
          {candlesOut ? (
            <>
              <Sparkles size={15} /> Relight the candles
            </>
          ) : (
            <>
              <WindIcon /> Blow out the candles
            </>
          )}
        </button>
        {candlesOut && (
          <p className="wish-confirm" role="status">
            Wish made. May a little magic find its way to you. ✦
          </p>
        )}
      </section>

      {/* 3. Starry sky */}
      <section className="sky-section section" id="sky">
        <div className="section-head">
          <span className="kicker">02 — A SKY FULL OF WISHES</span>
          <h2>
            Some stars are <em>just for you.</em>
          </h2>
          <p>Choose a star. There’s a little message waiting inside.</p>
        </div>

        <div className="sky-canvas">
          {Array.from({ length: 54 }, (_, i) => (
            <i
              className="background-star"
              key={i}
              style={{
                left: `${(i * 41 + 7) % 98}%`,
                top: `${(i * 29 + 3) % 95}%`,
                '--duration': `${2.5 + (i % 5)}s`,
                '--delay': `${(i % 8) * -0.5}s`,
              }}
            />
          ))}
          {starMessages.map((item, i) => (
            <button
              key={item.title}
              className={`wish-star star-${i + 1}`}
              onClick={() => setSelectedStar(item)}
              aria-label={`Open star message: ${item.title}`}
            >
              <Star size={i === 2 ? 27 : 20} fill="currentColor" />
              <span>{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
          <div className="sky-center">
            <MoonStar size={25} strokeWidth={1.2} />
            <span>YOUR LITTLE CONSTELLATION</span>
          </div>
        </div>
        <div className="star-legend">
          <span>
            <i /> 5 little wishes
          </span>
          <span>wrapped in starlight</span>
        </div>
      </section>

      {/* 4. Memories gallery */}
      <section className="memories-section section" id="memories">
        <div className="section-head">
          <span className="kicker">03 — THE GOOD OLD DAYS</span>
          <h2>
            Little moments, <em>forever kept.</em>
          </h2>
          <p>
            A few favourite pictures, countless memories, and stories worth
            keeping.
          </p>
        </div>

        <div className="memory-grid">
          {memories.map((memory, i) => (
            <button
              className={`memory-card memory-${i + 1}`}
              key={memory.mark}
              onClick={() => setLightbox(memory)}
              aria-label={`View memory placeholder: ${memory.title}`}
            >
              <div className="memory-photo">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="memory-image"
                />

                <span className="expand-photo">
                  <ArrowUpRight size={17} />
                </span>
              </div>
              <div className="memory-info">
                <span className="memory-index">MEMORY {memory.mark}</span>
                <h3>{memory.title}</h3>
                <p>{memory.note}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="gallery-note">
          <span className="note-dot" /> Every picture holds a memory worth
          keeping.
        </p>
      </section>

      {/* 5. Friendship timeline */}
      <section className="timeline-section section" id="timeline">
        <div className="section-head">
          <span className="kicker">04 — OUR STORY SO FAR</span>
          <h2>
            And the story <em>goes on.</em>
          </h2>
          <p>Every friendship has its own kind of timeline.</p>
        </div>

        <div className="timeline">
          {timeline.map((item, i) => (
            <article className="timeline-item" key={item.date}>
              <div className="timeline-marker">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="timeline-card">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="timeline-sparkle">✧</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Birthday letter */}
      <section className="letter-section section" id="letter">
        <div className="section-head">
          <span className="kicker">05 — SOMETHING FROM THE HEART</span>
          <h2>
            A few words, <em>just for you.</em>
          </h2>
          <p>Some things deserve more than a quick message.</p>
        </div>

        <button
          className={`letter-envelope ${letterOpen ? 'letter-is-open' : ''}`}
          onClick={() => setLetterOpen(!letterOpen)}
          aria-expanded={letterOpen}
        >
          <div className="envelope-back">
            <div className="letter-paper">
              <div className="letter-paper-top">
                <span>TO SOMEONE SPECIAL</span>
                <Heart size={17} />
              </div>
              <h3>Dear {FRIEND_NAME},</h3>
              <p>{BIRTHDAY_LETTER}</p>
              <div className="letter-signoff">
                With all my love,
                <br />
                <em>{FROM_NAME}</em>
              </div>
            </div>
          </div>
          <div className="envelope-front">
            <div className="envelope-flap" />
            <span className="seal">
              <Heart size={19} fill="currentColor" />
            </span>
            <span className="envelope-instruction">
              {letterOpen ? 'YOUR LETTER IS OPEN' : 'TAP TO OPEN YOUR LETTER'}
            </span>
          </div>
        </button>

        <p className="edit-hint">
          <Heart size={13} /> A little something, made just for Tharu.
        </p>
      </section>

      {/* 7. Choose a wish */}
      <section className="wishes-section section" id="wishes">
        <div className="section-head">
          <span className="kicker">06 — PICK A LITTLE WISH</span>
          <h2>
            If I could gift you <em>one thing…</em>
          </h2>
          <p>Choose the wish you want to carry into this new year.</p>
        </div>

        <div className="wish-cards">
          {wishes.map((wish, i) => (
            <button
              key={wish.name}
              onClick={() => setSelectedWish(i)}
              className={`wish-card ${selectedWish === i ? 'wish-selected' : ''}`}
              aria-pressed={selectedWish === i}
            >
              <span className="wish-card-icon">{wish.icon}</span>
              <span className="wish-card-name">{wish.name}</span>
              <span className="wish-card-check">
                {selectedWish === i ? (
                  <Check size={14} />
                ) : (
                  <ArrowUpRight size={14} />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="wish-reveal" key={selectedWish}>
          <span className="reveal-star">✦</span>
          <span className="kicker">YOUR WISH, UNWRAPPED</span>
          <h3>{wishes[selectedWish].name}</h3>
          <p>{wishes[selectedWish].line}</p>
        </div>
      </section>

      {/* 8. Golden fireworks finale */}
      <section className="finale-section section" id="finale" key={fireworks}>
        <div className="firework-field" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <div className={`firework fw-${i + 1}`} key={i}>
              {Array.from({ length: 12 }, (_, j) => (
                <i key={j} style={{ '--ray': j, '--rays': 12 }} />
              ))}
            </div>
          ))}
          {Array.from({ length: 42 }, (_, i) => (
            <i
              className="final-spark"
              key={i}
              style={{
                '--x': `${(i * 31 + 5) % 100}%`,
                '--y': `${(i * 19 + 2) % 90}%`,
                '--delay': `${(i % 12) * -0.65}s`,
              }}
            />
          ))}
        </div>

        <div className="finale-content">
          <span className="kicker">
            <Sparkles size={13} /> THE WORLD IS YOURS TO DISCOVER{' '}
            <Sparkles size={13} />
          </span>
          <div className="finale-number">22</div>
          <h2>
            Happy Birthday,
            <br />
            <em>{FRIEND_NAME}.</em>
          </h2>
          <p>
            May your twenty-second year be full of golden hours,
            <br className="desktop-only" /> unexpected joy, and people who feel
            like home.
          </p>
          <div className="finale-rule">
            <span />
            <Star size={15} fill="currentColor" />
            <span />
          </div>
          <p className="finale-from">
            Made with love, just for you.
            <br />
            <strong>{FROM_NAME}</strong>
          </p>
          <button className="gold-button" onClick={replay}>
            <RotateCcw size={15} /> Replay the magic
          </button>
        </div>

        <footer className="site-footer">
          <span>
            Happy Birthday Tharu
            <Sparkles size={12} />
          </span>
          <span>MADE WITH LOVE · JUST FOR YOU</span>
        </footer>
      </section>

      {selectedStar && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedStar(null)}
        >
          <div
            className="message-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="star-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedStar(null)}
              aria-label="Close message"
            >
              <X size={18} />
            </button>
            <span className="modal-star">
              <Star size={26} fill="currentColor" />
            </span>
            <span className="kicker">A MESSAGE FROM THE STARS</span>
            <h3 id="star-modal-title">{selectedStar.title}</h3>
            <p>{selectedStar.text}</p>
            <span className="modal-footer">A LITTLE WISH FOR YOU · ✦</span>
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setLightbox(null)}
        >
          <div
            className="memory-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setLightbox(null)}
              aria-label="Close photo detail"
            >
              <X size={18} />
            </button>

            <div className="modal-photo-placeholder">
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="memory-image"
              />
            </div>


            <span className="kicker">MEMORY {lightbox.mark}</span>
            <h3 id="memory-modal-title">{lightbox.title}</h3>
            <p>{lightbox.note}</p>
            <span className="modal-footer">
              REPLACE THIS PLACEHOLDER WITH YOUR PHOTO
            </span>
          </div>
        </div>
      )}
    </main>
  )
}

function WindIcon() {
  return (
    <span className="wind-icon" aria-hidden="true">
      ≈
    </span>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
