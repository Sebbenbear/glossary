import React from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Terms from './Terms';

import { Link } from "react-router-dom";
import * as routes from '../constants/routes';

const data = [];

const Home = () => (
  <div className="App">
    { data.length === 0 && <p className="App-intro">
        There's nothing here, add a term!
    </p>
    }
    { data.length > 0 && <Terms data={data}/> }

    <Link to={routes.ENTER_TERM}>
    <Button variant="fab" color="primary" aria-label="Add" style={{ position: 'absolute', bottom: "20px", right: "20px" }}> {/* #C1D09B - should be this colour*/} 
        <AddIcon />
    </Button>
    </Link>
  </div>
);

export default Home;