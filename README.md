## React-ProviderX
A React state management library built on top of RxJS and Observables

## Usage:
The library will cache data within your ObservableProvider, so you can grab values from a provider with the `useProvider`
hook - without re-fetching data.
```tsx
import React from 'react'
import { useProvider, ObservableProvider, refresh } from 'react-providerx'
import { from } from 'rxjs'
import { tap } from 'rxjs/operators'

export const userResponseProvider$ = ObservableProvider.autoDispose((ref) => {
    const fetchErrorApi = async () => {
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


const Component: React.FC = () => {
    const { isLoading, data, error } = useProvider(userResponseProvider$)
    if(isLoading) {
        return (
            <div>
                Waiting For Data...
            </div>
        )
    }
    return (
        <div>
            {data}
            <button onClick={() => refresh(userResponseProvider$)}>Click to refresh</button>
        </div>
    )
}
```
## Supporters
[![Stargazers repo roster for @DudeBro249/providerx](https://reporoster.com/stars/DudeBro249/providerx)](https://github.com/DudeBro249/providerx/stargazers)

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
