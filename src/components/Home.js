import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LoadingAnimation from './LoadingAnimation';

import Terms from './Terms';

import { Link } from "react-router-dom";
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { database } from '../firebase/firebase';

import withAuthorization from './Session/withAuthorization';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
  },
  block: {
    marginTop: '100px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
});

const AddTermFab = (props) => 
  <Link to={{pathname: routes.ENTER_TERM, state: props.term}}>
    <Button variant="fab" color="primary" aria-label="Add" className={props.classes.fab}>
      <AddIcon />
    </Button>
  </Link>

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.handleDelete = this.handleDelete.bind(this);
  };

  handleDelete(term) {
    let userPath = '/user-terms/' + auth.getUid();
    database.ref(userPath).child(term.termId).remove();
    const newData = this.state.data.filter(userTerm => {
      return userTerm.termId !== term.termId;
    })
    this.setState({
      data: newData // y render function no being called. data is props so should rerender in Terms.
    });
  }

  componentWillMount() {
    let termsRef = database.ref('/user-terms/' + auth.getUid());
    termsRef.once('value', (snapshot) => {
      const userTerms = snapshot.val();
      const terms = [];

      if (userTerms) {
        for (const key of Object.keys(userTerms)) {
          let term = userTerms[key];
          terms.push({
            termId: key,
            term: term.term,
            acronym: term.acronym,
            definition: term.definition,
            tags: term.tags
          });
        }
      }

      this.setState({
        isLoading: false,
        data: terms.sort((userTermA, userTermB) => {
          return userTermA.term.toLowerCase() > userTermB.term.toLowerCase();
        })
      });
    });
  }

  render() {
    const { classes } = this.props;
    const isLoading = this.state.isLoading;
    const data = this.state.data;

    if (isLoading) {
      return (
        <LoadingAnimation classes={classes}/>
      );
    }

    return (
      <div className="App">
        { data.length == 0 && 
        <p className="App-intro">
            There's nothing here, add a term!
        </p>
        }

        { data && data.length > 0 && <Terms data={data} handleDelete={this.handleDelete}/> }

        <AddTermFab classes={classes} term=''/>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const authCondition = (authUser) => !!authUser;

// export default compose(
//   withAuthorization(authCondition),
//   withStyles(styles)
// )(Home)

export default withAuthorization(authCondition)(withStyles(styles)(Home));
