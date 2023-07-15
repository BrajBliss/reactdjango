import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

function App() {
	useEffect(() => {
		let customer_data = axios.get('https://rdjango.vercel.app/api/read');
		console.log(customer_data);
	}, []);

	return <div className='appContainer'>App.jsx</div>;
}

export default App;
