React Project #1 - Royal Stash
-------------------------------

[URL](https://royal-stash-590a6.web.app/)

This is what I came up with after learning React's Context API, custom hooks and useReducer.

There is this `return & earn` initiative here in Australia where selected recyclables such as bottles, cans and (milk or juice) box can be returned to specific return points.
10c per item can be refunded. 

I thought of making this app as a way to track my recycling records for these items. No CSS framework is used, so CSS might not be optimised. Though, a certain level of responsiveness is implement to allow the view to `degrade` gracefully at different screen sizes.

THE RECYCLABLES
----------------
- This app allows a user to add one item each to his recyclables collection.
- This collection builds up until it is time to bring everything to the return point for recycling.
- An item can be deleted from the list. Result of delete action is show as a toast message.
- An Amount component calculates and shows the user how much can be earned for that current collection after dropping it for recycling.
- Once the collection is dropped, the list resets and the a new collection is ready to be populated with new recyclable items.

THE STASH
---------
- Every time a user 'drops' the whole recyclable collection to the return point, it gets saved as a `stash`.
- A `stash` shows the collection (stash) ID, the date when the collection is dropped and the total amount refunded for that collection.

-------
BACKEND
-------

- Firebase authentication service to for user signup, login and logout features
- Firestore for storage
- Firestores rules implementation


  



