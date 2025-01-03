/**
 * Change preferred theme colour
 * @param {'light' | 'dark'} theme - set preferred theme
 */
function changeTheme (theme) {
  const HTMLElement = document.querySelector('html')

  HTMLElement.dataset.bsTheme = theme
}

export default changeTheme