
const subscriptionServices = require("../subscription/subscription.services");
const { insertCallbackData, checkUserExists, insertSubscriberData,insertUnSubscriberData, updateSubscriberData, insertBillingData, deleteSubscriberData, insertBillingcallbackData, insertBillingCallbackData, checkSubscription, updateSubscriptionBillingDates, insertSubscription,sendPromotionExistNumberHit} = require("./callback.services");
const { v4: uuidv4 } = require('uuid');

const getSubscriber = (req, res) => {
    const details = req.body;
    console.log(details,"++++++++++++++etails")
    const data={
        subscription_id:details.subscription_id,
        user_id:details.user_id,
        user_msisdn:details.user_msisdn,
        svc_id:details.svc_id,
        svc_name:details.svc_name,
        ext_ref:details.ext_ref,
        channel_name:details.channel_name,
        status_id:details.status_id,
        status_name:details.status_name,
        renewal_type:details.renewal_type,
        billing_rate:details.billing_rate,
        billing_cycle:details.billing_cycle,
        created_at:details.created_at,
        subscription_started_at:details.subscription_started_at,
        updated_at:details.updated_at,
        expires_at:details.expires_at,
        last_billed_at:details.last_billed_at,
        next_billing_at:details.next_billing_at,
        amount: details.amount || 0,
        billing_ref:details.billing_ref || 0,
        result_id:details.result_id || 0,
        result_name:details.result_name || null,
        billing_type:details.billing_type || null,
    }
    // Insert callback data into the database
    insertCallbackData(data, (err, result) => {
        // console.log(data,"insertcallback")
        if (err) {
            console.log(err, "Error inserting callback data");
            return res.status(400).json({ error: err });
        }

        // console.log("Callback data inserted successfully");

        if (data.status_name === 'ACTIVE') {
            // console.log("active data", data.status_name)
            checkUserExists(data, (err, result) => {
                if (err) {
                    console.log(err, "Error checking user existence");
                    return res.status(500).json({ message: "Error checking subscription", error: err.message });
                }
                
                // console.log("=====data===",result.length)
                // If user exists, update their data
                if (result.length > 0) {
                //    return res.send('success updated')
                    updateSubscriberData(data, (updateErr, updateResult) => {
                        if (updateErr) {
                            console.log(updateErr, "Error updating data in subscription");
                            return res.status(400).json({ error: updateErr });
                        }
                        console.log("Updated data in subscription table");
                        return res.send('updated data');
                    });
                } else {
                    // If user does not exist, insert new entry
                    insertSubscriberData(data, (insertErr, insertResult) => {
                        if (insertErr) {
                            console.log(insertErr, "Error inserting data in subscription");
                            return res.status(400).json({ error: insertErr });
                        }

                        sendPromotionExistNumberHit(
                            data.user_msisdn,
                            data.ext_ref==''?uuidv4():data.ext_ref,
                            data.svc_id,
                            (err, promoCallback) => {
                                if (err) {
                                    console.error('Error in sendPromotionExistNumberHit');
                                } else {
                                    console.log('Promotion Exist Number Hit logged successfully', promoCallback);
                                }
                            }
                        );
                        
                        console.log("Inserted data in subscription table");
                        return res.send('inserted data in subscription table');
                        
                    });
                }
                // return res.send(result)
            });
        } else if (data.status_name === 'CANCELLED' || data.status_name === 'SUSPENDED'|| data.status_name === 'EXPIRED') {
            // console.log("cancelled data", data.status_name);
            // Insert into unsubscription table
            insertUnSubscriberData(data, (insertErr, insertResult) => {
                if (insertErr) {
                    console.log(insertErr, "Error inserting data in unsubscription");
                    return res.status(400).json({ error: insertErr });
                }
                console.log("Inserted data in unsubscription table:");
                
                // Delete from subscription table
                deleteSubscriberData(data, (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.log(deleteErr, "Error deleting data from subscription");
                        return res.status(400).json({ error: deleteErr });
                    }
                    // console.log("Deleted data from subscription table:");
                    return res.send('Deteted data from subscription table');
                });
            });
        }
    });
};

const getbilling = (req, res) => {
    // Extract data from the request body
    const data = req.body;
    console.log(data, "===billing data===");

    // Function to insert billing callback data into tbl_callback table
    insertBillingCallbackData(data, (err, result) => {
        if (err) {
            console.log(err, "Error inserting billing callback data");
            return res.status(400).json({ error: err });
        }
        console.log("Billing callback data inserted successfully");

        // Function to insert billing data into tbl_billing table
        if(data.result_name==='SUCCESS'){

        insertBillingData(data, (err, result) => {
            if (err) {
                console.log(err, "Error inserting billing data");
                return res.status(400).json({ error: err });
            }
            console.log("Billing data inserted successfully");
                   //  setTimeout(() => {

            // Function to check if the subscription exists in tbl_subscription table
            checkSubscription(data.subscription, (err, result) => {
                if (err) {
                    console.log(err, "Error checking subscription");
                    return res.status(400).json({ error: err });
                }
                console.log("Check subscription successfully");

                // If subscription exists, update its billing dates
                // Otherwise, insert the subscription
            //   console.log("length to check user subscription", result)
                if (result) {
                    updateSubscriptionBillingDates(data.subscription, (err, result) => {
                        if (err) {
                            console.log(err, "Error updating subscription billing dates");
                            return res.status(400).json({ error: err });
                        }
                        console.log("Subscription billing dates updated successfully");
                        return res.send('success');
                    });
                } else {
                    insertSubscription(data.subscription, (err, result) => {
                        if (err) {
                            console.log(err, "Error inserting subscription data");
                            return res.status(400).json({ error: err });
                        }
                        console.log("Subscription data inserted successfully");
                        return res.send('success');
                    });
                }
            });
        });
//   }, 5000);


}else{
  return res.send('success')
}



    });
};



module.exports = { getSubscriber, getbilling };










