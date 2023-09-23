import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    sigInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGZmL3ixrmMn3QA3-F6sqdbAZNfqhz6sU",
    authDomain: "crwn-clothing-db-5cc94.firebaseapp.com",
    projectId: "crwn-clothing-db-5cc94",
    storageBucket: "crwn-clothing-db-5cc94.appspot.com",
    messagingSenderId: "1050108046559",
    appId: "1:1050108046559:web:b30c2027d912bcf49c8d6a"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
        prompt: 'select_account'
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  


export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {displayName: ''}
    ) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    //  response ko console logged lote pee object htl ka uid ko pyan use dar

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())
    // userSnapshot so dar google ka use kai tae syntex, doc ya pee mha getDoc use loh ya mal
    // snapshot ka data dway shi m shi kyi pay dar and it also allows us to access the data

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.messsage);
        }
    }
    return userDocRef;
};

// getDoc allows us to get the doc, setDoc allows us to set the doc 



export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};