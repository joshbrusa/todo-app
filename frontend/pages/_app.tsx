import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		fetch('http://localhost:8000/api/v1/csrf/set', {
			credentials: 'include',
		});
	}, []);

	return (
		<div className="flex flex-col">
			<Component {...pageProps} />
		</div>
	);
}
