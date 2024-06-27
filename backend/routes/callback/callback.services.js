const {connection2}=require('../../db')
const { default: axios } = require("axios");

module.exports={
    insertCallbackData:(data,callback)=>{
        const{
            amount,
            billing_ref,
            result_id,
            result_name,
            billing_type,
            subscription_id,
            user_id,
            user_msisdn,
            svc_id,
            svc_name,
            ext_ref,
            channel_name,
            status_id,
            status_name,
            renewal_type,
            billing_rate,
            billing_cycle,
            created_at,
            subscription_started_at,
            updated_at,
            expires_at,
            last_billed_at,
            next_billing_at,
        }=data
        // console.log(data,"data")
    
        const insertCallback=process.env.INSERTCALLBACKLOGS
        .replace('<amount>',amount)
        .replace('<billing_ref>',billing_ref)
        .replace('<result_id>',result_id)
        .replace('<result_name>',result_name)
        .replace('<billing_type>',billing_type)
        .replace('<subscription_id>',subscription_id)
        .replace('<user_id>',user_id)
        .replace('<user_msisdn>',user_msisdn)
        .replace('<svc_id>',svc_id)
        .replace('<svc_name>',svc_name)
        .replace('<ext_ref>',ext_ref)
        .replace('<channel_name>',channel_name)
        .replace('<status_id>',status_id)
        .replace('<status_name>',status_name)
        .replace('<renewal_type>',renewal_type)
        .replace('<billing_rate>',billing_rate)
        .replace('<billing_cycle>',billing_cycle)
        .replace('<created_at>',created_at)
        .replace('<subscription_started_at>',subscription_started_at)
        .replace('<updated_at>',updated_at)
        .replace('<expires_at>',expires_at)
        .replace('<last_billed_at>',last_billed_at)
        .replace('<next_billing_at>',next_billing_at)
        console.log(insertCallback)
        connection2.query(insertCallback,[],(err,result)=>{
            if(err){
                console.log(err)
                return callback(err,null)
            }
            console.log("inserted data ")
            return callback (null,result);
        })
       },

        insertBillingCallbackData:(data, callback) => {
        // Extract billing callback data from the 'data' object
        const {amount, billing_ref, result_id, result_name, billing_type,subscription:{ subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at }} = data;
    const query= process.env.billingcallback
        // const query = `INSERT INTO tbl_callback (subscription_id, user_id, msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at, amount, billing_ref, result_id, result_name, billing_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        console.log(query,"callback billing")
        const adjustedAmount = amount / 100;
        
        // Execute the SQL query with the provided parameters
        connection2.query(query, [subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at, adjustedAmount, billing_ref, result_id, result_name, billing_type], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            // Return the result to the callback function
            return callback(null, result);
        });
    },
    checkSubscription:(subscription, callback) => {
    const {user_msisdn,svc_id}=subscription
        // const query = `SELECT * FROM tbl_subscription WHERE msisdn = ? AND svc_id = ?`;
    const query = process.env.CHECKSUBEXIST
        // Execute the SQL query with the provided parameters
        connection2.query(query, [user_msisdn, svc_id], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            // Check if the result contains any rows (subscription exists)
            const subscriptionExists = result.length > 0;
            // Return the result to the callback function
            return callback(null, subscriptionExists);
        });
    },    
    updateSubscriptionBillingDates:(subscription, callback) => {
        const {user_msisdn,updated_at,expires_at,last_billed_at, next_billing_at,svc_id}=subscription
        const query=process.env.UPDATEBILLINGDATES
    
        // SQL query to update subscription billing dates
        // const query = `UPDATE tbl_subscription SET type_event='REN', updated_at = ?,expires_at = ?,last_billed_at = ?, next_billing_at = ? WHERE msisdn = ? AND svc_id = ?`;
    // console.log(query,"update")
        connection2.query(query, [updated_at,expires_at,last_billed_at, next_billing_at, user_msisdn, svc_id], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, result);
        });
    },
 insertSubscription:(subscription, callback) => {
        // Extract subscription data from the 'subscription' object
        // Similar to insertBillingCallbackData function
    const{subscription_id,user_id,user_msisdn,svc_id,svc_name,ext_ref,channel_name,status_id,status_name,renewal_type,billing_rate,billing_cycle,created_at,subscription_started_at,updated_at,expires_at,last_billed_at,next_billing_at}=subscription
        // Construct the SQL query to insert the subscription data
        const query = `INSERT INTO tbl_subscription (subscription_id, user_id, msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(query,"")
        // Execute the SQL query with the provided parameters
        connection2.query(query, [subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }   
            // Return the result to the callback function
            return callback(null, result);
        });
    },

    insertBillingData: (data, callback) => {
        // Check if user exists in tbl_billing
        const checkUserQuery = `SELECT COUNT(1) AS total FROM tbl_billing WHERE msisdn=? AND svc_id=?`;
        connection2.query(checkUserQuery, [data.subscription.user_msisdn, data.subscription.svc_id], (checkErr, checkResult) => {
            if (checkErr) {
                console.log(checkErr);
                // return callback(checkErr, null);
            }
    
            // Set type_event based on user existence
            let type_event;
            if (checkResult[0].total > 0) {
                type_event = 'REN';
            } else {
                type_event = 'SUB';
            }
    
            // Extract billing data from the 'data' object
            const { amount, billing_ref, result_id, result_name, billing_type, subscription: { subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at } } = data;
            const adjustedAmount = amount / 100;
            console.log(adjustedAmount,"adjusted Amount")
            const query = process.env.INSERTBILLINGTABLE;
             
            // Execute the SQL query with the adjusted type_event and other parameters
            connection2.query(query, [adjustedAmount, billing_ref, result_id, result_name, billing_type, subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at, type_event], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                // Return the result to the callback function
                return callback(null, result);
            });
        });
    },
    
    
//  insertBillingData:(data, callback) => {
//         // Extract billing data from the 'data' object

//        const INSERTTYPEEVENT= `SELECT COUNT(1) AS total FROM tbl_billing WHERE msisdn=? AND svc_id=?`


//         const { amount, billing_ref, result_id, result_name, billing_type, subscription: { subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at } } = data;
//          const query=process.env.INSERTBILLINGTABLE
//                   const adjustedAmount = amount / 100;

    
//         // Execute the SQL query with the provided parameters
//         connection2.query(query, [adjustedAmount, billing_ref, result_id, result_name, billing_type, subscription_id, user_id, user_msisdn, svc_id, svc_name, ext_ref, channel_name, status_id, status_name, renewal_type, billing_rate, billing_cycle, created_at, subscription_started_at, updated_at, expires_at, last_billed_at, next_billing_at], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return callback(err, null);
//             }
//             // Return the result to the callback function
//             return callback(null, result);
//         });
//     },
    // Function to check if a subscription exists in the tbl_subscription table


   insertSubscriberData:(data,callback)=>{
    const{
        subscription_id,
        user_id,
        user_msisdn,
        svc_id,
        svc_name,
        ext_ref,
        channel_name,
        status_id,
        status_name,
        renewal_type,
        billing_rate,
        billing_cycle,
        created_at,
        subscription_started_at,
        updated_at,
        expires_at,
        last_billed_at,
        next_billing_at,
    }=data
    console.log(data,"subscriptiondata")

    const insertSubscriber=process.env.INSERTSUBSCRIBERLOGS
    .replace('<subscription_id>',subscription_id)
    .replace('<user_id>',user_id)
    .replace('<user_msisdn>',user_msisdn)
    .replace('<svc_id>',svc_id)
    .replace('<svc_name>',svc_name)
    .replace('<ext_ref>',ext_ref)
    .replace('<channel_name>',channel_name)
    .replace('<status_id>',status_id)
    .replace('<status_name>',status_name)
    .replace('<renewal_type>',renewal_type)
    .replace('<billing_rate>',billing_rate)
    .replace('<billing_cycle>',billing_cycle)
    .replace('<created_at>',created_at)
    .replace('<subscription_started_at>',subscription_started_at)
    .replace('<updated_at>',updated_at)
    .replace('<expires_at>',expires_at)
    .replace('<last_billed_at>',last_billed_at)
    .replace('<next_billing_at>',next_billing_at)
    console.log(insertSubscriber)
    connection2.query(insertSubscriber,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   },

   updateSubscriberData: (data, callback) => {
    const {user_msisdn,svc_id,next_billing_at } = data;
    const selectQuery=process.env.CHECKSUBEXIST
    // SQL query to check if the user exists in the subscription table
    // const selectQuery = `SELECT * FROM tbl_subscription WHERE msisdn = '${user_msisdn}' AND svc_id = '${svc_id}'`;

    // Execute the select query
    connection2.query(selectQuery, [user_msisdn,svc_id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        // If user exists, update renewal_type and next_billing_at
        if (result.length > 0) {
            // const updateQuery = `UPDATE tbl_subscription SET type_event ='SUB',next_billing_at = ? WHERE msisdn = ? AND svc_id=?`;
            const updateQuery=process.env.updateSubTable
            console.log("Update query:", updateQuery);

            // Execute the update query
            connection2.query(updateQuery, [next_billing_at,user_msisdn,svc_id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.log(updateErr);
                    return callback(updateErr, null);
                }
                console.log("Updated renewal_type and next_billing_at for existing user");
                return callback(null, updateResult);
            });
        } else {
            // User does not exist in the table
            return callback(null, "User does not exist in tbl_subscription");
        }
    });
},

insertUnSubscriberData:(data,callback)=>{
    const{
        subscription_id,
        user_id,
        user_msisdn,
        svc_id,
        svc_name,
        ext_ref,
        channel_name,
        status_id,
        status_name,
        renewal_type,
        billing_rate,
        billing_cycle,
        created_at,
        subscription_started_at,
        updated_at,
        expires_at,
        last_billed_at,
        next_billing_at,
    }=data
    // console.log(data,"unsubscriptiondata")

    const insertUnSubscriber=process.env.INSERTUNSUBSCRIBERLOGS
    .replace('<subscription_id>',subscription_id)
    .replace('<user_id>',user_id)
    .replace('<user_msisdn>',user_msisdn)
    .replace('<svc_id>',svc_id)
    .replace('<svc_name>',svc_name)
    .replace('<ext_ref>',ext_ref)
    .replace('<channel_name>',channel_name)
    .replace('<status_id>',status_id)
    .replace('<status_name>',status_name)
    .replace('<renewal_type>',renewal_type)
    .replace('<billing_rate>',billing_rate)
    .replace('<billing_cycle>',billing_cycle)
    .replace('<created_at>',created_at)
    .replace('<subscription_started_at>',subscription_started_at)
    .replace('<updated_at>',updated_at)
    .replace('<expires_at>',expires_at)
    .replace('<last_billed_at>',last_billed_at)
    .replace('<next_billing_at>',next_billing_at)
    console.log(insertUnSubscriber)
    connection2.query(insertUnSubscriber,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   },
   deleteSubscriberData:(data,callback)=>{
    const {subscription_id}=data
    // console.log(data,"data delete")

    const deletesubscriber=process.env.DELETELOGS
    .replace('<subscription_id>',subscription_id)
    console.log(deletesubscriber,"delete query")
    connection2.query(deletesubscriber,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   },
// Function to check if a user exists in the subscription table
checkUserExists: (data, callback) => {
    const { user_msisdn, svc_id } = data;
    const checkIfUserExistQuery=process.env.CHECKSUBEXIST
    // const checkIfUserExistQuery = `SELECT * FROM tbl_subscription WHERE msisdn='${user_msisdn}' AND svc_id='${svc_id}'`;
    connection2.query(checkIfUserExistQuery, [user_msisdn,svc_id], (err, result) => {
        if (err) {
            console.log(err,'--------------------------------');
            return callback(err, null);
        }
       
        return callback(null, result);
    });
},
sendPromotionExistNumberHit: async (user_msisdn, ext_ref, svc_id, callback) => {
   console.log("sendPromotionExistNumberHit", user_msisdn,ext_ref,svc_id)
    const url = process.env.FORWARD_SUBPROMOTION
      .replace("<user_msisdn>", user_msisdn)
      .replace("<ext_ref>", ext_ref)
      .replace("<svc_id>", svc_id);

    console.log("URL for Axios call: ", url);
    
    try {
      console.log("Making Axios GET request");
      const response = await axios.get(url);
      console.log("Response Data: ", response.data);
      return callback("", response.data);
    } catch (err) {

      return callback(err);
    }
  },
 

}







