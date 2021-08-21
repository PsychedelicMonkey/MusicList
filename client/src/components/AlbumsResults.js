import React, { Component, Fragment } from 'react'
import { Container, Spinner, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const formatTitle = (title, index) => title.split(' - ')[index];

const formatGenre = genre => genre.join(', ');

class Results extends Component {
  render() {
    const { isLoading, results } = this.props.search;

    return (
      <Fragment>
        { results ? 
          <Table striped responsive>
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Genre(s)</th>
              </tr>
            </thead>
            <tbody>
              { results.map(res => (
                <tr>
                  <td className="align-middle"><img src={res.thumb} width="80" height="80" /></td>
                  <td className="align-middle">
                    <Link to={`/albums/${res.id}`}>{formatTitle(res.title, 1)}</Link>
                  </td>
                  <td className="align-middle">{formatTitle(res.title, 0)}</td>
                  <td className="align-middle">{formatGenre(res.genre)}</td>
                </tr>
              )) }
            </tbody>
          </Table>
        : isLoading ? <Spinner className="spinner" /> 
        : null }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(Results);
