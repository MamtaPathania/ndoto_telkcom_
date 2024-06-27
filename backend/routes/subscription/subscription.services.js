const {connection2}=require('../../db')

module.exports={
  
    checkUserExists: (data, callback) => {
        let { msisdn,svc_name} = data;
        if (svc_name === 'beauty') {
            svc_name = 'Beauty TV';
        }

        if (svc_name === 'business') {
            svc_name = 'Boss Moves'
        }
        if (svc_name == 'woh') {
            svc_name = 'Woman Of Honour';
          }

          if (svc_name == 'luxury') {
            svc_name = 'Luxury living';
          }
          if (svc_name == 'faith') {
            svc_name = 'FaithFirstTV';
          }

          if (svc_name == 'comedy') {
            svc_name = 'LOL TV';
          }
          if (svc_name == 'fashion') {
            svc_name = 'Fashion on lock';
          }
          if (svc_name == 'sports') {
            svc_name = 'Sports & beyond';
          }

          if (svc_name == 'topics') {
            svc_name = 'Hot Topics'
          }
    console.log(data,"=====user")
      const checkuser=process.env.CHECKUSER
      .replace('<msisdn>',msisdn)
      .replace('<svc_name>',svc_name)
      console.log("=====",checkuser)
        connection2.query(checkuser, [], (err, result) => {
            if (err) {
                console.log(err,'--------------------------------');
                return callback(err, null);
            }
            
            return callback(null, result);
            
        });
    },
    insertRequestResponseData(requestData, responseData, callback) {
      const requestJsonString = JSON.stringify(requestData);
      const responseJsonString = JSON.stringify(responseData);
      const curDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const responseinsertQuery = `INSERT INTO tbl_subscription_res (req, res, curdatetime) VALUES (?, ?, ?)`;
      const values = [requestJsonString, responseJsonString,curDateTime];
  console.log(responseinsertQuery,"insertquery")
      connection2.query(responseinsertQuery, values, (err, result) => {
          if (err) {
            console.log(err,"error")
              // return callback(err, null);
          }
          console.log(result,"result")
          return callback(null, result);
      });
  },

  // Function to store the doiredirect parameter in the database
 storeRedirectParam(data, callback){
  console.log(data,"datata====")
    const { msisdn, subscription_id,svc_name } = data;
    const query=process.env.REDIRECT_LOGS
    connection2.query(query, [msisdn, subscription_id,svc_name], (err, results) => {
        if (err) {
            console.log("Database insertion error:", err);
            return callback(err);
        }
        callback(null, results);
    });
},

  checkSubscriberStatus:(data,callback)=>{
    const {subscription_id,msisdn,status_name}=data;
    console.log(data,"checksubscriber")
    const checkSubscriberActive= process.env.CHECKSUBSCRIBER
    .replace('<msisdn>',msisdn)
    .replace('<subscription_id>',subscription_id)

    console.log(checkSubscriberActive,"checkSubscriber query")
    connection2.query(checkSubscriberActive,[],(err,result)=>{
      if(err){
        console.log(err)
        return callback(err,null)
    }
    console.log(result)
    return callback (null,result);

    })
  }



}