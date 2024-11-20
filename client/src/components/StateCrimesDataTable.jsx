import DataTable from 'react-data-table-component';
import { useParams } from 'react-router';
import { useEffect,useState } from "react";
import axios from "axios";


function StateCrimesDataTable(crimeprops) {
	const params= useParams()
	const [array, setArray] = useState([]);

	const fetchAPI = async () => {
		const response = await axios.get("http://localhost:8080/getCrimesByState/"+params?.id);
		setArray(Object.values(response.data));
		
	  };
	
	  useEffect(() => {
		fetchAPI();
	  }, []);
	const columns = [
		{
			name: 'Year',
			selector: row => row.Year,
			sortable: true,
		},
		{
			name: 'Assault against women',
			selector: row => row.AOW,
			sortable: true,
		},
		{
			name: 'Assault against modesty of women',
			selector: row => row.AOM,
			sortable: true,
		},
		{
			name: 'Dowry Deaths',
			selector: row => row.DD,
			sortable: true,
		},
		{
			name: 'Domestic violence',
			selector: row => row.DV,
			sortable: true,
		},
		{
			name: 'Kidnap And Assault',
			selector: row => row.KA,
			sortable: true,
		},
		{
			name: 'No. of Rapes',
			selector: row => row.Rape,
			sortable: true,
		},
		{
			name: 'Women Trafficking',
			selector: row => row.WT,
			sortable: true,
		}
	];

	return (
			
		// />
        <>{array?.length > 0 && 
			<>
			<h3>{array?.[0]?.StateName}</h3>
			<DataTable
				columns={columns}
				data={array}
				responsive={true}
				fixedHeader= {true}
				fixedHeaderScrollHeight={'500px'}/>
			</>
		}</>
	);
};

export default StateCrimesDataTable;