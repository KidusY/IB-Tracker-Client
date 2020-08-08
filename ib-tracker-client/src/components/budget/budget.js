import React from 'react';
import './budget-style.css';
import axios from 'axios';
import config from '../../config';
import tokenServices from '../../services/tokenServices';
import NavBar from '../../components/navBar/navBar';
import Header from '../../components/header/header';
import { Doughnut, Bar } from 'react-chartjs-2';
import './budget-style.css';
class budget extends React.Component {
	constructor() {
		super();
		this.state = {
			dougnutChartData: [
				{
					labels: [ 'Income', 'Loss', 'Spent', 'Profit', 'Saving' ],
					datasets: [
						{
							label: 'Budget',
							data: [ 0, 0, 0, 0, 0 ],

							backgroundColor: [
								'rgba(40, 53, 147,0.9)',
								'rgba(198, 40, 40,0.9)',
								'rgba(0, 105, 92,0.9)',
								'rgba(85, 139, 47,0.9)'
							]
						}
					]
				}
			],
			barChartData: {
				labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
				datasets: [
					{
						label: 'Income',
						backgroundColor: 'rgba(48, 63, 159,0.9)',
						borderColor: 'rgba(48, 63, 159,0.9)',
						borderWidth: 1,
						hoverBackgroundColor: 'rgba(48, 63, 159,0.5)',
						hoverBorderColor: 'rgba(48, 63, 159,0.4)',
						data: [ 65, 59, 80, 81, 56, 55, 40 ]
					}
				]
			},
			chartData: [],

			error: '',
			pending: true,
			currentIncome: '',
			currentLoss: '',
			currentSpending: '',
			availableToSpend:0
		};
	}
	componentDidMount() {
		axios
			.get(`${config.API_ENDPOINT}/api/logs`, {
				headers: {
					Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
				}
			})
			.then((res) => {
				let budgetData = [];
				res.data.map((data) => {
					if (
						data.actions === 'Removed Inventory' ||
						data.actions === 'Added New Product' ||
						data.actions === 'Added Inventory' ||
						data.actions === 'Sold Inventory'
					) {
						budgetData.push(data);
					}
				});

				this.calculateBudget(budgetData);
				this.setState({ pending: false });
			})
			.catch((err) => this.setState({ error: err.response, pending: false }));
	}

	calculateBudget = (data) => {
		let copiedData = [];
		this.state.dougnutChartData.map((data) => copiedData.push(data));

		let newData = [ 0, 0, 0, 0 ];
		for (const singleData of data) {
			if (singleData.actions === 'Added Inventory') {
				newData[2] = newData[2] + Number(singleData.price);
			}
			if (singleData.actions === 'Removed Inventory') {
				newData[1] = newData[1] + Number(singleData.price);
			}
			if (singleData.actions === 'Sold Inventory') {
				newData[0] = newData[0] + Number(singleData.price);
			}
		}

		newData[3] = newData[0] - (newData[1] + newData[2]);
		copiedData[0].datasets[0].data = newData;
		console.log(copiedData);
		this.setState({
			chartData: newData,
			currentIncome: newData[0],
			currentLoss: newData[1],
			currentSpending: newData[2]
		});
	};

