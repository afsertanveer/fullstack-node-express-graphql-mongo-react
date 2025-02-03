import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader"></div> // Loader
      ) : (
        <div>
          <h1>Content Loaded!</h1>
        </div>
      )}
    </div>
  );
};

export default Loader;
