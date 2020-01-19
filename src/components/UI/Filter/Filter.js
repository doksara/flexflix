import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { observer } from "mobx-react-lite";
import { genres } from './options';

import './Filter.scss';
import {RootStoreContext} from "../../../store/rootStore";

const Filter = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { setSearch, searchValue, setFilter } = rootStore.showStore;

    return (
        <div className="filter-group">
            <div className="select-wrapper">
                <select onChange={ (e) => setFilter(e.target.value)}>
                    {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                </select>
            </div>
            <div className="input-container">
                <FontAwesomeIcon className="icon" icon={faSearch} size="2x" color="white" />
                <input type="text" value={searchValue} placeholder="Search.." onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>
    );
};

export default observer(Filter);