	handleUpArrowAction = () => {
		let copiedData = [];
		this.state.chartData.map((data) => copiedData.push(data));
		copiedData[0] = copiedData[0] + 100;
		this.setState({ chartData: copiedData, currentIncome: this.state.currentIncome + 100 });
	};
	handleUpDownAction = () => {
		let copiedData = [];
		this.state.chartData.map((data) => copiedData.push(data));
		copiedData[0] = copiedData[0] - 100;
		this.setState({ chartData: copiedData, currentIncome: this.state.currentIncome - 100 });
	};
	calculateSaving = (saving) => {
		const chartData = this.state.chartData.map(data=>data);

		const profit = this.state.chartData[3];
		let spending = 0;
		if(profit - saving > 0){
			this.setState({error:''})	
			spending = profit - saving
		}
		else{
			saving = 0;
		 this.setState({error:'Not enough Funds'})	
		}
		chartData[4] = saving
		this.setState({availableToSpend:spending,chartData:chartData})
	};
	render() {
		let dougnutBarData = {
			labels: [ 'Income', 'Loss', 'Spent', 'Profit', 'Saving' ],
			datasets: [
				{
					label: 'Budget',
					data: this.state.chartData,

					backgroundColor: [
						'rgba(40, 53, 147,0.9)',
						'rgba(198, 40, 40,0.9)',
						'rgba(0, 105, 92,0.9)',
						'rgba(85, 139, 47,0.9)'
					]
				}
			]
		};
		return (
			<div className="container">
				<NavBar />
				<Header location={this.props.location.pathname} />
				<div className="filler" />
				<div className="main">
					<div className="budgetContainer">
						<div className="col-1">
							<div className="doughnutChart">
								<Doughnut
									data={dougnutBarData}
									width={300}
									height={300}
									options={{ maintainAspectRatio: false }}
								/>
							</div>
							<div className="income">
								<img src="https://img.icons8.com/nolan/64/receive-euro.png" width="50px" alt="income" />
								<div>
									<span> Income </span> <br />
									<span style={{ color: '#283593', fontSize: '20px', fontWeight: 'bolder' }}>
										$ {Math.round((Number(this.state.currentIncome) + Number.EPSILON) * 100) / 100}
									</span>
								</div>
							</div>
							<div className="Spent">
								<img src="https://img.icons8.com/nolan/64/card-in-use.png" alt="spending" />
								<div>
									<span> Spending </span> <br />
									<span style={{ color: '#c62828', fontSize: '20px', fontWeight: 'bolder' }}>
										$ {Math.floor(this.state.currentSpending)}
									</span>
								</div>
							</div>
							<div className="loss">
								<img src="https://img.icons8.com/nolan/48/bearish.png" alt="loss" />
								<div>
									<span> Loss</span>
									<br />
									<span style={{ color: '#c62828', fontSize: '20px', fontWeight: 'bolder' }}>
										$ {this.state.currentLoss}
									</span>
								</div>
							</div>
						</div>
						<div className="col-2">
							<div className="barChart">
								<Bar
									data={this.state.barChartData}
									width={300}
									height={500}
									options={{ maintainAspectRatio: false }}
								/>
							</div>
							<div className="availableToSpend">	
								<h2> Available To Spend </h2> <br/>
								<h1><img  src="https://img.icons8.com/nolan/64/albanian-lek.png" width="40px" alt="availableToSpend" /> $ {this.state.availableToSpend} </h1>
							 </div>
						</div>
						<div className="col-3">
							<div className="incomePredictor">
								<div>
									<img src="https://img.icons8.com/nolan/64/receive-euro.png" alt="income" />
									<h3> What if </h3>
									<h2>Income </h2>
									<h1>
										<i className="material-icons">attach_money</i>{' '}
										{Math.round((Number(this.state.currentIncome) + Number.EPSILON) * 100) / 100}
									</h1>
								</div>
								<div className="Arrows">
									<img
										src="https://img.icons8.com/nolan/64/sort-up--v2.png"
										className="upArrow"
										width="30px"
										height="30px"
										onClick={() => this.handleUpArrowAction()}
										alt="upArrow"
									/>
									<br />
									<img
										src="https://img.icons8.com/nolan/64/sort-down--v1.png"
										className="downArrow"
										width="30px"
										height="30px"
										onClick={() => this.handleUpDownAction()}
										alt="downArrow"
									/>
								</div>
							</div>
							<div className="savingCalculator">
								<div className="head">
									<h1>Saving</h1>
								</div>
								<h3 style={{textAlign:"center",padding:'5px'}}> I want to save </h3>
								<label style={{color:"red"}}> {this.state.error} </label>
								<input defaultValue={0} id="savingInput" />
								<button onClick={() => this.calculateSaving(document.getElementById('savingInput').value)}>Calculate</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default budget;
