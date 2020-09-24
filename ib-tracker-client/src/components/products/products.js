import React from 'react';
import NavBar from '../navBar/navBar';
import { withRouter } from 'react-router-dom';
import Product from '../product/product';
import Header from '../header/header';
import service from '../../services/Ib-tracker-services';
import spinner from '../../assets/spinner.gif';
import axios from 'axios';
import AddProductForm from '../addProductForm/addProductFrom';
import config from '../../config';
import tokenService from '../../services/tokenServices';
import $ from 'jquery';
import './products-style .css';
class products extends React.Component {
	constructor() {
		super();
		this.state = {
			productsInfo: [],
			searchedProduct: [],
			inventoryFrom: false,
			addProductsForm: false
		};
	}
	componentDidMount() {
		service.getProducts().then((products) => {
			const productInfo = products.data;
			this.setState({ productsInfo: productInfo, searchedProduct: productInfo });
		});
	}
	handleDeleteProduct = (productId, price) => {
		const newProducts = this.state.searchedProduct.filter(
			(product) => Number(product.productid) !== Number(productId)
		);

		this.setState({ searchedProduct: newProducts });

		axios
			.delete(`${config.API_ENDPOINT}/api/product/${productId}`, {
				headers: {
					Authorization: `bearer ${tokenService.getAuthToken()}`
				}
			})
			.then(() => {
				service.postLog({
					actions: 'Product Deleted',
					user_name: `${tokenService.getUser().user_name}`,
					productid: productId,
					price: price,
					quantity: 1
				});
			})
			.catch((err) => this.setState({ error: err.response.data }));
	};
	handleAddProducts = (productInfo) => {
		const newProducts = this.state.searchedProduct;
		newProducts.push(productInfo);

		this.setState({ searchedProduct: newProducts });

		axios
			.post(`${config.API_ENDPOINT}/api/product/`, productInfo, {
				headers: {
					Authorization: `bearer ${tokenService.getAuthToken()}`
				}
			})
			.then((res) => {
				return service.postLog({
					actions: `Added New Product`,
					quantity: 1,
					productid: res.data.productid,
					price: productInfo.price,
					user_name: `${tokenService.getUser().user_name}`
				});
			})
			.catch((err) => console.log(err.response));
	};

	searchForProduct = (productName) => {
		const searchedItem = this.state.productsInfo.filter((product) =>
			product.title.toLowerCase().includes(productName.toLowerCase())
		);
		if (searchedItem.length) {
			this.setState({ searchedProduct: searchedItem });
		} else {
			this.setState({ searchedProduct: [] });
		}
	};

	handleAddFormModal = () => {
		if (!this.state.addProductsForm) {
			$('.main').css({ opacity: '0.5', filter: 'grayscale(100%) brightness(40%)' });
		} else {
			$('.main').css({ opacity: '1', filter: 'none' });
		}
		this.setState({ addProductsForm: !this.state.addProductsForm });
	};

	render() {
		return (
			<div className="container">
				<Header searchForProduct={this.searchForProduct} location={this.props.location.pathname} />
				{console.log(this.props)}
				<NavBar />
				<div className="filler" />
				<div className="main">
					<form
						className="SearchInput"
						onChange={(e) => {
							e.preventDefault();
							this.searchForProduct(document.querySelector('#search').value);
						}}
					>
						<div className="search">
							<span className="fa fa-search" />
							<input id="search" placeholder="Search term" />
						</div>
					</form>
					<button id="addedFormModal" onClick={() => this.handleAddFormModal()}>
						<i className="material-icons">add_circle_outline</i>
					</button>
					<div className="collection">
						<h2> Products </h2>
						<div className="products">
							{this.state.searchedProduct.length === 0 ? (
								<img className="loadingSpinner" src={spinner} alt="spinner" />
							) : (
								this.state.searchedProduct.map((productInfo, i) => (
									<Product
										productInfo={productInfo}
										key={i}
										inventoryFrom={this.state.inventoryFrom}
										handleDeleteProduct={this.handleDeleteProduct}
										index={i}
									/>
								))
							)}
						</div>
					</div>
				</div>
				{this.state.addProductsForm ? (
					<AddProductForm
						handleAddFormModal={this.handleAddFormModal}
						handleAddProducts={this.handleAddProducts}
					/>
				) : (
					<div />
				)}
			</div>
		);
	}
}
products.defaultProps = {
	props: {
		location: {
			hash: '',
			key: 'bk9gf3',
			pathname: '/product',
			search: '',
			state: undefined
		},
		match: { path: '/product' },
		props: {
			location: { pathname: '/product' }
		}
	}
};
export default withRouter(products);
