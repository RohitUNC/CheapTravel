var http=require('https');

function parseGasResult(html) {
	var result=[];

	//first find the table

	var result=html.split('\r\n');
	
	var store=false;

	console.log(result);

	result=result.filter(function(ele) {
			
		if(ele.match('.*<table.*')){
			store=true;		

		} else if(ele.match('.*</table.*')) {
			store=false;
		}	
		
		
		
		return store;

	});
	
	result=result.filter(function(ele){
	


	});

	/*.reduce(function(prev,curr,index,array) {
console.log(array);			
		
	});*/

	return ;

};

function prepareGasResults() {
	//array of states and gas prices
	var dataarray=[];

	//fetch the website and use the cherrioParse method to find state and gas prices
	http.get("https://www.google.com/flights/#search;f=RDU;t=ORD,MDW;d=2014-11-11;r=2014-11-15;tt=o;",function(res){
		 res.on('data', function (chunk) {

			res.write(chunk);

		    //parseGasResult('\''+chunk.toString()+'\'');

		 });

	}).on('error',function(e) {
		console.log("ERROR: "+e.message);

	});

	//return a method that takes in state as parameter and returns the gas price of the state.
	var data=function(state) {
		return dataarray[state];

	}

}

prepareGasResults();
