import { ObservableProviderFamily } from "react-providerx";
import { doc } from "rxfire/firestore";
import { map } from "rxjs/operators";
import { db } from "../utils/firebase";

export const documentFamilyProvider$ = ObservableProviderFamily.autoDispose((_ref, docId: string) => {
    return doc(db.collection('documents').doc(docId)).pipe(
        map(ds => ds.data()),
    )
})
