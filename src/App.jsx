import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Layout from './Layouts/layout';
import AddEdit from './components/AddEdit';
import UserLists from './components/UserLists';
import Modal from './components/modal';
import './styles/modal.css';
import './styles/header.css';
import './styles/card.css';
import './styles/form.css';
import './styles/cards.css';
import './styles/main.css';

const baseUrl = 'https://users-crud-api-81io.onrender.com/api/v1';

function App() {
	const [users, setUsers, loading] = useFetch();
	const [isOpen, setIsOpen] = useState(false);
	const [currentChild, setCurrentChild] = useState(null);

	useEffect(() => {
		readUsers();
	}, []);

	const createUsers = (dataForm) => {
		setUsers({
			url: `${baseUrl}/users`,
			method: 'POST',
			body: dataForm,
		});
		setIsOpen(false);
	};

	const readUsers = () => {
		setUsers({ url: `${baseUrl}/users` });
	};

	const updateUser = (dataForm, userId) => {
		setUsers({
			url: `${baseUrl}/users/${userId}`,
			method: 'PATCH',
			body: dataForm,
		});
		setIsOpen(false);
	};

	const deleteUser = (userId) => {
		setUsers({
			url: `${baseUrl}/users/${userId}`,
			method: 'DELETE',
		});
	};

	const openAdd = () => {
		setIsOpen(true);
		setCurrentChild(<AddEdit onSave={createUsers} />);
	};

	const openEdit = (user) => {
		setIsOpen(true);
		setCurrentChild(<AddEdit user={user} onSave={updateUser} />);
	};

	return (
		<Layout>
			<header className="header">
				<div className="header__container">
					<h1 className="header__title">Usuarios</h1>
					<button className="header__button" type="button" onClick={openAdd}>
						+ Agregar Usuario
					</button>
				</div>
			</header>

			<main className="container">
				{loading ? (
					<h2>Cargando...</h2>
				) : (
					<UserLists
						users={users}
						openEdit={openEdit}
						deleteUser={deleteUser}
					/>
				)}
			</main>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				{currentChild}
			</Modal>
		</Layout>
	);
}

export default App;
