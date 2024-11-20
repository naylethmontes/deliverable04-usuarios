import { TfiGift } from 'react-icons/tfi';
import { SlPencil } from 'react-icons/sl';
import { BsTrash } from 'react-icons/bs';

function UserCard({ user, openEdit, deleteUser }) {
	const birthday = new Date(user?.birthday).toLocaleDateString();
	return (
		<div className="card">
			<h3 className="card__name">
				{user?.first_name} {user?.last_name}
			</h3>
			<div className="card__info">
				<div>
					<span className="card__label">Correo</span>
					{user?.email}
				</div>
				<div>
					<span className="card__label">Cumpleaños</span>
					<span className="card__data">
						<TfiGift className="icon--gift" /> {birthday}
					</span>
				</div>
			</div>
			<div className="card__btns">
				<button
					className="btn btn--delete"
					onClick={() => deleteUser(user?.id)}
				>
					<BsTrash />
				</button>
				<button className="btn btn--edit" onClick={() => openEdit(user)}>
					<SlPencil />
				</button>
			</div>
		</div>
	);
}

export default UserCard;
