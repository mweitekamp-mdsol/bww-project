import React, { Component } from 'react';
import './App.css';
import Highcharts from 'react-highcharts';
import axios from 'axios';

const bww_api = 'https://s3.us-east-2.amazonaws.com/bww-1/BuffaloWildWings2.json';
const control_api = 'https://s3.us-east-2.amazonaws.com/bww-1/USNicheGradeSample.json';

class OverallChart extends Component {
state = {
		bwwareas: [], controlareas: [],
		bwwaplus: [],bwwa: [], bwwaminus: [],
		bwwbplus: [], bwwb: [], bwwbminus: [],
		bwwcplus: [], bwwc: [], bwwcimnus: [],
		bwwdplus: [], bwwd: [], bwwdminus: [],
		
		controlaplus: [], controla: [], controlaminus: [],
		controlbplus: [], controlb: [], controlbminus: [],
		controlcplus: [], controlc: [], controlcminus: [],
		controldplus: [], controld: [], controldminus: []
	}
	
	componentWillMount() {
		axios.get(bww_api)
		.then(res => {
			const bwwareas = res.data;
			const bwwaplus = bwwareas.filter(item=>item['Overall Niche Grade']==="A+");
			const bwwa = bwwareas.filter(item=>item['Overall Niche Grade']==="A");
			const bwwaminus = bwwareas.filter(item=>item['Overall Niche Grade']==="A-");
			const bwwbplus = bwwareas.filter(item=>item['Overall Niche Grade']==="B+");
			const bwwb = bwwareas.filter(item=>item['Overall Niche Grade']==="B");
			const bwwbminus = bwwareas.filter(item=>item['Overall Niche Grade']==="B-");
			const bwwcplus = bwwareas.filter(item=>item['Overall Niche Grade']==="C+");
			const bwwc = bwwareas.filter(item=>item['Overall Niche Grade']==="C");
			const bwwcminus = bwwareas.filter(item=>item['Overall Niche Grade']==="C-");
			const bwwdplus = bwwareas.filter(item=>item['Overall Niche Grade']==="D+");
			const bwwd = bwwareas.filter(item=>item['Overall Niche Grade']==="D");
			const bwwdminus = bwwareas.filter(item=>item['Overall Niche Grade']==="D-");

			this.setState({ bwwareas: bwwareas, 
				bwwaplus: bwwaplus, bwwa: bwwa, bwwaminus: bwwaminus, 
				bwwbplus: bwwbplus, bwwb: bwwb, bwwbminus: bwwbminus, 
				bwwcplus: bwwcplus, bwwc: bwwc, bwwcminus: bwwcminus,
				bwwdplus: bwwdplus, bwwd: bwwd, bwwdminus: bwwdminus
			});

		});

	}
	
	componentDidMount() {
		axios.get(control_api)
		.then(res => {
			
			const controlareas = res.data;
			const controlaplus = controlareas.filter(item=>item['Overall Niche Grade']==="A+");
			const controla = controlareas.filter(item=>item['Overall Niche Grade']==="A");
			const controlaminus = controlareas.filter(item=>item['Overall Niche Grade']==="A-");
			const controlbplus = controlareas.filter(item=>item['Overall Niche Grade']==="B+");
			const controlb = controlareas.filter(item=>item['Overall Niche Grade']==="B");
			const controlbminus = controlareas.filter(item=>item['Overall Niche Grade']==="B-");
			const controlcplus = controlareas.filter(item=>item['Overall Niche Grade']==="C+");
			const controlc = controlareas.filter(item=>item['Overall Niche Grade']==="C");
			const controlcminus = controlareas.filter(item=>item['Overall Niche Grade']==="C-");
			const controldplus = controlareas.filter(item=>item['Overall Niche Grade']==="D+");
			const controld = controlareas.filter(item=>item['Overall Niche Grade']==="D");
			const controldminus = controlareas.filter(item=>item['Overall Niche Grade']==="D-");

			this.setState({ controlareas: controlareas, controlaplus: controlaplus, controla: controla, controlaminus: controlaminus,
				controlbplus: controlbplus, controlb: controlb, controlbminus: controlbminus,
				controlcplus: controlcplus, controlc: controlc, controlcminus: controlcminus,
				controldplus: controldplus, controld: controld, controldminus: controldminus
			});
		})
	}

	render() {
		const config = {
			chart: { type: 'column' },
			title: {text: 'Overall Grades by Zip Code'},
			subtitle: {text: 'Source: Niche.com'},
			xAxis: {
				categories: [
				'A+','A','A-',
				'B+','B','B-',
				'C+','C','C-',
				'D+','D','D-'
				],
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {text: 'Frequency'}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			colors: ['#ffd200', '#434348'],

			series: [{
				name: 'Buffalo Wild Wings',
				data: [this.state.bwwaplus.length, 
				this.state.bwwa.length,
				this.state.bwwaminus.length, 
				this.state.bwwbplus.length,
				this.state.bwwb.length,
				this.state.bwwbminus.length,
				this.state.bwwcplus.length,
				this.state.bwwc.length,
				this.state.bwwcimnus.length,
				this.state.bwwdplus.length,
				this.state.bwwd.length,
				this.state.bwwdplus.length]
			}, {
				name: 'Control Group',
				data: [this.state.controlaplus.length,
				this.state.controla.length,
				this.state.controlaminus.length,
				this.state.controlbplus.length,
				this.state.controlb.length,
				this.state.controlbminus.length,
				this.state.controlcplus.length,
				this.state.controlc.length,
				this.state.controlcminus.length,
				this.state.controldplus.length,
				this.state.controld.length,
				this.state.controldminus.length
				]
			}]
		}

		return(<Highcharts config={config} />)

	}

}

export default OverallChart;