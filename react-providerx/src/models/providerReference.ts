import { throwError } from "rxjs"

export class ProviderReference {
    executionError?: any
    
    error(error: any) {
        this.executionError = error
        return throwError(error)
    }
}

export class AutoDisposeProviderReference extends ProviderReference {
    maintainState: boolean
    constructor(maintainState?: boolean) {
        super()
        this.maintainState = maintainState ?? true
    }
}
