export interface Lead {
	product: string
	plan: 'std' | 'pro'
	payment: 'once' | 'rent'
	name: string
	phone: string
	company: string
	message: string
	lang: string
}

const mock = import.meta.env.VITE_MOCK === 'true'
const endpoint = (
	(import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api'
).replace(/\/$/, '')

const makeId = (): string => {
	const n = crypto.getRandomValues(new Uint32Array(1))[0] % 10000
	return `ALJ-${new Date().getFullYear()}-${String(n).padStart(4, '0')}`
}

export async function submitLead(lead: Lead): Promise<{ id: string }> {
	if (mock) {
		await new Promise(r => setTimeout(r, 700))
		return { id: makeId() }
	}
	const res = await fetch(`${endpoint}/leads`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(lead),
		credentials: 'omit',
	})
	if (!res.ok) throw new Error('send_failed')
	const data = (await res.json()) as { id?: unknown }
	return { id: typeof data.id === 'string' ? data.id.slice(0, 40) : makeId() }
}
