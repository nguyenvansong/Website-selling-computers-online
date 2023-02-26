// import { useContext } from 'react';
// import { StoreContext } from '../../store';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
function WrapProduct({children}){
    const product = useSelector(state => state.product);
    return (
        <>
            <Link to={`/product/${product.productID}`}>
                {children}
            </Link>
        </>
    )
}

export default WrapProduct;