import type { Lang } from '@/types'

export const detailDict: Record<Lang, Record<string, string>> = {
	ru: {
		'nav.home': 'Главная',
		'pd.plans': 'Тарифы',
		'pd.features': 'Возможности системы',
		'pd.benefits': 'Чем это поможет вашему бизнесу',
		'pd.audience': 'Кому подходит',
		'pd.duration': 'Сроки разработки',
		'pd.durationNote':
			'Срок ориентировочный. Точный срок определяется после технического задания.',
		'pd.warranty': 'Гарантия',
		'pd.warrantyText':
			'14–30 дней бесплатной технической поддержки после запуска по официальному договору.',
		'pd.payment': 'Порядок оплаты',
		'pd.payText':
			'Поэтапно по договору: обычно 30–50% предоплата за первый этап, остальное по приёмке этапов.',
		'pd.other': 'Другие решения',
	},
	en: {
		'nav.home': 'Home',
		'pd.plans': 'Plans',
		'pd.features': 'System features',
		'pd.benefits': 'How it helps your business',
		'pd.audience': 'Who it is for',
		'pd.duration': 'Development time',
		'pd.durationNote':
			'The timeline is approximate. The exact term is set after the technical specification.',
		'pd.warranty': 'Warranty',
		'pd.warrantyText':
			'14–30 days of free technical support after launch under the official contract.',
		'pd.payment': 'Payment',
		'pd.payText':
			'Staged under the contract: usually 30–50% upfront for the first stage, the rest on acceptance of each stage.',
		'pd.other': 'Other solutions',
	},
	uz: {
		'nav.home': 'Bosh sahifa',
		'pd.plans': 'Tariflar',
		'pd.features': 'Tizim qulayliklari',
		'pd.benefits': 'Biznesingizga qanday yordam beradi',
		'pd.audience': 'Kimlar uchun mos',
		'pd.duration': 'Ishlab chiqish muddati',
		'pd.durationNote':
			'Muddat taxminiy. Aniq muddat texnik topshiriqdan keyin belgilanadi.',
		'pd.warranty': 'Kafolat',
		'pd.warrantyText':
			'Rasmiy shartnoma asosida ishga tushirilgandan so‘ng 14–30 kun bepul texnik ko‘mak.',
		'pd.payment': 'To‘lov tartibi',
		'pd.payText':
			'Shartnoma bo‘yicha bosqichma-bosqich: odatda birinchi bosqich uchun 30–50% oldindan, qolgani bosqichlar qabul qilinishi bilan.',
		'pd.other': 'Boshqa yechimlar',
	},
}
