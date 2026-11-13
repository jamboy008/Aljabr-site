import type { VercelRequest, VercelResponse } from '@vercel/node'
import { randomInt } from 'node:crypto'

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

const PRODUCTS: Record<string, string> = {
	crm: 'ALJABR CRM',
	erp: 'ALJABR ERP',
	shop: 'Internet-do‘kon',
	web: 'Korporativ saytlar',
	mobile: 'Mobil ilovalar',
	bot: 'Telegram botlar',
	mini: 'Telegram Mini App',
	ai: 'AI agent va Chatbot',
}

// Oddiy IP bo'yicha chegara (serverless'da xotira instansiyaga bog'liq; jiddiy yuklama uchun Upstash/Vercel KV ishlating)
const hits = new Map<string, number[]>()
const limited = (ip: string): boolean => {
	const now = Date.now()
	const list = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000)
	if (list.length >= 5) {
		hits.set(ip, list)
		return true
	}
	list.push(now)
	hits.set(ip, list)
	return false
}

const clean = (v: unknown, max: number): string =>
	typeof v === 'string'
		? v
				.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
				.trim()
				.slice(0, max)
		: ''
const esc = (s: string): string =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default async function handler(req: VercelRequest, res: VercelResponse) {
	res.setHeader('Cache-Control', 'no-store')
	if (req.method !== 'POST')
		return res.status(405).json({ error: 'method_not_allowed' })

	const origin = req.headers.origin
	if (origin && new URL(origin).host !== req.headers.host)
		return res.status(403).json({ error: 'forbidden' })

	const ip = String(req.headers['x-forwarded-for'] ?? 'unknown')
		.split(',')[0]
		.trim()
	if (limited(ip)) return res.status(429).json({ error: 'too_many_requests' })

	if (!TOKEN || !CHAT_ID)
		return res.status(500).json({ error: 'server_misconfigured' })

	const b = (req.body ?? {}) as Record<string, unknown>
	const name = clean(b.name, 80)
	const phone = clean(b.phone, 24)
	const product = clean(b.product, 20)
	const plan = b.plan === 'pro' ? 'pro' : 'std'
	const payment = b.payment === 'rent' ? 'rent' : 'once'

	if (
		name.length < 2 ||
		!/^\+?[0-9\s()-]{9,18}$/.test(phone) ||
		!PRODUCTS[product]
	) {
		return res.status(400).json({ error: 'invalid_input' })
	}

	const id = `ALJ-${new Date().getFullYear()}-${String(randomInt(0, 10000)).padStart(4, '0')}`
	const text = [
		`🆕 <b>Yangi ariza ${id}</b>`,
		`👤 ${esc(name)}`,
		`📞 ${esc(phone)}`,
		`🏢 ${esc(clean(b.company, 120)) || '—'}`,
		`📦 ${esc(PRODUCTS[product])} — ${plan === 'pro' ? 'Pro' : 'Standart'}`,
		`💳 ${payment === 'rent' ? 'Oylik ijara' : 'Bir martalik xarid'}`,
		`🌐 Til: ${esc(clean(b.lang, 4))}`,
		`💬 ${esc(clean(b.message, 1500)) || '—'}`,
	].join('\n')

	try {
		const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: CHAT_ID,
				text,
				parse_mode: 'HTML',
				disable_web_page_preview: true,
			}),
			signal: AbortSignal.timeout(8000),
		})
		if (!r.ok) return res.status(502).json({ error: 'upstream_failed' })
	} catch {
		return res.status(502).json({ error: 'upstream_failed' })
	}
	return res.status(200).json({ id })
}
