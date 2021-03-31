---
title: Combining Providers
---
For more information about `ObservableProvider`, [read this](/docs/concepts/providers)

## Combining Providers
In many situations, we may want to read the state of one provider within another provider
Let's use the following example:
```typescript
import { of } from 'rxjs'
const userIdProvider = new ObservableProvider(() => of('10'))
```

We can now create another provider which is able to read our `userIdProvider`

```typescript
```
