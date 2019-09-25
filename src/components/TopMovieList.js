import React, { PureComponent } from 'react';
import CardWrapper from './HOCs/CardWrapper';
// import ReactPaginate from 'react-paginate';

class TopMovieList extends PureComponent {

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


  render() {
    return (
      <div className="top-movies-container">
        <div className="top-movies">
          <div>
            <div className="card-title1">
              Top Movie List
            </div>
            <div className="list-element">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopMovieList;
