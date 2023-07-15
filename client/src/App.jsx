import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

function App() {
	const [customer_data, setCustomerData] = useState([]);

	useEffect(() => {
		axios.get('http://127.0.0.1:8000//api/read').then((res) => {
			setCustomerData(res.data);
		});
	}, []);

	return <div className='appContainer'>{JSON.stringify(customer_data)}</div>;
}

export default App;
