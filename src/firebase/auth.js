import { auth } from 'firebase';

export const signUpAnonymously = () => {
    auth.signUpAnonymously();
}

// TODO: add features for signing up, in and out, and password reset using different auth methods
