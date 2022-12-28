import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'js-cookie';
import type { SyntheticEvent } from 'react';

export default function Page() {
	const [data, setData] = useState(null);
	const [createTask, setCreateTask] = useState('');
	const [buttonDisable, setButtonDisable] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch('http://localhost:8000/api/v1/task/read')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, []);

	function handleCreate(e: SyntheticEvent) {
		e.preventDefault();
		setButtonDisable(true);

		const csrftoken = Cookies.get('csrftoken');

		if (!csrftoken) {
			return;
		}

		fetch('http://localhost:8000/api/v1/task/create', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({ text: createTask }),
		})
			.then((res) => res.json())
			.then((data) => {
				setCreateTask('');
				setButtonDisable(false);
				setMessage(data['message']);

				fetch('http://localhost:8000/api/v1/task/read')
					.then((res) => res.json())
					.then((data) => {
						setData(data);
					});
			});
	}

	function displayItems() {
		if (!data || !data['data']) {
			return;
		}

		const list: [] = data['data'];
		const items = list.map((item, index) => {
			return (
				<li className="p-2" key={index}>
					<Link href={'/' + item['id']}>{item['text']}</Link>
				</li>
			);
		});

		return <ul>{items}</ul>;
	}

	return (
		<>
			<Head>
				<title>Todo App</title>
			</Head>
			<h1 className="p-2 text-2xl">Todo App</h1>
			<h2 className="p-2 text-xl">Create Task:</h2>
			<form className="p-2" onSubmit={handleCreate}>
				<input
					className="p-2"
					value={createTask}
					onChange={(e) => {
						setCreateTask(e.target.value);
					}}
					type="text"
					placeholder="Take the dog on a walk."
				/>
				<button className="p-2" disabled={buttonDisable}>
					Create
				</button>
			</form>
			<p className="p-2 text-red-500">{message}</p>
			<h2 className="p-2 text-xl">Tasks:</h2>
			{displayItems()}
		</>
	);
}
