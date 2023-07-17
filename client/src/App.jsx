import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

function App() {
	const color = 'rgba(255, 255, 255, 0.87)';
	const [customer_data, setCustomerData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [email, setEmail] = useState('');
	// const [emailError, setEmailError] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		const res = await axios.get('https://rdjango.vercel.app/api/read');
		setCustomerData(res.data);
		// console.log(res.data);
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	};

	// const validateEmail = (email) => {
	// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	// 	return emailRegex.test(email);
	// };

	const handleChange = async (e) => {
		const { name, value } = e.target;
		if (name === 'first_name') {
			setFirstName(value);
		} else if (name === 'last_name') {
			setLastName(value);
		} else if (name === 'zipcode') {
			setZipcode(value);
		} else if (name === 'email') {
			setEmail(value);
			setEmailError('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if (!validateEmail(email)) {
		// 	setEmailError('Please enter a valid email address');
		// 	return;
		// }
		try {
			await axios.post('https://rdjango.vercel.app/api/add', {
				first_name: firstName,
				last_name: lastName,
				zipcode: zipcode,
				email: email,
			});
			e.target.first_name.value = '';
			e.target.last_name.value = '';
			e.target.zipcode.value = '';
			e.target.email.value = '';
			fetchData();
			setEmailError('');
		} catch (err) {
			console.log(err);
		}
	};

	const [editingId, setEditingId] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const [editedFirstName, setEditedFirstName] = useState('');
	const [editedLastName, setEditedLastName] = useState('');
	const [editedZipcode, setEditedZipcode] = useState('');
	const [editedEmail, setEditedEmail] = useState('');

	const handleEditChange = async (e) => {
		const { name, value } = e.target;
		if (name === 'first_name') {
			setEditedFirstName(value);
		} else if (name === 'last_name') {
			setEditedLastName(value);
		} else if (name === 'zipcode') {
			setEditedZipcode(value);
		} else if (name === 'email') {
			setEditedEmail(value);
		}
	};

	const handleEditClick = async (
		id,
		first_name,
		last_name,
		zipcode,
		email
	) => {
		setEditedFirstName(first_name);
		setEditedLastName(last_name);
		setEditedZipcode(zipcode);
		setEditedEmail(email);
		setEditingId(id);
	};

	const handleEditSubmit = async (
		id,
		editedFirstName,
		editedLastName,
		editedZipcode,
		editedEmail
	) => {
		await handleEdit(
			id,
			editedFirstName,
			editedLastName,
			editedZipcode,
			editedEmail
		);
		setEditingId(null);
	};

	const handleEdit = async (
		id,
		editedFirstName,
		editedLastName,
		editedZipcode,
		editedEmail
	) => {
		// if (!validateEmail(email)) {
		// 	setEmailError('Please enter a valid email address');
		// 	return;
		// }
		try {
			setIsEditing(true);
			await axios.put(`https://rdjango.vercel.app/api/update/${id}`, {
				first_name: editedFirstName,
				last_name: editedLastName,
				zipcode: editedZipcode,
				email: editedEmail,
			});
			fetchData();
			setIsEditing(false);
			// setEmailError('');
			// console.log(
			// 	`Edited Data: ${editedFirstName}, ${editedLastName}, ${editedZipcode}, ${editedEmail}`
			// );
		} catch (err) {
			setIsEditing(false);
			console.log(err);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`https://rdjango.vercel.app/api/delete/${id}`);
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='app-container'>
			<div className='compose'>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='first_name'
						placeholder='First name'
						value={firstName}
						className='composer'
						onChange={handleChange}
						required
					/>
					<input
						type='text'
						name='last_name'
						placeholder='Last name'
						value={lastName}
						className='composer'
						onChange={handleChange}
						required
					/>
					<input
						type='text'
						name='zipcode'
						placeholder='Zipcode'
						value={zipcode}
						className='composer'
						onChange={handleChange}
						required
					/>
					<input
						type='email'
						name='email'
						placeholder='Email'
						value={email}
						className='composer'
						onChange={handleChange}
						pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
						required
					/>

					<button type='submit'>Submit</button>
				</form>
				{/* {emailError && alert(emailError)} */}
			</div>

			<div className='customer-list'>
				{isLoading ? (
					<SyncLoader
						className='loader-main'
						color={color}
						loading={isLoading}
						// cssOverride={override}
						size={3}
						margin={0}
					/>
				) : (
					<div className='list-items'>
						{customer_data.map((customer, index) => {
							return (
								<div className='list-item' key={index}>
									{editingId === customer.id ? (
										<>
											<div className='data editing'>
												<input
													type='text'
													name='first_name'
													value={editedFirstName}
													className='composer'
													onChange={handleEditChange}
												/>
												<input
													type='text'
													name='last_name'
													value={editedLastName}
													className='composer'
													onChange={handleEditChange}
												/>
												<input
													type='text'
													name='zipcode'
													value={editedZipcode}
													className='composer'
													onChange={handleEditChange}
												/>
												<input
													type='email'
													name='email'
													value={editedEmail}
													className='composer'
													onChange={handleEditChange}
													pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
												/>
												<div className='btn'>
													<button
														className='save'
														onClick={() =>
															handleEditSubmit(
																customer.id,
																editedFirstName,
																editedLastName,
																editedZipcode,
																editedEmail
															)
														}>
														Save
													</button>
													<button
														className='discard'
														onClick={() => {
															setEditingId(null);
															fetchData();
														}}>
														Discard
													</button>
												</div>
											</div>
										</>
									) : (
										<>
											<div className='data'>
												<div className='index item'>
													{index + 1}
												</div>
												<div className='name item'>
													{customer.first_name}{' '}
													{customer.last_name}
												</div>
												<div className='zipcode item'>
													{customer.zipcode}
												</div>
												<div className='email item'>
													{customer.email}
												</div>

												<div className='btn'>
													<button
														className='edit'
														onClick={() =>
															handleEditClick(
																customer.id,
																customer.first_name,
																customer.last_name,
																customer.zipcode,
																customer.email
															)
														}>
														Edit
													</button>
													<button
														className='delete'
														onClick={() =>
															handleDelete(
																customer.id
															)
														}>
														Delete
													</button>
												</div>
											</div>
										</>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
