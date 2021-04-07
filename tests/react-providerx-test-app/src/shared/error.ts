import { ObservableProvider } from 'react-providerx'
import { from } from 'rxjs'
import { catchError } from 'rxjs/operators'

export const errorProvider$ = ObservableProvider.autoDispose((ref) => {
  const fetchErrorApi = async () => {
    // const response = await fetch('http://errortrial.com/')
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const json = await response.json()
    return json
  }
  return from(fetchErrorApi()).pipe(
    catchError((error: Error) => {
      ref.maintainState = false
      return ref.error(error)
    })
  )
})
