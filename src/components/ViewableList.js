import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { } from '../redux/actions';

class ViewableList extends Component {
  dummyData = [
    {
      "title": "The Big Lebowski",
      "year": "1998",
      "director": "Joel Coen, Ethan Coen",
      "id": "tt0118715"
    },
    {
      "title": "Playtime",
      "year": "1967",
      "director": "Jacques Tati",
      "id": "tt0062136"
    },
    {
      "title": "Traffic",
      "year": "2000",
      "director": "Steven Soderbergh",
      "id": "tt0181865"
    },
    {
      "title": "A Clockwork Orange",
      "year": "1971",
      "director": "Stanley Kubrick",
      "id": "tt0066921"
    },
    {
      "title": "The Tree of Life",
      "year": "2011",
      "director": "Terrence Malick",
      "id": "tt0478304"
    },
    {
      "title": "Babel",
      "year": "2006",
      "director": "Alejandro G. Iñárritu",
      "id": "tt0449467"
    },
    {
      "title": "Green Room",
      "year": "2015",
      "director": "Jeremy Saulnier",
      "id": "tt4062536"
    },
    {
      "title": "Persona",
      "year": "2005",
      "director": "Russell James Hasenauer, Chad Newhall",
      "id": "tt0445041"
    },
    {
      "title": "Seven Samurai",
      "year": "1954",
      "director": "Akira Kurosawa",
      "id": "tt0047478"
    },
    {
      "title": "Terminator 2: Judgment Day",
      "year": "1991",
      "director": "James Cameron",
      "id": "tt0103064"
    },
    {
      "title": "Fantasia",
      "year": "1993",
      "director": "Jun Kamiya",
      "id": "tt0107013"
    },
    {
      "title": "A History of Violence",
      "year": "2005",
      "director": "David Cronenberg",
      "id": "tt0399146"
    },
    {
      "title": "Rubber",
      "year": "2010",
      "director": "Quentin Dupieux",
      "id": "tt1612774"
    },
    {
      "title": "Troll 2",
      "year": "1990",
      "director": "Claudio Fragasso",
      "id": "tt0105643"
    },
    {
      "title": "The Room",
      "year": "2003",
      "director": "Tommy Wiseau",
      "id": "tt0368226"
    }
  ];

  // componentDidUpdate = (prevProps) => {
  //   console.log('props in viewablelist', prevProps, this.props)
  //   const { username } = this.props.match.params;
  //   console.log('params username in viewablelist', username)
  //   if (prevProps.match.params.username !== username) {
  //     this.props.getListData(username);
  //   }
  // }

  render() {
    const { items } = this.props;

    const ViewableItem = ({ movie, idx }) => (
      <div
        key={ movie._id }
        className="d-flex bg-white justify-content-between"
        style={{ lineHeight: '2rem' }}
      >
        <div className="d-flex overflow-hidden">
          <div
            className="text-right"
            style={{ width: '2.4rem' }}
          >
            { idx + 1 } |&nbsp;
          </div>
          <div
            tltle={`${ movie.title } (${ movie.director }, ${ movie.year })`}
            className="d-inline-block text-truncate"
            style={{ maxWidth: '516px' }}
          >
            <Link
              to={{
                pathname: '/movies',
                state: { movie }
              }}
            >
              { movie.title }&nbsp;
            </Link>
            ({ movie.director }, { movie.year })
          </div>
        </div>
        <div className="align-self-end mr-2">
          {/* <a href={`http://www.imdb.com/title/${movie._id}/`}>
            IMDB
          </a> */}
        </div>
      </div>
    );

    const NoList = () => (
      <div>
        This user hasn't added any movies yet.
      </div>
    );

    return (
      <div>
        {
          !items
          ? this.dummyData.slice(0, 10).map((item, idx) => <ViewableItem movie={item} idx={idx} key={item._id}/>)
          :
          <div>
            {
              items.length
              ? items.map((item, idx) => <ViewableItem movie={item} idx={idx} key={item._id}/>)
              : <NoList />
            }
          </div>
        }
      </div>
    )
  }
};

ViewableList.propTypes = {
  items: PropTypes.array,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewableList));
