
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

  if (request.headers.get('Content-Type') !== 'application/x-www-form-urlencoded') {
    return Response.redirect('/oops.html')
  }

  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const subject = formData.get('subject')

    if (isEmail(email) && subject) {
      new Request('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'X-Api-Key': context.env.MAILCHANNELS_API,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ to: 'thomas@takeup.dev', name: 'Thomas David' }],
            },
          ],
          from: {
            email: 'thomas@takeup.dev',
            name: 'TakeUpDev Booking',
          },
          subject: subject,
          content: [
            {
              type: 'text/plain',
              value: formData.get('body') || '',
            },
          ],
        }),
      })

      return Response.redirect('/thank-you.html')
    } else {
      return Response.redirect('/oops.html', 400)
    }
  } catch (error) {
    return Response.redirect('/oops.html', 500)
  }
}