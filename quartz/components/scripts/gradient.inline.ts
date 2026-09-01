document.addEventListener("nav", () => {
  const handleScroll = () => {
    const scrollTop = window.scrollY
    // Fade in over the first 500px of scrolling
    const scrollFraction = Math.min(1, scrollTop / 500)
    document.body.style.setProperty("--scroll-opacity", scrollFraction.toString())
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  // Initialize
  handleScroll()
})
