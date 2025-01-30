import Link from "next/link";
import { getAllPerformances, getContentBySlug } from "@/lib/api";

export async function Footer() {
  const allPerformances = getAllPerformances();
  const footerContent = getContentBySlug("footer");
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
                  Liity kuoroon
                </Link>
              </li>
              <li>
                <Link href="/tilaa-keikka" className="hover:text-gray-300">
                  Tilaa keikka
                </Link>
              </li>
              <li>
                <Link href="/juhlavuosi-2025" className="hover:text-gray-300">
                  Juhlavuosi 2025
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
              {footerContent.socialMedia.map((social: any, index: any) => (
                <li key={index}>
                  <Link
                    href={social.url}
                    className="hover:text-gray-300"
                  >
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yhteistyökumppanit */}
          <div>
            <h3 className="text-red-500 font-bold mb-4">Yhteistyökumppanit</h3>
            <ul className="space-y-2">
              {footerContent.partners.map((partner: any, index: any) => (
                <li key={index}>
                  <Link
                    href={partner.url}
                    target="_blank"
                    className="hover:text-gray-300"
                  >
                    {partner.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
