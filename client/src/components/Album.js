import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Spinner, Table } from 'reactstrap';
import axios from 'axios';

const videoUri = video => { return video.split('=')[1]; }

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,

      artistID: '',
      artists: [{
        name: '',
        id: '',
      }],
      genres: [],
      images: [{
        uri: '',
        width: '',
        height: '',
      }],
      styles: [],
      tracklist: [{
        position: '',
        title: '',
        duration: '',
        type_: '',
      }],
      videos: [{
        uri: '',
        description: '',
        duration: '',
        title: '',
      }]
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });

    try {
      const res = await axios.get(`/api/albums/master/${id}`);
      this.setState({ ...res.data, ...res.data.artists, artistID: res.data.artists[0].id, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { artists, genres, images, styles, title, tracklist, videos, year, isLoading } = this.state;

    if (isLoading) {
      return (<Spinner size="lg" className="spinner" />)
    }

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
