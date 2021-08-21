import React, { Component } from 'react'
import { Spinner, Table } from 'reactstrap';
import { connect } from 'react-redux';

class ArtistResults extends Component {
  render() {
    const { results, isLoading } = this.props.search;
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
          : isLoading ? <Spinner /> : null }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  search: state.searchArtists,
});

export default connect(mapStateToProps)(ArtistResults);
