import { useEffect } from 'react'
import Script from 'next/script'

export default function AdSlot({ client, slot, style = { display: 'block' }, format = 'auto', full = true }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      // ignore push errors (TagError when slot not ready)
    }
  }, [])

  return (
    <>
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={full ? 'true' : 'false'}
      />
    </>
  )
}
import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

export default function AdSlot({ client, slot, className, style, fullWidth=true }){
  const ref = useRef(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(()=>{
    if(!scriptLoaded) return
    const el = ref.current
    if(!el) return
    let pushed = false

    function tryPush(){
      const width = el.offsetWidth || el.clientWidth || 0
      if(width > 0 && !pushed){
        try{ (window.adsbygoogle = window.adsbygoogle || []).push({}) }catch(e){}
        pushed = true
      }
    }

    // Try immediately then observe size changes
    tryPush()
    const ro = new ResizeObserver(()=> tryPush())
    ro.observe(el)

    return ()=> ro.disconnect()
  },[scriptLoaded])

  return (
    <>
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        strategy="afterInteractive"
        onLoad={()=>setScriptLoaded(true)}
        crossOrigin="anonymous"
      />

      <ins
        ref={ref}
        className={`adsbygoogle ${className||''}`}
        style={style || {display:'block'}}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      ></ins>
    </>
  )
}
