import { Metadata } from "next";
import { SITE_TITLE } from "../../lib/constants";
import Container from "../_components/container";
import Link from "next/link";

const partners = [
  {
    name: "Aurora-kuoro",
    url: "http://www.aurorakoren.fi/",
    description: "Sekakuoro Aurora on turkulainen kuoro, joka perustettiin vuonna 1998."
  },
  {
    name: "Kamarikuoro Melos",
    url: "http://www.melos.fi/",
    description: "Kamarikuoro Melos on turkulainen sekakuoro, joka on perustettu vuonna 1978."
  },
  {
    name: "Sekakuoro Kulkuset",
    url: "http://www.kulkuset.net/",
    description: "Sekakuoro Kulkuset on turkulainen sekakuoro, joka on perustettu vuonna 1946."
  },
  {
    name: "Turun Karjala-Seura ry",
    url: "http://www.karjalanliitto.fi/turunkarjalaseura",
    description: "Turun Karjala-Seura ry on perustettu vuonna 1940 karjalaisen kulttuurin vaalimiseksi."
  }
];

export default function PartnersPage() {
  return (
    <main>
      <Container>
        <article className="lg:my-32 md:my-16 my-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
            Yhteistyökumppanit
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-12">
              Turun Karjalakuoro tekee yhteistyötä monien kuorojen ja yhdistysten kanssa. 
              Tässä tärkeimmät yhteistyökumppanimme:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    <Link 
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      {partner.name}
                    </Link>
                  </h2>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const title = `Yhteistyökumppanit | ${SITE_TITLE}`;

  return {
    title,
    openGraph: {
      title,
    }
  };
}
