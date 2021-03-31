---
title: Combining Providers
---
For more information about `ObservableProvider`, [read this](/docs/)

## Combining Providers
In many situations, we may want to read the state of one provider within another.
Let's use the following example:
```typescript
import { of } from 'rxjs'
const userIdProvider = new ObservableProvider(() => of('10'))
```

We can now create another provider which is able to read our `userIdProvider`

```typescript
import { from, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
const userDataCombineProvider = new ObservableProvider(() => {
    const fetchUserById = async (id: string) => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        )
        const json = await response.json()
        return json
    }
    return userIdProvider.observable.pipe(
        switchMap(id => {
            return from(fetchUserById(id))
        })
    )
})
```
