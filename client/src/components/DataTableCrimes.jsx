import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

function DataTableCrimes(crimeprops) {
	const tableFinalData = [];

	const navigate = useNavigate();

	const columns = [
		{
			name: 'StateName',
			selector: row => row.stateName,
		},
		{
			name: 'Year',
			selector: row => row.year,
			sortable: true,
		},
		{
			name: 'Total Crimes',
			selector: row => row.total,
			sortable: true,
		}
	];

	useEffect(() => {},[
		crimeprops?.crimes?.forEach((value) => {
			if (value?.['MAPKEY']) {
				tableFinalData?.push({
					stateName: value?.StateName,
					year: value?.Year,
					total: Number(value?.['AOM'] + value?.['AOW'] + value?.['DD'] + value?.['DV'] + value?.['KA'] + value?.['Rape'] + value?.['WT']),
					mapKey: value?.['MAPKEY'],
				});
			}
		}
		)	
	]);
		
	const onRowClicked = (row, event) => { 
		window.location.href = '/states/'+row?.mapKey;
	};



	return (
		<>
		<DataTable
			columns={columns}
			data={tableFinalData}
			responsive={true}
			fixedHeader= {true}
			fixedHeaderScrollHeight={'500px'}
			onRowClicked={onRowClicked}
			pointerOnHover={true}
		/></>
	);
};

export default DataTableCrimes;