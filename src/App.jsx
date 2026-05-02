import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import FilmGrain from './components/FilmGrain'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SocialBar from './components/SocialBar'
import Services from './components/Services'
import FeaturedWork from './components/FeaturedWork'
import About from './components/About'
import Contact from './components/Contact'
import ProjectPage from './components/ProjectPage'
import LinksPage from './components/LinksPage'
import AdminPage from './components/AdminPage'
import MediaKit from './components/MediaKit'
import { getProject } from './data/projects'

function getRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (path === '/links') return { type: 'links' }
  if (path === '/links/admin') return { type: 'admin' }
  if (path === '/media-kit') return { type: 'mediakit' }

  const hash = window.location.hash.replace('#', '')
  if (hash.startsWith('project/')) {
    const slug = hash.replace('project/', '')
    return { type: 'project', slug }
  }
  return { type: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Scroll to a section anchor after the home page has rendered.
  // Needed because the SPA mounts fresh when arriving from /links,
  // so native anchor scrolling fires before the element exists in the DOM.
  useEffect(() => {
    if (route.type !== 'home') return
    const hash = window.location.hash.slice(1)
    if (!hash || hash.startsWith('project/')) return
    const scroll = () => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    // One tick lets React commit the DOM, then scroll
    const t = setTimeout(scroll, 80)
    return () => clearTimeout(t)
  }, [route.type])

  useEffect(() => {
    if (route.type !== 'home') return
    const targets = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [route])

  // Standalone pages — no nav/footer
  if (route.type === 'links') return <><LinksPage /><Analytics /></>
  if (route.type === 'admin') return <AdminPage />
  if (route.type === 'mediakit') return <><MediaKit /><Analytics /></>

  if (route.type === 'project') {
    const project = getProject(route.slug)
    if (project) {
      return (
        <ProjectPage
          project={project}
          onBack={() => {
            window.location.hash = ''
            window.history.pushState(null, '', window.location.pathname + '#work')
            setRoute({ type: 'home' })
          }}
        />
      )
    }
  }

  return (
    <>
      <Analytics />
      <FilmGrain />
      <Navigation />
      <main>
        <Hero />
        <SocialBar />
        <FeaturedWork />
        <Services />
        <About />
        <Contact />
      </main>
      <footer style={{
        borderTop: '1px solid var(--rule)',
        padding: '16px var(--pad-x)',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>
        <span>© 2025 Dario Viegas</span>
        <span>All Rights Reserved</span>
      </footer>
    </>
  )
}
