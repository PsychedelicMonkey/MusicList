import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap'; 
import axios from 'axios';

class Releases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      releases: [{
        id: '',
        thumb: '',
        title: '',
        type: '',
        year: '',
      }],
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;

    try {
      const res = await axios.get(`/api/artists/${id}/releases`);
      this.setState({ releases: res.data.releases });
    } catch (err) {
      console.log(err);
    }
  }
  
  render() {
    const { releases } = this.state;

    return (
      <div className="releases mt-4">
        <Table striped responsive>
          <tbody>
            { releases.map(r => r.type === 'master' ? (
              <tr>
                <td className="align-middle"><img src={r.thumb} className="release-img" /></td>
                <td className="align-middle">
                  <h4 className="release-title">
                    <Link to={`/albums/${r.id}`}>{r.title}</Link>
                  </h4>
                </td>
                <td className="align-middle">{r.year}</td>
              </tr>
            ) : null) }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Releases;
