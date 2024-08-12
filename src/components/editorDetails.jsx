import React, { useState }from 'react';
import './editorDetails.css';

const EditorDetails = ({ summary }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={'editor-details'}>
      <p className={'container'} onClick={toggleDetails} style={{cursor: 'pointer'}}>
        {showDetails ? `${summary}` : 'Editor Details'}
      </p>
    </div>
  );
};

export default EditorDetails;