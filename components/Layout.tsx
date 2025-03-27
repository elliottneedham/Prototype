import React, { useState } from 'react';
import Lsidebar from './Lsidebar';
import Tsidebar from './Tbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);

  return (
    <>
<Tsidebar toggleLeft={() => setShowLeftSidebar(prev => !prev)} showLeft={showLeftSidebar} />
<Lsidebar isOpen={showLeftSidebar} />
      <main
        style={{
          marginTop: '10px',
          marginLeft: showLeftSidebar ? '200px' : '0',
          padding: '1rem',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
