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

/**
 * Booking
 */
const selectAskQuestion = document.getElementById('selectAskQuestion')
const selectMomentumPack = document.getElementById('selectMomentumPack')
const selectGrowthPack = document.getElementById('selectGrowthPack')
const selectMasteryPack = document.getElementById('selectMasteryPack')
const emailElement = document.getElementById('email')

// Create event callbacks
const sendQueryAskQuestionCallBack = sendQueryFocus(emailElement, document.getElementById('askQuestionPack'))
const sendQueryMomentumPackCallBack = sendQueryFocus(emailElement, document.getElementById('momentumPack'))
const sendQueryGrowthPackCallBack = sendQueryFocus(emailElement, document.getElementById('growthPack'))
const sendQueryMasteryPackCallBack = sendQueryFocus(emailElement, document.getElementById('masteryPack'))

// Select packs
selectAskQuestion.addEventListener('click', sendQueryAskQuestionCallBack)
selectMomentumPack.addEventListener('click', sendQueryMomentumPackCallBack)
selectGrowthPack.addEventListener('click', sendQueryGrowthPackCallBack)
selectMasteryPack.addEventListener('click', sendQueryMasteryPackCallBack)