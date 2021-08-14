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
          <Container>
            <main>
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
            </main>
          </Container>
        : isLoading ? <Spinner className="spinner" /> 
        : <Container>
          <main>
            <h2 className="text-center my-3">Welcome to MusicList</h2>
            <p className="text-center">To get started, click the "Search" button in the navbar and search for any of your favorite albums.</p>
          </main>
        </Container> }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(Results);
