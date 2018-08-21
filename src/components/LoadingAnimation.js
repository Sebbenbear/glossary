import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';

const LoadingAnimation = (classes) =>
  <div>
    <div className={classes.block}></div>
      <CircularProgress 
        className={classes.progress} 
        style={{ color: grey[800] }} 
        thickness={7} 
      />
  </div>

export default LoadingAnimation;
