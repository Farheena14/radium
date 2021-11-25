const axios = require("axios");

// res.status(200). send( { data: userDetails } )

const getStatesList = async function(req, res) {
    try {
        let options = {
            method: "get",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        };
        const cowinStates = await axios(options);

        console.log("WORKING");
        let states = cowinStates.data;
        res.status(200).send({ msg: "Successfully fetched data", data: states });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

};


const getDistrictsList = async function(req, res) {

    try {
        let id = req.params.stateId
        console.log(" state: ", id)

        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}` //plz take 5 mins to revise template literals here
        }
        let response = await axios(options)

        let districts = response.data

        console.log(response.data)
        res.status(200).send({ msg: "Success", data: districts })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}

const getByPin = async function(req, res) {

    try {

        let pin = req.query.pincode
        let date = req.query.date

        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let response = await axios(options)



        let centers = response.data
        console.log(centers)
        res.status(200).send({ msg: "Success", data: centers })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}


const getOtp = async function(req, res) {

    try {

        let options = {
            method: "post", // method has to be post
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: { "mobile": req.body.mobile } // we are sending the json body in the data 
        }
        let response = await axios(options)

        let id = response.data
        res.status(200).send({ msg: "Success", data: id })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}


const getweather = async function(req, res) {
    try {
        let city = req.query.city
        let temp = req.query.appId
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=d03c6511ac589c04857f3a2bc06681fd`

        };
        const weather = await axios(options);

        console.log("weather update");
        let x = weather.data;
        res.status(200).send({ msg: "Successfully fetched data", data: x });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

};


const londonTemp = async function(req, res) {
    try {

        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=d03c6511ac589c04857f3a2bc06681fd`

        };
        const london = await axios(options);

        console.log("weather update");
        let x = london.data.main.temp;
        res.status(200).send({ msg: "Successfully fetched data", data: x });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

};



const weatherCities = async function(req, res) {
    try {
        let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]

        let array = [];
        let options;

        for (let i = 0; i < city.length; i++) {
            console.log(i)
            options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=d03c6511ac589c04857f3a2bc06681fd`
            };
            let s = await axios(options)
            array.push({ "city": city[i], "temp": s.data.main.temp });

            //array.push(cities)
        }
        let cities = array.sort(function(x, y) { return parseFloat(x.temp) - parseFloat(y.temp); })
        return res.status(200).send({ msg: "Succussfully fetched", "temp of cities": cities })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}



module.exports.getStatesList = getStatesList;
module.exports.getDistrictsList = getDistrictsList;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
module.exports.getweather = getweather;
module.exports.londonTemp = londonTemp;
module.exports.weatherCities = weatherCities;