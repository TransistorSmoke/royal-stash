import { useState } from 'react';

export default function RecyclableStash({ stash, user }) {
	return (
		<ul>
			{stash?.map((item) => (
				<li key={item?.id}>
					Total Amount: {item?.totalAmt}, returned by: {user}
				</li>
			))}
		</ul>
	);
}
