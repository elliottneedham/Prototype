// components/Lsidebar.tsx
import React from 'react';
import Link from 'next/link';

interface LsidebarProps {
  isOpen: boolean;
}

const Lsidebar: React.FC<LsidebarProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <aside
      style={{
        width: '200px',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#000000',
        color: '#fff',
        padding: '1rem',
        position: 'fixed',
        top: '60px',
        left: 0,
        zIndex: 100,
      }}
    >
      <h3>Dashboards</h3>
      <ul>
        <li>
         <Link href="/school-profile">School Level Profile</Link>
        </li>
        <li>Dashboard 2</li>
        <li>Dashboard 3</li>
        <li>Dashboard 4</li>
        <li>Dashboard 5</li>
        <li>Dashboard 6</li>
       
      </ul>
    </aside>
  );
};

export default Lsidebar;
