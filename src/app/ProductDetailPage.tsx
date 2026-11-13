import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, Clock, CreditCard, ShieldCheck } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { products, proPrice } from '@/data/products'
import { details } from '@/data/productDetails'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/products/ProductCard'
import { CtaBand } from '@/components/sections/CtaBand'

const crumbLink = 'hover:text-primary dark:hover:text-secondary'
const box =
	'rounded-xl border border-sky-line bg-white p-5 dark:border-night-line dark:bg-night-card'

export default function ProductDetailPage() {
	const { id } = useParams<{ id: string }>()
	const { t, lang, price } = useI18n()
	const p = products.find(x => x.id === id)
	const d = p ? details[p.id]?.[lang] : undefined
	if (!p || !d) return <Navigate to='/products' replace />

	const from = (n: number | null) =>
		n === null
			? price(null)
			: lang === 'uz'
				? `${price(n)} ${t('from')}`
				: `${t('from')} ${price(n)}`
	const others = products.filter(x => x.id !== p.id).slice(0, 4)
	const info = [
		{
			Icon: Clock,
			title: t('pd.duration'),
			text: d.duration,
			note: t('pd.durationNote'),
		},
		{ Icon: ShieldCheck, title: t('pd.warranty'), text: t('pd.warrantyText') },
		{ Icon: CreditCard, title: t('pd.payment'), text: t('pd.payText') },
	]

	return (
		<>
			<section className='mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6'>
				<nav className='text-xs text-slate-500' aria-label='breadcrumb'>
					<Link to='/' className={crumbLink}>
						{t('crumb.home')}
					</Link>
					<span className='mx-2'>/</span>
					<Link to='/products' className={crumbLink}>
						{t('nav.products')}
					</Link>
					<span className='mx-2'>/</span>
					<span className='font-semibold text-primary dark:text-white'>
						{p.name[lang]}
					</span>
				</nav>
				<div className='mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]'>
					<div>
						<span className='rounded bg-secondary/15 px-2 py-0.5 text-[11px] font-semibold text-secondary-700 dark:text-secondary'>
							{t(`status.${p.status}`)}
						</span>
						<h1 className='mt-4 text-3xl font-bold tracking-tight text-primary-950 dark:text-white sm:text-5xl'>
							{p.name[lang]}
						</h1>
						<p className='mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400'>
							{d.lead}
						</p>
						<div className='mt-8 flex flex-wrap gap-3'>
							<Button to={`/apply?product=${p.id}`}>{t('cta.apply')}</Button>
							<Button to='/contact' variant='outline'>
								{t('nav.contact')}
							</Button>
						</div>
					</div>
					<aside className={box}>
						<h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
							{t('pd.plans')}
						</h2>
						<div className='mt-4 space-y-4'>
							<div className='rounded-lg bg-sky-surface p-4 dark:bg-night'>
								<p className='text-xs font-semibold'>{t('pp.col.std')}</p>
								<p className='mt-1 text-xl font-bold text-primary-950 dark:text-white'>
									{from(p.price)}
								</p>
								<p className='mt-1 text-xs text-slate-600 dark:text-slate-400'>
									{t(`f.${p.id}.s`)}
								</p>
							</div>
							<div className='rounded-lg border border-tertiary bg-tertiary-100/40 p-4 dark:bg-night'>
								<p className='text-xs font-semibold'>
									{t('pp.col.pro')}{' '}
									<span className='ml-1 rounded bg-tertiary px-1.5 py-0.5 text-[10px] text-primary-950'>
										PRO
									</span>
								</p>
								<p className='mt-1 text-xl font-bold text-primary-950 dark:text-white'>
									{from(proPrice[p.id])}
								</p>
								<p className='mt-1 text-xs text-slate-600 dark:text-slate-400'>
									{t(`f.${p.id}.p`)}
								</p>
							</div>
						</div>
					</aside>
				</div>
			</section>

			<section className='bg-white dark:bg-night-card'>
				<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6'>
					<h2 className='text-2xl font-bold text-primary-950 dark:text-white sm:text-3xl'>
						{t('pd.features')}
					</h2>
					<ul className='mt-8 grid gap-3 md:grid-cols-2'>
						{d.features.map(f => (
							<li
								key={f}
								className='flex items-start gap-3 rounded-xl border border-sky-line p-4 text-sm dark:border-night-line'
							>
								<span className='mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary-700 dark:text-secondary'>
									<Check size={12} />
								</span>
								{f}
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className='px-4 py-16 sm:px-6'>
				<div className='mx-auto max-w-7xl rounded-2xl bg-primary p-8 text-white dark:bg-night-card dark:ring-1 dark:ring-night-line sm:p-12'>
					<h2 className='text-2xl font-bold sm:text-3xl'>{t('pd.benefits')}</h2>
					<ol className='mt-8 grid gap-6 md:grid-cols-2'>
						{d.benefits.map((b, i) => (
							<li key={b} className='flex gap-4'>
								<span className='grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-primary-950'>
									{i + 1}
								</span>
								<p className='pt-1 text-slate-100'>{b}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className='mx-auto max-w-7xl px-4 pb-16 sm:px-6'>
				<h2 className='text-xl font-bold text-primary-950 dark:text-white'>
					{t('pd.audience')}
				</h2>
				<ul className='mt-4 flex flex-wrap gap-2'>
					{d.audience.map(a => (
						<li
							key={a}
							className='rounded-full border border-sky-line bg-white px-4 py-2 text-sm dark:border-night-line dark:bg-night-card'
						>
							{a}
						</li>
					))}
				</ul>
				<div className='mt-8 grid gap-4 md:grid-cols-3'>
					{info.map(({ Icon, title, text, note }) => (
						<div key={title} className={box}>
							<Icon
								size={20}
								className='text-secondary-700 dark:text-secondary'
							/>
							<h3 className='mt-3 text-sm font-semibold'>{title}</h3>
							<p className='mt-1 text-sm text-slate-600 dark:text-slate-400'>
								{text}
							</p>
							{note && <p className='mt-2 text-xs text-slate-500'>{note}</p>}
						</div>
					))}
				</div>
			</section>

			<section className='bg-sky-surface dark:bg-night'>
				<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6'>
					<h2 className='text-2xl font-bold text-primary-950 dark:text-white'>
						{t('pd.other')}
					</h2>
					<div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						{others.map(o => (
							<ProductCard key={o.id} p={o} />
						))}
					</div>
				</div>
			</section>
			<CtaBand />
		</>
	)
}
