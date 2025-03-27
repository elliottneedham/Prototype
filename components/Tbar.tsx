import Link from 'next/link';
import React from 'react';

interface TsidebarProps {
  toggleLeft: () => void;
  showLeft: boolean;
}

const Tsidebar: React.FC<TsidebarProps> = ({ toggleLeft, showLeft }) => {
  return (
    <nav
      style={{
        height: '80px',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/" legacyBehavior>
          <a
            style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            Optimise
          </a>
        </Link>

        <button
          onClick={toggleLeft}
          style={{
            background: '#444',
            color: '#fff',
            border: 'none',
            padding: '6px 10px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          {showLeft ? 'Hide Dashboards' : 'Show Dashboards'}
        </button>
      </div>
    </nav>
  );
};

export default Tsidebar;