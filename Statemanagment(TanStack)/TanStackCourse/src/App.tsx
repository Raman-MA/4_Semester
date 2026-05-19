import { useQuery } from '@tanstack/react-query'
import './App.css'

type ModuleItem = {
  id: number
  name: string
  focus: string
}

const loadModules = async (): Promise<ModuleItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 450))

  return [
    { id: 1, name: 'Query cache', focus: 'server state' },
    { id: 2, name: 'Optimistic updates', focus: 'mutation flow' },
    { id: 3, name: 'Derived UI state', focus: 'render logic' },
  ]
}

function App() {
  const { data, isPending, isFetching, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['course-modules'],
    queryFn: loadModules,
  })

  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">TanStack Query</p>
        <h1 className="title">Your app is now wrapped in QueryClientProvider.</h1>
        <p className="subtitle">
          This screen proves the provider is working by loading a small async query,
          showing cache state, and letting you refetch on demand.
        </p>

        <div className="grid">
          <article className="card">
            <p className="card-label">Query state</p>
            <p className="card-value">
              {isPending ? 'Loading...' : error ? 'Error' : 'Ready'}
            </p>
          </article>

          <article className="card">
            <p className="card-label">Cache activity</p>
            <p className="card-value">{isFetching ? 'Refreshing' : 'Idle'}</p>
          </article>

          <article className="card">
            <p className="card-label">Modules loaded</p>
            <p className="card-value">{data?.length ?? 0}</p>
          </article>
        </div>

        <div className="card" style={{ marginTop: '18px' }}>
          <p className="card-label">Current course modules</p>
          {data ? (
            <ul className="list">
              {data.map((module) => (
                <li key={module.id}>
                  {module.name} - {module.focus}
                </li>
              ))}
            </ul>
          ) : (
            <p className="card-value" style={{ fontSize: '1rem', fontWeight: 500 }}>
              {error ? 'Something went wrong while loading the data.' : 'Waiting for the first fetch...'}
            </p>
          )}
        </div>

        <div className="actions">
          <button className="button button-primary" onClick={() => refetch()} type="button">
            Refetch modules
          </button>
          <button className="button button-secondary" onClick={() => refetch()} type="button">
            Re-run query
          </button>
        </div>

        <p className="status">
          Last successful update:{' '}
          {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'not yet loaded'}
        </p>
      </section>
    </main>
  )
}

export default App
