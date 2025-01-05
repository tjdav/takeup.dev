const offcanvas = document.querySelectorAll('.offcanvas')

for (let i = 0; i < offcanvas.length; i++) {
  const offcanvasElement = offcanvas[i]
  
  if (typeof offcanvasElement.hidePopover !== 'function') {
    // skip invalid elements
    continue
  }

  const offcanvasLinks = offcanvasElement.querySelectorAll('a')

  for (let i = 0; i < offcanvasLinks.length; i++) {
    const offcanvasLinkElement = offcanvasLinks[i];
    
    if (offcanvasLinkElement.hash) {
      // hide offcanvas on bookmark links

      offcanvasLinkElement.addEventListener('click', () => {
        offcanvasElement.hidePopover()
      })
    }
  }
}