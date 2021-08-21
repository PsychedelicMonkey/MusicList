import React, { Component, Fragment } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux';

import AlbumsResults from './AlbumsResults'
import ArtistResults from './ArtistResults';

class Results extends Component {
  render() {
    const { results } = this.props.search;
    return (
      <Container>
        <main>
          { results ? 
            <Fragment>
              <div className="row">
                <div className="col-md-8">
                  <h1>Albums</h1>
                  <AlbumsResults />
                </div>
                <div className="col-md-4">
                  <h1>Artists</h1>
                  <ArtistResults />
                </div>
              </div>
            </Fragment>
          : <Fragment>
              <h2 className="text-center my-3">Welcome to MusicList</h2>
              <p className="text-center">To get started, click the "Search" button in the navbar and search for any of your favorite albums.</p>
            </Fragment> 
          }
        </main>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(Results);
