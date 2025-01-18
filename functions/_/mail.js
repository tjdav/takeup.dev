
import isEmail from 'validator/es/lib/isEmail.js'

/**
 * @import {EventContext} from '@cloudflare/workers-types'
 */

/**
 * @typedef {Object} env
 * @property {string} FORM_TO_EMAIL
 * @property {string} FORM_FROM_EMAIL
 * @property {string} MAILCHANNELS_API
 * @property {string} MAILCHANNELS_DKIM
 */

const englishCharRegExp = /^[\s\w\d\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]*$/g

/**
 * @param {EventContext<env, String, Object>} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
  const request = context.request
  const redirectUrl = new URL(context.request.url)

  if (request.headers.get('Content-Type') !== 'application/x-www-form-urlencoded') {
    redirectUrl.pathname = '/_/oops.html'

    return Response.redirect(redirectUrl)
  }

  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const subject = formData.get('subject')
    const body = formData.get('body')

    // common spam
    if (body && !englishCharRegExp.test(body) || body === 'null') {
      throw new Error('Spam')
    }

    if (isEmail(email) && subject) {
      const name = formData.get('name') || ''
      const sendRequest = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'X-Api-Key': context.env.MAILCHANNELS_API,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: context.env.FORM_TO_EMAIL, name: 'Thomas David' }],
              dkim_domain: 'takeup.dev',
              dkim_selector: 'mcdkim',
              dkim_private_key: context.env.MAILCHANNELS_DKIM
            },
          ],
          mailform: {
            email,
            name
          },
          from: {
            email: context.env.FORM_FROM_EMAIL,
            name: 'TakeUpDev Booking',
          },
          subject: subject,
          content: [
            {
              type: 'text/plain',
              value: 'from: ' + email + '\n'
              + 'name: ' + name + '\n'
              + 'question: ' + body || 'No questions.'
            },
          ],
        })
      })

      if (!sendRequest.ok) {
        throw new Error('failed to send email')  
      }

      redirectUrl.pathname = '/_/thank-you'
      return Response.redirect(redirectUrl)
    } else {
      redirectUrl.pathname = '/_/oops'

      return Response.redirect(redirectUrl)
    }
  } catch (error) {
    redirectUrl.pathname = '/_/oops'
    return Response.redirect(redirectUrl)
  }
}