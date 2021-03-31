import { ObservableProvider } from "react-providerx";
import { from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export const errorProvider$ = ObservableProvider.autoDispose((ref) => {
    const fetchErrorApi = async () => {
        // const response = await fetch('http://errortrial.com/')
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const json = await response.json()
        return json
    }
    return from(fetchErrorApi()).pipe(
        catchError((error: Error) => {
            console.log('there was an error in fetching the api')
            ref.maintainState = false
            return throwError(error)
        }),
    )
})
