import changeTheme from './change-theme.js';
import sendQueryFocus from './send-query-focus.js';

/**
 * Theme change
 */
const themePreferred = window.matchMedia('(prefers-color-scheme: dark)');
const themeLight = document.getElementById('themeLight')
const themeDark = document.getElementById('themeDark')

// preferred dark theme
if (themePreferred.matches) {
  themeDark.checked = true
}

// toggle dark theme
themeDark.addEventListener('input',  () => {
  changeTheme('dark')
})

// toggle light theme
themeLight.addEventListener('input',  () => {
  changeTheme('light')
})

/**
 * Booking
 */
const selectAskQuestion = document.getElementById('selectAskQuestion')
const selectMomentumPack = document.getElementById('selectMomentumPack')
const selectGrowthPack = document.getElementById('selectGrowthPack')
const selectMasteryPack = document.getElementById('selectMasteryPack')
const emailLabelElement = document.getElementById('emailLabel')

// Create event callbacks
const sendQueryAskQuestionCallBack = sendQueryFocus(emailLabelElement, document.getElementById('askQuestionPack'))
const sendQueryMomentumPackCallBack = sendQueryFocus(emailLabelElement, document.getElementById('momentumPack'))
const sendQueryGrowthPackCallBack = sendQueryFocus(emailLabelElement, document.getElementById('growthPack'))
const sendQueryMasteryPackCallBack = sendQueryFocus(emailLabelElement, document.getElementById('masteryPack'))

// Select packs
selectAskQuestion.addEventListener('click', sendQueryAskQuestionCallBack)
selectMomentumPack.addEventListener('click', sendQueryMomentumPackCallBack)
selectGrowthPack.addEventListener('click', sendQueryGrowthPackCallBack)
selectMasteryPack.addEventListener('click', sendQueryMasteryPackCallBack)