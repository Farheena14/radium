/* Read the initial pages of the documentation till the first api i.e. /assets api  : https://docs.coincap.io/
		
ignore most of the stuff ( it might seem very verbose at this stage) and just try to get a basic idea 

Now create an API key from the section which says  “Request API Key- Click here to request your API key”
	
the “HEADER” section above it also contains details on how to use this API key
			
“set the header field Authorization=Bearer XXXX” :- you have to create a header named “Authorization” and set its value to “Bearer XXXX” where XXXX stands for the API key that you have generated above
now the assignment is to create an API that does the following ( one single API and not multiple seperate API’s)

Get the list of all the top 100 cryptocurrency coins in the world using the /assets api ( the first api mentioned in the documentation)
	
Save all the 100 coins in database ( each document to have data of 1 coin)

The schema should have the following 4 keys:
{
"symbol" // String and Unqiue
 "name": // String and Unqiue
 "marketCapUsd": // String  ( not Number)
 "priceUsd": //String
}

Notice that changePercent24Hr key is not present in the schema or colletion
Send back the list of all the coins sorted in order of their growth in last 24hours   i.e. sort all the 100 coins based on their changePercent24Hr and send the sorted array in response
The above has to be done in one single API and not multiple seperate API’s. SO go step by step and build features into your API one by one.
*/
const axios = require("axios");
const coinsModel = require("../models/coinsModel.js");

/*const getCoins = async function(req, res) {
    try {


        let options = {
            method: "get",
            url: `http://api.coincap.io/v2/assets`,
            HEADERS: {
                //"Content-Type": "application/json",
                "Authorization": "Bearer 53d53e22-0776-4597-bfbd-511837a939e6 "
            }
        };

        const coins = await axios(options);
        

        console.log("WORKING");
        let cyprtoCoins = coins.data;
        console.log(cyprtoCoins)
        res.status(200).send({ msg: "Successfully fetched data", data: cyprtoCoins });


    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

};

*/
const getCoins = async function(req, res) {
    try {
        let options = {
            method: "get",
            url: `http://api.coincap.io/v2/assets`,
            HEADERS: {
                //"Content-Type": "application/json",
                Authorization: "Bearer 53d53e22-0776-4597-bfbd-511837a939e6 ",
            },
        };
        let response = await axios(options);

        let x = response.data.data;
        concole.log(x)

        for (i = 0; i < x.length; i++) {
            let s = {
                symbol: x[i].symbol,
                name: x[i].name,
                marketCapUsd: x[i].marketCapUsd,
                priceUsd: x[i].priceUsd,
            };

            await coinsModel.findOneAndUpdate({ symbol: x[i].symbol }, s, {
                upsert: true,
                new: true,
            });
        }

        res.status(200).send({ status: true, data: x });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "server error" });
    }
};

module.exports.getCoins = getCoins;
