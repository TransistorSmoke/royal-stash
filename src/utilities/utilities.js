export const formatDate = (date) => {
	if (!date) return '';

	const formattedDate = date.toDate().toLocaleString('en-EU', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	return formattedDate;
};
