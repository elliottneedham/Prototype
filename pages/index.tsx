import React, { useState } from 'react';
import DroneIntro from '../components/DroneIntro';

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <DroneIntro onFinish={() => setShowIntro(false)} />}
      
      <div style={{ padding: '2rem', color: 'black' }}>
        <h1 className="text-2xl font-bold mb-4">Welcome to Optimise</h1>
        <p className="mb-4">This is the homepage.</p>
      </div>
    </>
  );
};

export default Home;