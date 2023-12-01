import React, { useEffect, useState } from 'react';
import { getFusekiDatasets } from '../Utils/FusekiAPI';
import { MainContext } from '../MainContext';

function DefineMappings() {
  const [datasets, setDatasets] = useState([]);
  const [error, setError] = useState('');
  const { userName } = useState(MainContext);

  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        console.log('API Response:', response);
        setDatasets(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        setError('Failed to load datasets');
      });
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }
  return (
    <div>
      <h1>
        Welcome Mapping Administrator
        {' '}
        { userName }
      </h1>
      <h1>
        Please select the database you would like to access:
      </h1>
      <h1>Fuseki Datasets</h1>
      {datasets.map((dataset, index) => (
        <div key={index}>
          <h2>
            Dataset Name:
            {dataset}
          </h2>
        </div>
      ))}
    </div>
  );
}
//   return (
//     <div>
//       <h1>Fuseki Datasets</h1>
//       {datasets.map((dataset, index) => (
//         <div key={index}>
//           <h2>Dataset Name: {dataset["ds.name"]}</h2>
//           <p>Status: {dataset["ds.state"] ? 'Active' : 'Inactive'}</p>
//           <h3>Services:</h3>
//           <ul>
//             {dataset["ds.services"].map((service, serviceIndex) => (
//               <li key={serviceIndex}>
//                 <strong>{service["srv.description"]}</strong>
//                 <ul>
//                   {service["srv.endpoints"].map((endpoint, endpointIndex) => (
//                     <li key={endpointIndex}>{endpoint}</li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

export default DefineMappings;
