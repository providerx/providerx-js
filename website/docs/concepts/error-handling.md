---
title: Error Handling
---

For more information about `ObservableProvider`, [read this](/docs/)

## Error Handling
By default, ProviderX will find errors which occur in our `Observable` and send them to our consumers
in our frontend UI

However...

In many situations we may want to handle errors and run code based on them
Let's use the following example:

```typescript
import { from } from 'rxjs'
import { catchError } from 'rxjs/operators'

const provider = ObservableProvider.autoDispose(() => {
  const fetchUser = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1'
    )
    const json = await response.json()
    return json
  }
  const observable = from(fetchUser()).pipe(
      catchError((error: any) => {
            ref.maintainState = false
            return ref.error(error)
      }),
  )
  return observable
})
```
Points to Note:
- We catch the error using `catchError`
- We set `ref.maintainState` to `false` because we do not want the state of the provider to be kept
even after it has no listeners and we want the provider value to be recomputed once again
- We return `ref.error(error)` which tells ProviderX we have an error

:::danger Return your errors!

```typescript
catchError((error: any) => {
    ref.maintainState = false
    return ref.error(error)
}),
```

***If*** you use `catchError`, make sure to return `ref.error(error)` otherwise
ProviderX will not know that an error has been received.

:::
