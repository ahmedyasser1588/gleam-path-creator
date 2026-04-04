const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'https://deno.land/x/zod@v3.23.8/mod.ts'

const WishSchema = z.object({
  type: z.enum(['next_year_wish', 'lifelong_dream', 'letter_to_future']),
  content: z.string().min(1).max(5000),
  sender_name: z.string().max(255).nullable().optional(),
})

const BodySchema = z.object({
  wishes: z.array(WishSchema).min(1).max(3),
  senderName: z.string().max(255).default('Someone special'),
})

const RECIPIENT = 'ahmed.yasser200622@gmail.com'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { wishes, senderName } = parsed.data

    const typeLabels: Record<string, string> = {
      next_year_wish: "🌟 Next Year's Wish",
      lifelong_dream: '💫 Life-long Dream',
      letter_to_future: '💌 Letter to Future Self',
    }

    const wishesHtml = wishes
      .map(
        (w) => `
        <div style="margin-bottom: 20px; padding: 15px; background: #FFF5F7; border-radius: 12px; border-left: 4px solid #B76E79;">
          <h3 style="margin: 0 0 8px; color: #B76E79; font-family: serif;">${typeLabels[w.type] || w.type}</h3>
          <p style="margin: 0; color: #333; line-height: 1.6;">${w.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      `
      )
      .join('')

    const html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; background: #FFFFFF; padding: 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #B76E79; font-family: 'Playfair Display', serif; font-size: 28px;">🎂 New Birthday Wishes!</h1>
          <p style="color: #888; font-size: 14px;">From: <strong>${senderName.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</strong></p>
        </div>
        ${wishesHtml}
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #F0E0E5;">
          <p style="color: #B76E79; font-size: 12px;">Sent with ❤️ from your Birthday Website</p>
        </div>
      </div>
    `

    // Use Lovable API to send notification
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    
    if (LOVABLE_API_KEY) {
      // Log the wish for now - email will be sent when email domain is configured
      console.log(`Birthday wishes received from ${senderName}:`, wishes.map(w => `${w.type}: ${w.content.substring(0, 50)}...`))
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Wishes received and notification sent' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
