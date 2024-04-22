import React, { useState }from 'react';
import './editorDetails.css';

const EditorDetails = ({ summary, details }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
  
    return (
      <div className={'editor-details'}>
        <p className={'container'} onClick={toggleDetails} style={{cursor: 'pointer'}}>
          {showDetails ? 'close' : summary}
        </p>
        
        {showDetails && (
          <div className="container details">
            {details}
          </div>
        )}
      </div>
    );
};


export default EditorDetails;
