export const formatDate = (date) => {
	if (!date) return '';

	const formattedDate = date.toDate().toLocaleString('en-EU', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	return formattedDate;
};

export const generateUniqueId = () => {
	const id = Math.random().toString(36).substring(2, 12);
	return id;
};

export const deleteToastSettings = {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: false,
	progress: 0,
	theme: 'light'
};
