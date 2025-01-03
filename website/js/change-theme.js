/**
 * Change preferred theme colour
 * @param {'light' | 'dark'} theme - set preferred theme
 */
function changeTheme (theme) {
  const HTMLElement = document.querySelector('html')

  HTMLElement.dataset.bsTheme = theme
}

/**
 * Theme change
 */
const themePreferred = window.matchMedia('(prefers-color-scheme: dark)');
const themeLight = document.getElementById('themeLight')
const themeDark = document.getElementById('themeDark')

// preferred dark theme
if (themePreferred.matches) {
  themeDark.checked = true
  changeTheme('dark')
}

// toggle dark theme
themeDark.addEventListener('input',  () => {
  changeTheme('dark')
})

// toggle light theme
themeLight.addEventListener('input',  () => {
  changeTheme('light')
})