import React from "react";

const EsoBot = () => {
  return (
    <div 
      onClick={() => window.open("https://ai-embrace-craft.lovable.app/", "_blank")}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 99999,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#ff4d88',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        border: '2px solid white'
      }}
    >
      ❤️
    </div>
  );
};

export default EsoBot;