import React, { useEffect, useState } from "react";
import Layout from "./Layout";

export default function PensionPage() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch("/data/pension.json")
      .then((res) => res.json())
      .then((data) => setSchemes(data.schemes));
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pension Schemes</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {schemes.map((scheme, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{scheme.title}</h2>
              <p className="text-sm text-gray-600">{scheme.description}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
