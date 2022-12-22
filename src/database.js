import { initializeApp} from 'firebase/app';
import { getDatabase, ref, set, get, child  } from "firebase/database";
import { resolvePath } from 'react-router';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "supergrain-c9516.firebaseapp.com",
    projectId: "supergrain-c9516",
    storageBucket: "supergrain-c9516.appspot.com",
    messagingSenderId: "1078295429139",
    appId: "1:1078295429139:web:4ae0391a6597b6e03f3fe6",
    measurementId: "G-0TF0NWT4W3",
    databaseUrl: "https://supergrain-c9516-default-rtdb.firebaseio.com/"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function writeWorkFlowData(workflowId, flow) {
    set(ref(db, 'workflows/' + workflowId), {
        flow: flow
    });
}

export async function readWorkFlowData(workflowId) {
    const dbRef = ref(db);
    var snapshot = await get(child(dbRef, `workflows/${workflowId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            return snapshot.val();
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
    });
    return snapshot
}

export function createTableEntry(workflowId, entryName, workflowColor) {
    set(ref(db, 'entry/' + workflowId), {
        entryName: entryName,
        workflowId: workflowId,
        workflowColor: workflowColor
    });
}

export function deleteTableEntry(workflowId) {
    // var adaRef = ref(db, 'entry/' + workflowId);
    // adaRef.remove()
    // .then(function() {
    //     console.log("Remove succeeded.")
    // })
    // .catch(function(error) {
    //     console.log("Remove failed: " + error.message)
    // });
    set(ref(db, 'entry/' + workflowId), {
        entryName: null,
        workflowId: null,
        workflowColor: null
    });
}

export async function readTableEntries() {
    const dbRef = ref(db);
    var snapshot = await get(child(dbRef, `entry/`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val();
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
    });
    return snapshot
}


