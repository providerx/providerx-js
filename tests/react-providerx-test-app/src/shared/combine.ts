import { ObservableProvider } from 'react-providerx/lib'
import { from, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

const userIdProvider = new ObservableProvider(() => of('10'))

export const userDataCombineProvider = new ObservableProvider(() => {
    const fetchUserById = async (id: string) => {
        // const response = await fetch('http://errortrial.com/')
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const json = await response.json()
        return json
    }
    return userIdProvider.observable.pipe(
        switchMap(id => {
            return from(fetchUserById(id))
        })
    )
})
