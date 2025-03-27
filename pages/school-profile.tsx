import React, { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import FilterBar from '../components/FilterBar';
import Bot from '../components/Bot';
import UKMap from '../components/UKMap';
import styles from '../styles/SchoolProfile.module.css';

const SchoolProfile = () => {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <>
      <AnimatedBackground />

      {/* Toggle Filters */}
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

      {/* Grid with 2 maps in first 2 panes */}
      <div className={styles.container}>
        {[...Array(9)].map((_, index) => (
          <div key={index} className={styles.pane}>
            <h3>Pane {index + 1}</h3>

            {(index === 0 || index === 1) && (
              <div className={styles.ukMapContainer}>
                <UKMap />
              </div>
            )}
          </div>
        ))}
      </div>

      <Bot />
    </>
  );
};

export default SchoolProfile;
