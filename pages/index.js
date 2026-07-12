import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
  const fs = require('fs')
  const path = require('path')
  const filePath = path.join(process.cwd(), 'index.html')
  const html = fs.readFileSync(filePath, 'utf8')
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
  const style = styleMatch ? styleMatch[1] : ''
  return { props: { style } }
}

const DOG_TABLE = {0:[0,0,0],1:[15,15,15],2:[24,24,24],3:[28,28,28],4:[32,32,32],5:[36,37,40],6:[40,42,45],7:[44,47,50],8:[48,51,55],9:[52,56,61],10:[56,60,66],11:[60,65,72],12:[64,69,77],13:[68,74,82],14:[72,78,88],15:[76,83,93]}
const CAT_TABLE = {0:0,1:15,2:24,3:28,4:32,5:36,6:40,7:44,8:48,9:52,10:56,11:60,12:64,13:68,14:72,15:76,16:80,17:84,18:88,19:92,20:96}
const SIZE_INDEX = {small:0,medium:1,large:2}

function dogYearsToHuman(totalYears,size){
  if(totalYears<=0) return 0
  if(totalYears<=0.5) return Math.round(totalYears*20)
  if(totalYears<1) return Math.round(10+(totalYears-0.5)*10)
  const cap = Math.min(totalYears,15)
  const low = Math.floor(cap)
  const high = Math.min(low+1,15)
  const frac = cap-low
  const si = SIZE_INDEX[size]
  return Math.round((DOG_TABLE[low][si]) + frac*((DOG_TABLE[high][si])-(DOG_TABLE[low][si])))
}

function catYearsToHuman(totalYears){
  if(totalYears<=0) return 0
  if(totalYears<=0.5) return Math.round(totalYears*20)
  if(totalYears<1) return Math.round(10+(totalYears-0.5)*10)
  const cap = Math.min(totalYears,20)
  const low = Math.floor(cap)
  const high = Math.min(low+1,20)
  const frac = cap-low
  return Math.round((CAT_TABLE[low]??96)+frac*((CAT_TABLE[high]??96)-(CAT_TABLE[low]??96)))
}

function dogLifeStage(years,size){
  const seniorAt = {small:10,medium:9,large:8}
  if(years<0.5) return 'Puppy'
  if(years<1.5) return 'Junior'
  if(years<seniorAt[size]*0.5) return 'Adult'
  if(years<seniorAt[size]) return 'Mature Adult'
  return 'Senior'
}

function catLifeStage(years){
  if(years<1) return 'Kitten'
  if(years<=6) return 'Young Adult'
  if(years<=10) return 'Mature Adult'
  return 'Senior'
}

