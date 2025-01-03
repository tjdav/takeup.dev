
import isEmail from 'validator/es/lib/isEmail'

/**
 * @import {EventContext} from '@cloudflare/workers-types'
 */

/**
 * @typedef {Object} env
 * @property {string} MAILCHANNELS_API
 */

/**
 * @param {EventContext<env, String, Object>} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
  const request = context.request
  const redirectUrl = new URL(context.request.url)

  if (request.headers.get('Content-Type') !== 'application/x-www-form-urlencoded') {
    redirectUrl.pathname = '/oops.html'

    return Response.redirect(redirectUrl)
  }

  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const subject = formData.get('subject')

    if (isEmail(email) && subject) {
      const sendRequest = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'X-Api-Key': context.env.MAILCHANNELS_API,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: 'thomas@takeup.dev', name: 'Thomas David' }],
            },
          ],
          from: {
            email: 'thomas@takeup.dev',
            name: 'TakeUpDev Booking',
          },
          subject: `from: ${email} - ${subject}`,
          content: [
            {
              type: 'text/plain',
              value: formData.get('body') || '',
            },
          ],
        })
      })

      if (!sendRequest.ok) {
        throw new Error('failed to send email')  
      }

      redirectUrl.pathname = '/thank-you.html'
      return Response.redirect(redirectUrl)
    } else {
      redirectUrl.pathname = '/oops.html'

      return Response.redirect(redirectUrl)
    }
  } catch (error) {
    redirectUrl.pathname = '/oops.html'
    return Response.redirect(redirectUrl)
  }
}