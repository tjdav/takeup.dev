
import { MailtrapClient } from 'mailtrap'
import isEmail from 'validator/es/lib/isEmail'

const sender = {
  email: "hello@demomailtrap.com",
  name: "Booking",
}
const recipients = [
  {
    email: "thomas@takeup.dev",
  }
]

/**
 * @import {EventContext} from '@cloudflare/workers-types'
 */

/**
 * @typedef {Object} env
 * @property {string} MAILTRAP_API
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
      const body = formData.get('body') || ''
      const client = new MailtrapClient({ token: context.env.MAILTRAP_API });

      await client.send({
        from: sender,
        to: recipients,
        subject,
        text: `from: ${email} - ${body}`
      })

      return Response.redirect('/thank-you.html')
    } else {
      return Response.redirect('/oops.html', 400)
    }
  } catch (error) {
    return Response.redirect('/oops.html', 500)
  }
}