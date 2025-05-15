import React, { useState, useEffect, Suspense } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import FilterBar from '../components/FilterBar';
import dynamic from 'next/dynamic';
import Bot from '../components/Bot';
import styles from '../styles/SchoolProfile.module.css';
import { fetchNorData } from "@/lib/nor/fetchNoRData";

// Dynamic imports
const UKMap = dynamic(() => import('../components/UKMap'), { ssr: false });
const NoRChart = dynamic(() => import('../components/Schoollevelprofile/NoRChart'), {
  ssr: false,
  loading: () => <div>Loading NoRChart...</div>,
});

const SENChart = dynamic(() => import('../components/Schoollevelprofile/SENChart'), {
  ssr: false,
  loading: () => <div>Loading SENChart...</div>,
});
import { fetchSENData } from "@/lib/sen/fetchSENData";


const titles = [
  '2023/24 Pupil Home Location',
  'SEN Pupils by Primary Need',
  'Historic/Projected NoR',
  'Exclusions/Suspensions',
  'Pupil Cohort by Ethnicity',
  'Mainstream PA Capacity',
  'Ownership Boundaries',
  'Internal/External Area Summary',
  'Blockage/Construction Type',
  'Potential Capital Funding',
  'Historic School Revenue Reserves',
];

const SchoolProfile = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [fabricData, setFabricData] = useState<any[]>([]);
  const [senData, setSenData] = useState<any[]>([]);


  useEffect(() => {
  fetchNorData()
    .then(setFabricData)
    .catch((err) => {
      console.error("Error fetching NoR CSV data:", err);
      setFabricData([]);
    });

  fetchSENData()
    .then(setSenData)
    .catch((err) => {
      console.error("Error fetching SEN CSV data:", err);
      setSenData([]);
    });
}, []);



  return (
    <>
      <AnimatedBackground />

      <div style={{ paddingTop: '60px', paddingLeft: '1rem', background: 'transparent' }}>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          style={{
            background: '#444',
            color: '#fff',
            border: '1px solid #000000',
            padding: '6px 12px',
            borderRadius: '6px',
            marginBottom: showFilters ? '0.5rem' : 0,
            cursor: 'pointer',
          }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && <FilterBar />}

      <div className={styles.container}>
        {[...Array(11)].map((_, index) => (
          <div key={index} className={styles.pane}>
            <h3 className="text-xl font-semibold mb-2">{titles[index]}</h3>

            {index === 2 && (
  <Suspense fallback={<div>Loading NoRChart...</div>}>
    <NoRChart data={fabricData} />
  </Suspense>
)}

{index === 1 && (
  <Suspense fallback={<div>Loading SENChart...</div>}>
    <SENChart data={senData} />
  </Suspense>
)}


          </div>
        ))}
      </div>

      <Bot />
    </>
  );
};

export default SchoolProfile;