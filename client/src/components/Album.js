import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Container, Spinner, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { loadAlbum } from '../actions/albumActions';

const videoUri = video => { return video.split('=')[1]; }

class Album extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    
    this.props.loadAlbum(id);
  }

  render() {
    const { artists, genres, images, styles, title, tracklist, videos, year, isLoading } = this.props.album;

    if (isLoading) {
      return (<Spinner size="lg" className="spinner" />)
    }

    return (
      <Fragment>
        <Container>
          <main>
            <div className="row my-4 mx-2">
              <div className="col-lg-4">
                <img src={images[0].uri} className="album-img" />
              </div>
              <div className="col-lg-8">
                <h2>{title}</h2>
                <h4>
                  <Link to={`/artists/${artists[0].id}`}>{artists[0].name}</Link>
                </h4>
                <h5>{year}</h5>
                <p>{genres.join(', ')}</p>
                <p>{styles.join(', ')}</p>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-sm-12">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Track Number</th>
                      <th>Title</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    { tracklist.map(t => t.type_ === 'track' ? (
                      <tr>
                        <td>{t.position}</td>
                        <td>{t.title}</td>
                        <td>{t.duration}</td>
                      </tr>
                    ) : null) }
                  </tbody>
                </Table>
                <hr></hr>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <h3 className="mb-3">Videos</h3>
                { videos.map(v => (
                  <div className="col-sm-12 col-lg-6">
                    <iframe className="yt-embed" src={`https://www.youtube.com/embed/${videoUri(v.uri)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                )) }
              </div>
            </div>
          </main>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  album: state.album,
});

export default connect(mapStateToProps, { loadAlbum })(Album);
