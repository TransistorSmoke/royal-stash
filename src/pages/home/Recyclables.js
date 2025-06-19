import styles from './Recyclables.module.css';

export default function Recyclable({ items }) {
	const formatDate = (date) => {
		if (!date) return '';

		const formattedDate = date.toLocaleString('en-EU', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

		return formattedDate;
	};

	return (
		<div className={styles['table-component']}>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Registered At</th>
					</tr>
					{items?.map((item) => {
						return (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td>{item.type}</td>
								<td>{formatDate(item?.createdAt?.toDate())}</td>
							</tr>
						);
					})}
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
