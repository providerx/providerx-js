import { ObservableProviderFamily } from "react-providerx";
import { doc } from "rxfire/firestore";
import { map } from "rxjs/operators";
import { db } from "../utils/firebase";

export const documentFamilyProvider$ = ObservableProviderFamily.autoDispose((ref, docId: string) => {
    ref.maintainState = false
    return doc(db.collection('documents').doc(docId)).pipe(
        map(ds => ds.data()),
    )
})
