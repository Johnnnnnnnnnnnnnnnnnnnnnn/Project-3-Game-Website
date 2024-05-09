import { useQuery } from '@apollo/client'
import ThreadList from '../components/ThreadList'
import ThreadForm from '../components/ThreadForm'
import { QUERY_THREADS } from '../utils/queries'

const Home = () => {
  const { loading, data } = useQuery(QUERY_THREADS)
  const threads = data?.threads || []

  return (
    <main>
      <div className="">
        <div
          className=""
          style={{ border: '1px dotted #1a1a1a', height: '30vh' }}
        >
          <ThreadForm />
        </div>
        <div className="">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThreadList
              threads={threads}
              title="Threads"
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