export default function Home({ style }){
  const [petType,setPetType] = useState('dog')
  const [dogSize,setDogSize] = useState('small')
  const [years,setYears] = useState('')
  const [months,setMonths] = useState('0')
  const [error,setError] = useState('')
  const [result,setResult] = useState(null)
  const [openModalId,setOpenModalId] = useState(null)
  const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXX'
  const ADSENSE_SLOT_LEADERBOARD = '1234567890'
  const ADSENSE_SLOT_SIDE = '0987654321'

  useEffect(()=>{ document.title = 'Dog Years to Human Years Calculator | VetDoc.Care' },[])

  function hideResult(){ setResult(null); setError('') }

  function calculate(){
    const yearsVal = parseFloat(years)
    const monthsVal = parseInt(months)||0
    if((isNaN(yearsVal)||yearsVal<0) && monthsVal===0){ setError("Please enter your pet's age in years or months."); setResult(null); return }
    setError('')
    const totalYears = (isNaN(yearsVal)?0:yearsVal) + monthsVal/12
    const humanAge = petType==='dog' ? dogYearsToHuman(totalYears,dogSize) : catYearsToHuman(totalYears)
    const stage = petType==='dog' ? dogLifeStage(totalYears,dogSize) : catLifeStage(totalYears)
    const petYearStr = (yearsVal>0&&monthsVal>0) ? `${yearsVal}y ${monthsVal}m` : yearsVal>0 ? `${yearsVal} year${yearsVal!==1?'s':''}` : `${monthsVal} month${monthsVal!==1?'s':''}`
    const sizeLbs = {small:'≤ 20 lbs',medium:'21–50 lbs',large:'>50 lbs'}[dogSize]
    const context = petType==='dog' ? `Life stage (Appendix B): ${stage}. As a ${dogSize} dog (${sizeLbs}), age is based on the size-adjusted table from the Dog Owner's Home Veterinary Handbook.` : `Life stage: ${stage}. Based on the companion feline age table.`
    setResult({label:`${petType==='dog'?'Your dog':'Your cat'} (${petYearStr}) is equivalent to`, number: humanAge, unit:'human years old', context})
    setTimeout(()=>{ const el = document.getElementById('result-card'); if(el) el.scrollIntoView({behavior:'smooth',block:'nearest'}) },80)
  }

  function openModal(id){ setOpenModalId(id); document.body.style.overflow = 'hidden' }
  function closeModal(){ setOpenModalId(null); document.body.style.overflow = '' }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: style}} />
      </Head>
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="brand" aria-label="VetDoc.Care Home"><span className="brand-icon" aria-hidden>🐾</span><span className="brand-name">VetDoc.Care</span></a>
          <nav className="main-nav" aria-label="Primary Navigation">
            <a href="#" className="nav-link active" aria-current="page">Calculator</a>
          </nav>
        </div>
      </header>

      <div className="layout-wrapper">
        <main className="main-content">
          <div className="calc-header">
            <h1 className="calc-title" id="calc-title">{petType==='dog'?'Dog Years to Human Years Calculator':'Cat Years to Human Years Calculator'}</h1>
            <p className="subtitle">Free {petType} age calculator — based on the veterinary standard</p>
          </div>

          <div className="card" id="calculator-card" role="region" aria-label="Pet age calculator">
            <div className="field">
              <label id="pet-type-label">My pet is a…</label>
              <div className="toggle-group" role="group" aria-labelledby="pet-type-label">
                <button className={`toggle-btn ${petType==='dog'?'active':''}`} onClick={()=>{setPetType('dog'); hideResult()}} aria-pressed={petType==='dog'}><span className="emoji" aria-hidden>🐶</span> Dog</button>
                <button className={`toggle-btn ${petType==='cat'?'active':''}`} onClick={()=>{setPetType('cat'); hideResult()}} aria-pressed={petType==='cat'}><span className="emoji" aria-hidden>🐱</span> Cat</button>
              </div>
            </div>

            <div className="field">
              <label>Age of your pet</label>
              <div className="age-row">
                <input type="number" id="age-years" placeholder="Years" min="0" max="30" step="1" inputMode="numeric" aria-label="Age in years" value={years} onChange={e=>setYears(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') calculate()}} />
                <select id="age-months" aria-label="Additional months" value={months} onChange={e=>setMonths(e.target.value)}>
                  {Array.from({length:12}).map((_,i)=> <option key={i} value={i}>{i} {i===1?'month':'months'}</option>)}
                </select>
              </div>
            </div>

            {petType==='dog' && (
              <div className="field" id="size-field">
                <label id="size-label">Dog size <span className="size-hint">Pick your dog's adult weight</span></label>
                <div className="size-grid" role="group" aria-labelledby="size-label">
                  <button className={`size-btn ${dogSize==='small'?'active':''}`} onClick={()=>setDogSize('small')} aria-pressed={dogSize==='small'}><span className="dog-emoji" aria-hidden>🐕‍🦺</span>Small<br /><span style={{fontSize:'.68rem',opacity:.75}}>≤ 20 lbs</span></button>
                  <button className={`size-btn ${dogSize==='medium'?'active':''}`} onClick={()=>setDogSize('medium')} aria-pressed={dogSize==='medium'}><span className="dog-emoji" aria-hidden>🐕</span>Medium<br /><span style={{fontSize:'.68rem',opacity:.75}}>21–50 lbs</span></button>
                  <button className={`size-btn ${dogSize==='large'?'active':''}`} onClick={()=>setDogSize('large')} aria-pressed={dogSize==='large'}><span className="dog-emoji" aria-hidden>🦮</span>Large<br /><span style={{fontSize:'.68rem',opacity:.75}}>Over 50 lbs</span></button>
                </div>
              </div>
            )}

            <button className="calc-btn" onClick={calculate}>Calculate human years →</button>

            {error && <div className="error-msg" role="alert" style={{display:'block'}}>{error}</div>}

            <div className={`result-card ${result?'visible':''}`} id="result-card" role="status" aria-live="polite">
              {result && (
                <>
                  <div className="result-label">{result.label}</div>
                  <div className="result-number" id="result-number">{result.number}</div>
                  <span className="result-unit">{result.unit}</span>
                  <p className="result-context" id="result-context">{result.context}</p>
                </>
              )}
            </div>
          </div>

          <aside className="ad-placeholder ad-bottom" aria-label="Advertisement">
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={ADSENSE_CLIENT}
              data-ad-slot={ADSENSE_SLOT_LEADERBOARD}
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <Script id="adsbygoogle-bottom" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </aside>

        </main>

        <aside className="sidebar" aria-label="Sidebar">
          <div className="ad-placeholder ad-right" aria-label="Advertisement">
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={ADSENSE_CLIENT}
              data-ad-slot={ADSENSE_SLOT_SIDE}
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <Script id="adsbygoogle-side" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>
        </aside>
      </div>

      <hr className="divider" aria-hidden="true" />

      <footer className="site-footer">
        <nav className="footer-nav" aria-label="Footer navigation">
          <button className="footer-link" onClick={()=>openModal('about')}>About</button>
          <button className="footer-link" onClick={()=>openModal('contact')}>Contact</button>
          <button className="footer-link" onClick={()=>openModal('privacy')}>Privacy Policy</button>
          <button className="footer-link" onClick={()=>openModal('sitemap')}>Sitemap</button>
        </nav>
        <div className="footer-sources"><p>Age data: Appendix B of the Dog Owner's Home Veterinary Handbook, 4th Ed.</p></div>
        <p className="footer-copy">&copy; <span id="copy-year">{new Date().getFullYear()}</span>. All rights reserved.</p>
      </footer>

      {/* Modals */}
      <div className={`modal-backdrop ${openModalId?'open':''}`} onClick={closeModal} aria-hidden={!openModalId}></div>
      <div className={`modal ${openModalId==='about'?'open':''}`} role="dialog" aria-modal="true" aria-labelledby="modal-about-title">
        <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
        <h2 id="modal-about-title">About VetDoc.Care</h2>
        <p>VetDoc.Care is a trusted online resource dedicated to pet health and education.</p>
      </div>
      <div className={`modal ${openModalId==='contact'?'open':''}`} role="dialog" aria-modal="true" aria-labelledby="modal-contact-title">
        <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
        <h2 id="modal-contact-title">Contact Us</h2>
        <p><a href="mailto:hello@vetdoc.care">hello@vetdoc.care</a></p>
      </div>
      <div className={`modal ${openModalId==='privacy'?'open':''}`} role="dialog" aria-modal="true" aria-labelledby="modal-privacy-title">
        <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
        <h2 id="modal-privacy-title">Privacy Policy</h2>
        <p>Last updated: May 2026</p>
      </div>

    </>
  )
}
