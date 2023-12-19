import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
        prompt: 'select_account'
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch .commit();
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    
    //     .reduce((acc, docSnapshot) => {
    //     const { title ,items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // },{})
 
    // return categoryMap;
}


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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () =>  await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback )