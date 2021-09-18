import React, { Component, Fragment } from 'react'
import { Container, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { loadArtist } from '../actions/artistActions';

import Releases from './Releases';

const formatUrls = urls => urls.map(u => (
  <div className="sm-links">
    { u.includes('facebook') ? <a className="sm-link" href={u} target="_blank"><i className="fab fa-facebook-f"></i></a> : null }
    { u.includes('twitter') ? <a className="sm-link" href={u} target="_blank"><i className="fab fa-twitter"></i></a> : null }
    { u.includes('instagram') ? <a className="sm-link" href={u} target="_blank"><i className="fab fa-instagram"></i></a> : null }
    { u.includes('soundcloud') ? <a className="sm-link" href={u} target="_blank"><i className="fab fa-soundcloud"></i></a> : null }
    { u.includes('youtube') ? <a className="sm-link" href={u} target="_blank"><i className="fab fa-youtube"></i></a> : null }
    { u.includes('bandcamp') ? <a className="sm-link" href={u} target="_blank"><i className="fab fa-bandcamp"></i></a> : null }
  </div>
))

class Artist extends Component {
  componentDidMount = async () => {
    const { id } = this.props.match.params;

    this.setState({ isLoading: true });

    this.props.loadArtist(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { artist, isLoading } = this.props.artist;

    if (isLoading) {
      return (<Spinner size="lg" className="spinner" />)
    }

    return (
      <Fragment>
        <Container>
          { artist ? (
            <main>
              <div className="row">
                <div className="col-md-6 m-auto">
                  <div className="profile">
                    <img src={artist.images[0].uri} alt="" className="artist-img" />
                    <h2 className="text-center mt-4">{artist.name}</h2>
                  </div>
                </div>
              </div>
              <article>
                <p className="text-center">{artist.profile}</p>
                <div className="links text-center">
                  <h4><a href={artist.urls[0]} target="_blank">Official Website</a></h4>
                  <div className="d-flex justify-content-center mt-4">
                    {formatUrls(artist.urls)}
                  </div>
                </div>
                { artist.members.length > 1 ? (
                  <Fragment>
                    <div className="members-list">
                      <h4>Members</h4>
                      <ul className="list-inline">
                        { artist.members.map(m => m.active ? (
                          <li className="list-inline-item">{m.name}</li>
                        ) : null) }
                      </ul>
                    </div>
                    { artist.members.find(m => m.active === false) ? (
                      <div className="members-list">
                        <h4>Previous Members</h4>
                        <ul className="list-inline">
                          { artist.members.map(m => !m.active ? (
                            <li className="list-inline-item">{m.name}</li>
                          ) : null) }
                        </ul>
                      </div>
                    ) : null }
                  </Fragment>
                ) : null }
              </article>
              <Releases id={id} />
            </main>
          ) : null }
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  artist: state.artist,
});

export default connect(mapStateToProps, { loadArtist })(Artist);
