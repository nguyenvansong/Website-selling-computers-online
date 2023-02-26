import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import styles from './search.module.scss';

import useDebouce from '../hooks/useDebouce';
import * as searchServices from '../../apiSercive/searchService';
import WrapProduct from '../WrapProduct';
import reducerSlice from '../../redux/reducer';
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const debouced = useDebouce(searchValue,500);
    useEffect(()=>{
        if(!debouced.trim()){
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            const result = await searchServices.search(debouced);
            if(result.response){
                dispatch(reducerSlice.actions.setError(result.response.data.error ||  result.response.data.userMsg))
                navigate("/error");
            }else{
                setSearchResult(result);
            }
        };
        
        fetchApi();

    },[debouced])

    const handleHideResult = () => {
        setShowResult(false);
    }

    return (
        <>
            <Tippy
                interactive={true}
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={attrs => (
                    <div className={clsx(styles.search_result)} tabIndex="-1" {...attrs}>
                        <div className={clsx(styles.search_result_wrap)}>
                            {
                                searchResult.map((result) => {
                                    return (
                                        <WrapProduct>
                                            <div className={clsx(styles.search_item)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickProduct(result));
                                            }}>
                                                <span>{result.productName}</span>
                                            </div>
                                        </WrapProduct>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                )}
            >
                <div className={clsx(styles.header_search)}>
                    <input type="text" className={clsx(styles.search_input)} placeholder="Tìm kiếm..." 
                        onFocus={() => setShowResult(true)}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Link to="/search" className={clsx(styles.btn_search)} onClick={() => {
                                                dispatch(reducerSlice.actions.setPickSearchResult(searchResult));
                                            }}>
                        <span className={clsx(styles.icon)}><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                    </Link>
                </div>
            </Tippy>
        </>
    )
}

export default Search;