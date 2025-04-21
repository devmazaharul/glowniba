import React from 'react';
import Spiner from './components/others/Spiner';

const Loading = () => {
  return (
    <div>
        <div className="h-screen flex items-center justify-center">
              <Spiner color='#000'/>
            </div>
    </div>
  );
}

export default Loading;
