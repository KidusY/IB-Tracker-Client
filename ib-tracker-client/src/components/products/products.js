import React from 'react';
import NavBar from '../navBar/navBar';
import Product from '../product/product';
import Header from '../header/header';
import service from '../../services/Ib-tracker-services';
import AddProductForm from '../addProductForm/addProductFrom';
import './products-style .css';
class products extends React.Component {
	constructor() {
		super();
		this.state = {
			productsInfo: [],
			searchedProduct: [],
			addProductsForm: false
		};
	}

	componentDidMount() {
		service.getProducts().then((products) => {
			const productInfo = products.data;
			this.setState({ productsInfo: productInfo, searchedProduct: productInfo });
		});
	}
	searchForProduct = (productName) => {
		const searchedItem = this.state.productsInfo.filter((product) =>
			product.title.toLowerCase().includes(productName.toLowerCase())
		);
		if (searchedItem.length) {
			this.setState({ searchedProduct: searchedItem });
		} else {
			this.setState({ searchedProduct: this.state.productsInfo });
		}
	};

	handleAddFormModal = () => {
		this.setState({ addProductsForm: !this.state.addProductsForm });
	};

	render() {
		
		return (
			<div className="container">
				<NavBar />
				<div className="main">
					<Header searchForProduct={this.searchForProduct}  location={this.props.location.pathname}/>
					<form
						onChange={(e) => {
							e.preventDefault();
							this.searchForProduct(document.querySelector('#search').value);
						}}
					>
						<input id="search" placeholder="Search" />
					</form>
					<button onClick={() => this.handleAddFormModal()}>Add</button>
					<div className="collection">
						<div className="products">
							{this.state.searchedProduct.map((productInfo, i) => (
								<Product productInfo={productInfo} key={i} />
							))}
						</div>
					</div>

					{this.state.addProductsForm ? (
						<AddProductForm handleAddFormModal={this.handleAddFormModal} />
					) : (
						<div />
					)}
				</div>
			</div>
		);
	}
}

export default products;
