import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ArtistResults extends Component {
  render() {
    const { results } = this.props;
    return (
      <Table>
        <tbody>
          { results ?
            results.map(r => (
              <tr>
                <td className="align-middle"><img src={r.thumb} /></td>
                <td className="align-middle"><a href={`/artists/${r.id}`}>{r.title}</a></td>
              </tr>
            )) 
          : null }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  results: state.searchArtists.results,
});

export default connect(mapStateToProps)(ArtistResults);
