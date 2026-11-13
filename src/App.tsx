import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/app/HomePage'
import ComingSoon from '@/app/ComingSoon'
import ProductsPage from '@/app/ProductsPage'
import ApplyPage from '@/app/ApplyPage'
import ContactPage from '@/app/ContactPage'
import AboutPage from '@/app/AboutPage'

const router = createBrowserRouter(
	[
		{
			element: <Layout />,
			children: [
				{ path: '/', element: <HomePage /> },
				{ path: '/products', element: <ProductsPage /> },
				{ path: '/solutions', element: <ProductsPage /> },
				{ path: '/apply', element: <ApplyPage /> },
				{ path: '/contact', element: <ContactPage /> },
				{ path: '/about', element: <AboutPage /> },
				{ path: '*', element: <ComingSoon /> },
			],
		},
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true,
		},
	},
)

export default function App() {
	return (
		<RouterProvider router={router} future={{ v7_startTransition: true }} />
	)
}
