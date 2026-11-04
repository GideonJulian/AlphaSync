import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader.jsx'

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-8">
      <PageHeader
        title="Page not found"
        description="The page you are looking for does not exist."
        actions={
          <Link
            to="/"
            className="rounded-lg bg-alpha-navy px-4 py-2 text-sm font-medium text-alpha-white transition hover:bg-alpha-navy/90"
          >
            Go home
          </Link>
        }
      />
    </main>
  )
}

export default NotFoundPage
