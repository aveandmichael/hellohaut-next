const axios = require('axios')

export default async function handler(req, res) {
    const resp = await axios.post(
        'https://europe-west1-metrics-staging-1.cloudfunctions.net/getExternalProducts',
        {
            SkinID: req.query.SkinID,
            authenticationToken: req.query.authenticationToken,
            category: req.query.category
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    )
    .then(function (response) {
        // console.log(response);
        if (response && response.data) {
            return res.status(200).json({
                "success": true,
                "message": "fetched",
                "data": response.data
            })
        }
        
        return res.status(200).json({
            "success": true,
            "message": "fetched",
            "data": []
        })
    })
    .catch(function (error) {
        // console.log(error);
        return res.status(400).json({
            "success": false,
            "message": error.message,
            "data": []
        })
    });

    return resp
}