import Link from "next/link";
import { getAllPerformances } from "@/lib/api";

export async function Footer() {
  const allPerformances = getAllPerformances();
  const now = new Date();
  
  // Get upcoming performances, sorted by date
  const upcomingPerformances = allPerformances
    .filter((performance) => new Date(performance.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Show only next 3 performances

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Kuoron toiminta */}
          <div>
            <h3 className="text-red-500 font-bold mb-4">Kuoron toiminta</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/esiintymiset" className="hover:text-gray-300">
                  Esiintymiset
                </Link>
              </li>
              <li>
                <Link href="/liity" className="hover:text-gray-300">
                  Liity mukaan
                </Link>
              </li>
              <li>
                <Link href="/yhteystiedot" className="hover:text-gray-300">
                  Yhteystiedot
                </Link>
              </li>
              <li>
                <Link href="/yhteistyokumppanit" className="hover:text-gray-300">
                  Yhteistyökumppanit
                </Link>
              </li>
            </ul>
          </div>

          {/* Seuraavat esiintymiset */}
          <div>
            <h3 className="text-red-500 font-bold mb-4">Seuraavat esiintymiset</h3>
            <ul className="space-y-2">
              {upcomingPerformances.length > 0 ? (
                upcomingPerformances.map((performance) => (
                  <li key={performance.slug}>
                    <Link
                      href={`/esiintymiset/${performance.slug}`}
                      className="hover:text-gray-300"
                    >
                      {performance.name} - {new Date(performance.date).toLocaleDateString('fi-FI')}
                    </Link>
                  </li>
                ))
              ) : (
                <li>Ei tulevia esiintymisiä tällä hetkellä</li>
              )}
            </ul>
          </div>

          {/* TKK muualla verkossa */}
          <div>
            <h3 className="text-red-500 font-bold mb-4">
              TKK muualla verkossa
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.facebook.com/groups/123579054360322/"
                  className="hover:text-gray-300"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/channel/UCZ_QpM8dDwx88PmP3PPooZQ"
                  className="hover:text-gray-300"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>

          {/* Yhteistyökumppanit */}
          <div>
            <h3 className="text-red-500 font-bold mb-4">Yhteistyökumppanit</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="http://www.aurorakoren.fi/"
                  className="hover:text-gray-300"
                >
                  Aurorakören
                </Link>
              </li>
              <li>
                <Link
                  href="http://www.melos.fi/"
                  className="hover:text-gray-300"
                >
                  Kamarikuoro Melos
                </Link>
              </li>
              <li>
                <Link
                  href="http://www.kulkuset.net/"
                  className="hover:text-gray-300"
                >
                  Sekakuoro Kulkuset
                </Link>
              </li>
              <li>
                <Link
                  href="http://www.karjalanliitto.fi/turunkarjalaseura"
                  className="hover:text-gray-300"
                >
                  Turun Karjala-Seura ry
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
