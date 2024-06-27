const axios = require('axios');
const crypto = require('crypto');
const { format } = require('date-fns');
const { checkUserExists, insertRequestResponseData, checkSubscriberStatus, storeRedirectParam } = require('./subscription.services');

const getSubscription = async (req, res) => {
    const data = req.body;

    try {
        const result = await checkUserExistsAsync(data);

        console.log("=====data===", result);

        if (result.length > 0) {
            return res.json({ result, "statusId": "1" });
        } else {
            const { headers, url } = await prepareAWSHeaders(data);
          
            try {
                const response = await axios.post(url, data, { headers });
                console.log(response, "====API Response====");
                await insertRequestResponseDataAsync(data, response.data);
                return res.send({ result: response.data, statusId: "0" });
            } catch (error) {
                console.log("type of error", error.response.data);
                await insertRequestResponseDataAsync(data, error.response.data);
                res.status(500).json({ errorresult: error.message });
            }
        }
    } catch (error) {
        console.error("Error in getSubscription:", error);
        res.status(500).json({ errorresult: error.message });
    }
};

function prepareAWSHeaders(data) {
    const url = process.env.URL;
    const accessKey = process.env.ACCESSKEY;
    const secretKey = process.env.SECRETKEY;
    const region = 'eu-west-1';
    const serviceName = 'execute-api';
    const algorithm = 'AWS4-HMAC-SHA256';
    const amzDate = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");
    const canonicalUri = '/partner-vas-api/subscription';
    const headers = buildAWSHeaders(data, { amzDate, algorithm, accessKey, secretKey, region, serviceName, canonicalUri });
    return { headers, url };
}

function buildAWSHeaders(data, { amzDate, algorithm, accessKey, secretKey, region, serviceName, canonicalUri }) {
    const canonicalHeaders = `content-length:${JSON.stringify(data).length}\ncontent-type:application/json\nhost:sdp-p-apigw-partners.telkom.co.za\nx-amz-content-sha256:${crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')}\nx-amz-date:${amzDate}\nx-api-key:TWTRHWoOB1liUG1k\n`;
    const signedHeaders = 'content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-api-key';
    const canonicalRequest = `POST\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')}`;
    const dateStamp = amzDate.substr(0, 8);
    const credentialScope = `${dateStamp}/${region}/${serviceName}/aws4_request`;
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;
    const signingKey = getSigningKey(secretKey, dateStamp, region, serviceName);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    return {
        'x-api-key': process.env.APIKEY,
        'Content-Type': 'application/json',
        'X-Amz-Content-Sha256': crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex'),
        'X-Amz-Date': amzDate,
        'Authorization': authorizationHeader
    };
}

function getSigningKey(key, dateStamp, regionName, serviceName) {
    const kDate = crypto.createHmac('sha256', `AWS4${key}`).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
    const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
    return kSigning;
}

// Promisified database function
function checkUserExistsAsync(data) {
    return new Promise((resolve, reject) => {
        checkUserExists(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function insertRequestResponseDataAsync(data, responseData) {
    return new Promise((resolve, reject) => {
        insertRequestResponseData(data, responseData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
const checkSubscriber=(req,res)=>{
    const data=req.query
    console.log(data,"check query params")

    
    const svc_name = data.svc_name;
    console.log(`Received svc_name: ${svc_name}`);
    //const hostname = req.hostname;
    // console.log(`Received hostname: ${hostname}`);

    // const svc_name = hostname.split('.')[0];
    // data.svc_name = svc_name;
    // Add svc_name to data object if it exists
    if (svc_name) {
        data.svc_name = svc_name;
    } else {
        console.log("svc_name is not defined in query parameters");
    }

    storeRedirectParam(data, (err, result) => {
        console.log(data,"====data======")
        if (err) {
            console.log(err, "Error storing redirect parameter");
            return res.status(500).json({ error: err });
        }

 checkSubscriberStatus(data, (err, result) => {
    if (err) {
        console.log(err, "Error fetching data");
        return res.status(400).json({ error: err });
    }
    
    // console.log(result,"checksub");
    // return res.send(result);
    if(result.length>0){
       
        return res.json({result,"statusId":"1"})

    }
    return res.json({result,"statusId":"0"})
});
    })
};

module.exports = {getSubscription,checkSubscriber};
