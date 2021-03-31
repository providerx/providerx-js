---
title: Providers
---

Now that we have installed ProviderX, let's talk about "providers".

Providers allow to you to define and store state, and listen to the state from within your react application

## Declaring a Provider
You can define a provider as a global variable like so:

```typescript
import { of } from 'rxjs'
const provider = new ObservableProvider(() => {
    return of('value')
})
```

There are 4 important things to note here:
- We are defining an `ObservableProvider`. This is the base provider class. There are multiple others providers.
- All providers take in a function which return an `Observable`
- All providers must return an RxJS `Observable` which is being done with `of` from `rxjs`
- Observables can be of any type - `string`, `number`, `Promise`, etc.

## What about Asynchronous Operations?
Many times you will need to perform asynchronous I/O in your application

Here is how you would define a provider which contains an `Observable<Promise>`
```typescript
import { from } from 'rxjs'

const provider = new ObservableProvider(() => {
  const fetchUser = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1'
    )
    const json = await response.json()
    return json
  }
  const observable = from(fetchUser())
  return observable
})
```
- Here we are creating an asynchronous function to fetch an api result. This returns a `Promise`
- We are then using the RxJS `from` function to convert that `Promise` to an `Observable`
- We then return the observable
