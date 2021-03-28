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

const userResponseProvider = new ObservableProvider(() => {
    let user$ = from(fetch('https://jsonplaceholder.typicode.com/users/1'))
    user$ = user$.pipe(
        tap(user => {
            console.log('The value of user is: ')
            console.log(user)
        }),
    )
    return user$
})

const Component: React.FC = () => {
    const { isLoading, data } = useProvider(userResponseProvider)
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
            <button onClick={() => refresh(userResponseProvider)} >Click to refresh</button>
        </div>
    )
}
```
