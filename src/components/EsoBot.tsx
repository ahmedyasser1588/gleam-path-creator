import React from "react";

const EsoBot = () => {
  const handleClick = () => {
    // ده اللينك اللي هيفتح لما إسراء تدوس على الزرار
    window.open("https://ai-embrace-craft.lovable.app/", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 9999,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#ec4899', // لون بينك
        color: 'white',
        border: '2px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      ❤️
    </button>
  );
};

export default EsoBot;