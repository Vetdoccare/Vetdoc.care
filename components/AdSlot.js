import Script from 'next/script'
import { useEffect } from 'react'

export default function AdSlot({ client, slot, style, id }){
  useEffect(()=>{
    try{ (window.adsbygoogle = window.adsbygoogle || []).push({}) }catch(e){}
  },[])

  return (
    <>
      <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" strategy="afterInteractive" />
      <ins id={id} className="adsbygoogle" style={style||{display:'block'}} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true"></ins>
    </>
  )
}
