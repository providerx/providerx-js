import { ObservableProvider } from 'react-providerx'
import { from, of } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'

export const userIdProvider = new ObservableProvider(() => {
  const randomNumber = Math.floor(Math.random() * 10) + 1
  return of(randomNumber)
})

export const userDataCombineProvider = new ObservableProvider((ref) => {
  const fetchUserById = async (id: number) => {
    // const response = await fetch('http://errortrial.com/')
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    const json = await response.json()
    return json
  }
  return userIdProvider.observable.pipe(
    catchError((error) => {
      console.log('Got error in userDataCombineProvider: ')
      console.log(error)
      return ref.error(error)
    }),
    switchMap((id) => {
      return from(fetchUserById(id as number))
    })
  )
})
