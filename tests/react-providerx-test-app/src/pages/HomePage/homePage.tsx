import { refresh, useProvider } from 'react-providerx'
import { signOut } from '../../services/auth'
import { documentFamilyProvider$ } from '../../shared/family'
import { userDataProvider$ } from '../../shared/userData'
import { errorProvider$ } from '../../shared/error'
import { userDataCombineProvider, userIdProvider } from '../../shared/combine'

const SubComponent: React.FC = () => {
  const { isLoading, data, error } = useProvider(errorProvider$)
  if (isLoading) {
    return (
      <div className="App">
        Loading data...
        {data === null ? 'null' : 'no error, got data'}
      </div>
    )
  }
  if (error !== null) {
    return <div>Something went wrong...</div>
  }
  return <div>{JSON.stringify(data)}</div>
}

const FamilyTester: React.FC = () => {
  const { isLoading, data, error } = useProvider(
    documentFamilyProvider$.pass('ICvuiU7397D9BjgrrYcq')
  )
  if (isLoading) {
    return <div className="App">Loading data...</div>
  }
  if (error) {
    return <div>Something went wrong...</div>
  }
  return <div>{JSON.stringify(data)}</div>
}

const CombineTester: React.FC = () => {
  const { isLoading, data, error } = useProvider(userDataCombineProvider)
  if (isLoading) return <div> Loading... </div>
  if (error) return <div> Something went wrong... </div>

  return (
    <div>
      {JSON.stringify(data)}
      <button onClick={() => refresh(userIdProvider)}>Click to refresh</button>
    </div>
  )
}

export const HomePage: React.FC = () => {
  const { isLoading, data: userData, error } = useProvider(userDataProvider$)
  if (isLoading) {
    console.log('loading inside component...')
    console.log(userData)
    return <div className="App">Loading...</div>
  }
  if (error) {
    console.log(error)
    return <div>Something went wrong...</div>
  }
  return (
    <div className="App">
      {JSON.stringify(userData)}
      <div className="col">
        <button onClick={() => refresh(userDataProvider$)}>
          Click to Refresh User Data
        </button>
        <button onClick={signOut}>Click to Sign Out</button>
      </div>
      SubComponent:
      <SubComponent />
      FamilyTester:
      <FamilyTester />
      CombineTester:
      <CombineTester />
    </div>
  )
}
