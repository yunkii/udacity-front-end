import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getAllData} from './data/mapData';


/**
 * List class
 */
class List extends Component {
    static propTypes = {
        attractions: PropTypes.array.isRequired,
        map: PropTypes.object.isRequired,
        markers: PropTypes.array.isRequired,
        placeMarkers: PropTypes.func.isRequired,
        infowindow: PropTypes.object.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = (event) => {
        this.setState({
            query: event.target.value
        });
    };

    render() {
        const {map, markers, attractions, placeMarkers, infowindow} = this.props;
        const {query} = this.state;
        const filteredAttractions = attractions.filter(a => a.name.toUpperCase().includes(query.toUpperCase()));

        return (
            <div className='location-list'>
                <form className='search-form'
                      onChange={
                          (event) => {
                              const localFiltered = attractions.filter(a => a.name.toUpperCase().includes(event.target.value.toUpperCase()));
                              placeMarkers(map, localFiltered);
                              event.preventDefault();
                          }
                      }
                >
                    <input className='search-input' aria-label='search'
                           type='text' value={query} placeholder='Attraction Name' onChange={this.updateQuery}/>
                    <button className='search-button' type='submit' value={query}
                            onClick={this.updateQuery}>
                        Search
                    </button>
                </form>
                <ul>
                    {
                        filteredAttractions.map(a => (
                            <li role="button" key={a.name} tabIndex='0' onClick={(event) => {
                                for (let i = 0; i < markers.length; i++) {
                                    if (markers[i].title.trim() === a.name.trim()) {
                                        getAllData(markers[i], infowindow);
                                        infowindow.open(map, markers[i]);
                                    }
                                }
                            }
                            }>
                                {a.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default List;