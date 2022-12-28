import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import type { SyntheticEvent } from 'react';

export default function Page() {
	const router = useRouter();
	const { id } = router.query;

	const [data, setData] = useState(null);
	const [updateTask, setUpdateTask] = useState('');
	const [buttonDisable, setButtonDisable] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (!id) return;
		fetch('http://localhost:8000/api/v1/task/read/' + id)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, [id]);

	function handleUpdate(e: SyntheticEvent) {
		e.preventDefault();
		setButtonDisable(true);

		const csrftoken = Cookies.get('csrftoken');

		if (!csrftoken) {
			return;
		}

		fetch('http://localhost:8000/api/v1/task/update', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({ id: id, text: updateTask }),
		})
			.then((res) => res.json())
			.then((data) => {
				setUpdateTask('');
				setButtonDisable(false);
				setMessage(data['message']);

				fetch('http://localhost:8000/api/v1/task/read/' + id)
					.then((res) => res.json())
					.then((data) => {
						setData(data);
					});
			});
	}

	function handleDelete(e: SyntheticEvent) {
		e.preventDefault();
		setButtonDisable(true);

		const csrftoken = Cookies.get('csrftoken');

		if (!csrftoken) {
			return;
		}

		fetch('http://localhost:8000/api/v1/task/delete', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({ id: id }),
		}).then(() => {
			router.push('/');
		});
	}

	if (!data || !data['data']) {
		return;
	}

	return (
		<>
			<Head>
				<title>Todo App</title>
			</Head>
			<h1 className="p-2 text-2xl">Todo App</h1>
			<h2 className="p-2 text-xl">Task:</h2>
			<p className="p-2">{data['data']}</p>
			<h2 className="p-2 text-xl">Update Task:</h2>
			<form className="p-2" onSubmit={handleUpdate}>
				<input
					className="p-2"
					value={updateTask}
					onChange={(e) => {
						setUpdateTask(e.target.value);
					}}
					type="text"
					placeholder="Take the dog on a walk."
				/>
				<button className="p-2" disabled={buttonDisable}>
					Update
				</button>
			</form>
			<p className="p-2 text-red-500">{message}</p>
			<h2 className="p-2 text-xl">Delete Task:</h2>
			<div className="p-2">
				<button className="text-red-500" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</>
	);
}
