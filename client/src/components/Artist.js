import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Releases from './Releases';

const formatUrls = urls => urls.map(u => (
  <div className="sm-links">
    { u.includes('facebook') ? <a className="sm-link" href={u}><i className="fab fa-facebook-f"></i></a> : null }
    { u.includes('twitter') ? <a className="sm-link" href={u}><i className="fab fa-twitter"></i></a> : null }
    { u.includes('instagram') ? <a className="sm-link" href={u}><i className="fab fa-instagram"></i></a> : null }
    { u.includes('soundcloud') ? <a className="sm-link" href={u}><i className="fab fa-soundcloud"></i></a> : null }
    { u.includes('youtube') ? <a className="sm-link" href={u}><i className="fab fa-youtube"></i></a> : null }
  </div>
))

class Artist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      images: [{
        type: '',
        height: '',
        width: '',
        uri: '',
      }],
      members: [{
        active: '',
        id: '',
        name: '',
      }],
      name: '',
      profile: '',
      urls: [],
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;

    try {
      const res = await axios.get(`/api/artists/${id}`);
      this.setState({ ...res.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { images, name, profile, members, urls } = this.state;

    return (
      <main>
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="profile">
              <img src={images[0].uri} alt="" className="artist-img" />
              <h2 className="text-center mt-4">{name}</h2>
            </div>
          </div>
        </div>
        <article>
          <p className="text-center">{profile}</p>
          <div className="links text-center">
            <h4><a href={urls[0]}>Official Website</a></h4>
            <div className="d-flex justify-content-center mt-4">
              {formatUrls(urls)}
            </div>
          </div>
          { members.length > 1 ? (
            <Fragment>
              <h4>Members</h4>
              <ul>
                { members.map(m => m.active ? (
                  <li>{m.name}</li>
                ) : null) }
              </ul>
            </Fragment>
          ) : null }
        </article>
        <Releases id={id} />
      </main>
    );
  }
}

export default Artist;
