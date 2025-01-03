/**
 * @param {HTMLInputElement} emailFocusInput
 * @param {HTMLInputElement} sessionTypeElement
 */
function sendQueryFocus (emailFocusInput, sessionTypeElement) {
  /**
   * @param {Event} event
   */
  return function (event) {
    event.preventDefault()

    // focus email input
    emailFocusInput.focus()
    emailFocusInput.scrollIntoView({ behavior: 'smooth' })
  
    // select session type
    sessionTypeElement.checked = true
  }
}

export default sendQueryFocus