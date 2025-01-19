import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">Sivua ei löytynyt</h2>
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800 underline text-lg"
      >
        Takaisin etusivulle
      </Link>
    </div>
  )
}