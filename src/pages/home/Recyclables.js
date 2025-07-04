import { useState, useRef } from 'react';
import styles from './Recyclables.module.css';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';

export default function Recyclable({ items }) {
	const { deleteDocument, response } = useFirestore('recyclables');
	const [hoveredRowId, setHoveredRowId] = useState(null);
	const formatDate = (date) => {
		if (!date) return '';

		const formattedDate = date.toLocaleString('en-EU', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

		return formattedDate;
	};

	const handleDeleteItem = (id) => {
		console.log('Deleting item with ID:', id);
	};

	return (
		<div className={styles['table-component']}>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Added On</th>
					</tr>
				</thead>
				<tbody>
					{items?.map((item) => {
						return (
							<tr
								className={`${styles.default} ${hoveredRowId === item.id ? styles.hovered : ''}`}
								key={item.id}
								onMouseEnter={() => setHoveredRowId(item.id)}
								onMouseLeave={() => setHoveredRowId(null)}
							>
								<td>{item.name}</td>
								<td>{item.type}</td>
								<td>
									<div className={styles['date-container']}>
										{formatDate(item?.createdAt?.toDate())}
										{hoveredRowId === item.id && (
											<button
												className={styles['btn-delete']}
												onClick={() => handleDeleteItem(item.id)}
											>
												X
											</button>
										)}
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
