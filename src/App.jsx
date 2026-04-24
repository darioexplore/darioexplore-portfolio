import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Services from './components/Services'
import FeaturedWork from './components/FeaturedWork'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'
import { getProject } from './data/projects'

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '')
  if (hash.startsWith('project/')) {
    const slug = hash.replace('project/', '')
    return { type: 'project', slug }
  }
  return { type: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash)

  useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Scroll reveal — re-run when returning to home
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
      <Navigation />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <FeaturedWork />
<About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
