import db from 'firebase';

export const doCreateUser = (id, username, email) => {
    db.ref(`users/${id}`).set({
        username,
        email
    });
}

export const onceGetUsers = () => {
    db.ref('users').once('value')
}

// pass in the user id
// export const getUserTerms = (uid) => {
//     let userTerms = [];
//     db.ref('/user-terms/' + uid).on('value', (snapshot) => {
//         snapshot.forEach((childSnapShot) => {
//         userTerms.push(childSnapShot.val());
//         });
//         return userTerms;
//     })
// }
