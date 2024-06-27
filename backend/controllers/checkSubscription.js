const {connection,connection2} = require('../db');

module.exports={



checkSubscription: (req, res) => {
    const phoneNumber = req.query.ani;
    let service=req.query.service
    console.log("number", phoneNumber,service);
    if (service === 'videos') {
      service = 'nvod';
  }

  if (service === 'business') {
    service = 'Boss Moves';
  }
  if (service == 'beauty') {
    service = 'Beauty TV';
  }
  if (service == 'woh') {
    service = 'Woman Of Honour';
  }
  if (service == 'luxury') {
    service = 'Luxury living';
  }
  if (service == 'faith') {
    service = 'FaithFirstTV';
  }
  if (service == 'comedy') {
    service = 'LOL TV';
  }
  if (service == 'fashion') {
    service = 'Fashion on lock';
  }
  if (service == 'sports') {
    service = 'Sports & beyond';
  }
  if (service == 'topics') {
    service = 'Hot Topics';
  }
// Sports & beyond
  console.log("service", service)
    const checkUserQuery = 'SELECT * FROM tbl_subscription WHERE msisdn = ? AND svc_name = ?';


    connection2.query(checkUserQuery, [phoneNumber, service], (err, userResults) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ message: 'Database error' });
        } else {
            if (userResults.length > 0) {
                const user = userResults[0];      
                const currentDate = new Date();
                const nextBilledDate = new Date(user.expires_at);
                

                const currentDateStr = currentDate.toISOString().split('T')[0];
                const nextBilledDateStr = nextBilledDate.toISOString().split('T')[0];
                 console.log("c", currentDateStr,"ne",nextBilledDateStr)
                // Compare the date strings
                if (nextBilledDateStr >= currentDateStr) {
                    res.json({ exists: true, user, serviceType: service });
                } else {
                    res.json({ exists: false, message: 'No active services' });
                }
                



                // const currentDate = new Date();
                // const nextBilledDate = new Date(user.next_billed_date);
                
                // console.log("next",nextBilledDate,"current",currentDate)
                // if (nextBilledDate >= currentDate) {
                //     res.json({ exists: true, user, serviceType: service });
                // } else {
                //     res.json({ exists: false, message: 'No active services' });
                // }

                


            } else {
                res.json({ exists: false });
            }
        }
    });
},













      checkCategory: (req, res) => {
        const ani = req.params.ani;
        const query = 'SELECT service_type FROM tbl_subscription WHERE ani=?  AND STATUS="Active"';
        connection.query(query, ani, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },


      checkTest: (req, res) => {
        console.log("===============================")
        const ani = req.query.ani;
        const serviceType=req.query.serviceType
          
        const query = 'SELECT * FROM tbl_subscription WHERE ani = ? AND service_Type=? AND STATUS="Active"';
        
        connection.query(query, [ani,serviceType], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      checkSubscriptionRedirect: (req, res) => {
        const ani = req.query.msisdn;
        const status='null';
        // const status = req.query.result;
        console.log("status result",status)
        let service = req.query.service;
        
        if (service === 'videos') {
            service = 'nvod';
        }
        
        if (service === 'beauty') {
            service = 'Beauty TV';
        }

        if (service === 'business') {
            service = 'Boss Moves';
        }
        if (service == 'woh') {
            service = 'Woman Of Honour';
          }

          if (service == 'luxury') {
            service = 'Luxury living';
          }
          if (service == 'faith') {
            service = 'FaithFirstTV';
          }

          if (service == 'comedy') {
            service = 'LOL TV';
          }
          if (service == 'fashion') {
            service = 'Fashion on lock';
          }
          if (service == 'sports') {
            service = 'Sports & beyond';
          }

          if (service == 'topics') {
            service = 'Hot Topics';
          }
    // Sports & beyond
        console.log("lets check=======", ani, status,service);
    
        const query = 'SELECT * FROM tbl_subscription WHERE msisdn=? AND svc_name=?  AND expires_at > CURDATE()';
        connection2.query(query, [ani, service], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            console.log("Service value:", service);
    

            console.log("status",results)

           if(results.length===0 && status=='null'){
            return res.status(403).json({ message: 'Subscription not active' });
         
           }

            if (results.length === 0 ) {
                if (status === 'active') {
                    console.log("status-------------",status)

                    console.log("SERVICE",service)

                    // Case 2: If ani doesn't match the database but status is 'active',
                    // and service is 'nvod', perform the same task as for 'nvod' videos
                    if (service ==='nvod') {
                        // NVOD specific logic here
                        const videosQuery = `
                            SELECT *
                            FROM tbl_videos
                            WHERE category IN (
                                SELECT DISTINCT category
                                FROM tbl_videos
                            )
                            GROUP BY category
                            ORDER BY category
                        `;
        

                        connection.query(videosQuery, (err, categories) => {
                            if (err) {
                                return res.status(500).json({ error: 'Database error' });
                            }
        
                            const groupedVideos = {};
        
                            const fetchVideosForCategory = (index) => {
                                if (index >= categories.length) {
                                    res.json(groupedVideos);
                                    return;
                                }
        
                                const category = categories[index].category;
                                const fetchVideosQuery = `
                                    SELECT *
                                    FROM tbl_videos
                                    WHERE category = ?
                                    LIMIT 4
                                `;
        
                                connection.query(fetchVideosQuery, [category], (err, videos) => {
                                    if (err) {
                                        return res.status(500).json({ error: 'Database error' });
                                    }
        
                                    groupedVideos[category] = videos;
        
                                    fetchVideosForCategory(index + 1);
                                });
                            };
        
                            fetchVideosForCategory(0);
                        });
                    } else {
                       
                        console.log("checkservice",service)
                        // If the service is not 'nvod', query the tbl_cat table with the service as the portal
                        const serviceQuery = 'SELECT * FROM tbl_cat WHERE portal=?';
                        console.log("1stservice",service)
                        connection.query(serviceQuery, service, (err, serviceResults) => {
                            if (err) {
                                return res.status(500).json({ error: 'Database error' });
                            }
    
                            if (serviceResults.length === 0) {
                                return res.status(404).json({ message: 'Data not found' });
                            }

                               console.log("portal result",serviceResults)

                             

                            res.json(serviceResults);
                        });

                    }
                } else {
                    // Case 1: If ani doesn't match the database and status is not 'active',
                    // query the tbl_cat table with the service as the portal
                    const serviceQuery = 'SELECT * FROM tbl_cat WHERE portal=?';
                    connection.query(serviceQuery, [service], (err, serviceResults) => {
                        if (err) {
                            return res.status(500).json({ error: 'Database error' });
                        }
    
                        if (serviceResults.length === 0) {
                            return res.status(404).json({ message: 'Data not found' });
                        }
    
                        res.json(serviceResults);
                    });
                }
            } else {
                // ani exists in the database, proceed with the existing logic
                let serviceType = results[0].svc_name;
                console.log("fetched service type before ", serviceType)


                if (serviceType == 'Luxury living') {
                    serviceType = 'luxury';
                  }
                if (serviceType =='Beauty TV') {
                    serviceType ='beauty';
                }

                if (serviceType =='Woman Of Honour') {
                    serviceType ='woh';
                }
                if (serviceType =='Boss Moves') {
                    serviceType ='business';
                }
                if (serviceType =='FaithFirstTV') {
                    serviceType ='faith';
                }
                if (serviceType =='LOL TV') {
                    serviceType ='comedy';
                }
              
                if (serviceType =='Fashion on lock') {
                    serviceType ='fashion';
                }
                if (serviceType =='Sports & beyond') {
                    serviceType ='sports';
                }

                if (serviceType =='Hot Topics') {
                    serviceType ='topics';
                }
// Sports & beyond
                console.log("fetched service type after ", serviceType)

                // const currentDate = new Date();
                // const nextBilledDate = new Date(results[0].next_billed_date);


                // const currentDateStr = currentDate.toISOString().split('T')[0];
                // const nextBilledDateStr = nextBilledDate.toISOString().split('T')[0];
                //  console.log("c", currentDateStr,"ne",nextBilledDateStr)
    
                // console.log("before",currentDateStr,"afte4r",nextBilledDateStr)

                // if (currentDateStr > nextBilledDateStr) {
                //     return res.status(401).json({ message: 'Subscription expired' });
                // }
              
                
                if (serviceType === 'NVOD') {
                     connection.query('SELECT category_name, name FROM tbl_cat', (err, categories) => {
            if (err) {
                console.error('Error executing the query:', err);
                return res.status(500).json({ error: 'Error fetching data from the database' });
            }

            let results = [];
            let processedCategories = 0;

            if (categories.length === 0) {
                return res.json([]);  // No categories to process
            }

            categories.forEach(category => {
                connection.query('SELECT sub_cat_name, sub_cat_id FROM tbl_sub_cat WHERE parent_cat_id = ?', [category.category_name], (err, subCategories) => {
                    if (err) {
                        console.error('Error executing the query:', err);
                        return res.status(500).json({ error: 'Error fetching sub-categories from the database' });
                    }

                    let processedSubCategories = 0;

                    if (subCategories.length === 0) {
                        processedCategories++;
                        if (processedCategories === categories.length) {
                            return res.json(results);  // All categories processed
                        }
                    } else {
                        subCategories.forEach(subCategory => {
                            connection.query('SELECT * FROM tbl_videos WHERE sub_cat_id = ? ', [subCategory.sub_cat_id], (err, videos) => {
                                if (err) {
                                    console.error('Error executing the query:', err);
                                    return res.status(500).json({ error: 'Error fetching videos from the database' });
                                }

                                results.push({
                                    category: category.category_name,
                                    categoryName: category.name,
                                    subCategory: subCategory.sub_cat_name,
                                    subCategoryId: subCategory.sub_cat_id,  // Added this
                                    videos: videos
                                });

                                processedSubCategories++;
                                if (processedSubCategories === subCategories.length) {
                                    processedCategories++;
                                    if (processedCategories === categories.length) {
                                        return res.json(results);  // All categories and their sub-categories processed
                                    }
                                }
                            });
                        });
                    }
                });
            });
        });
                    // NVOD specific logic here
                    // const videosQuery = `
                    //     SELECT *
                    //     FROM tbl_videos
                    //     WHERE category IN (
                    //         SELECT DISTINCT category
                    //         FROM tbl_videos
                    //     )
                    //     GROUP BY category
                    //     ORDER BY category
                    // `;
    
                    // connection.query(videosQuery, (err, categories) => {
                    //     if (err) {
                    //         return res.status(500).json({ error: 'Database error' });
                    //     }
    
                    //     const groupedVideos = {};
    
                    //     const fetchVideosForCategory = (index) => {
                    //         if (index >= categories.length) {
                    //             res.json(groupedVideos);
                    //             return;
                    //         }
    
                    //         const category = categories[index].category;
                    //         const fetchVideosQuery = `
                    //             SELECT *
                    //             FROM tbl_videos
                    //             WHERE category = ?
                    //             LIMIT 4
                    //         `;
    
                    //         connection.query(fetchVideosQuery, [category], (err, videos) => {
                    //             if (err) {
                    //                 return res.status(500).json({ error: 'Database error' });
                    //             }
    
                    //             groupedVideos[category] = videos;
    
                    //             fetchVideosForCategory(index + 1);
                    //         });
                    //     };
    
                    //     fetchVideosForCategory(0);
                    // });
                }
                
                
                else {
                    // Service specific logic here
                    const partialServiceQuery = 'SELECT * FROM tbl_cat WHERE portal LIKE ?';
                    const searchTerm = `%${serviceType}%`;
    
                    connection.query(partialServiceQuery, [searchTerm], (err, services) => {
                        if (err) {
                            return res.status(500).json({ error: 'Database error' });
                        }
    
                        console.log('Matching Services:', services[0].category_name);
                        console.log('Service Type:', serviceType);
    
                        res.json(services);
                    });
                }
            }
        });
    }



    //   checkSubscriptionRedirect: (req, res) => {
    //     const ani = req.query.msisdn;
    //     const status = req.params.result;
    //     // const service = req.query.service;
    //     let service = req.query.service; 
  
    //         if (service === 'videos') {
    //             service = 'nvod';
    //         }
    //     console.log("lets check=======", ani, status);
    
    //     const query = 'SELECT * FROM tbl_subscription WHERE ani=? AND service_Type=?';
    //     connection.query(query, [ani, service], (err, results) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Database error' });
    //         }
    
    //         if (results.length === 0) {
    //             if (status === 'active') {
    //                 // Case 2: If ani doesn't match the database but status is 'active',
    //                 // fetch data using the dynamic service
    //                 const activeServiceQuery = 'SELECT * FROM tbl_subscription WHERE service_Type=? LIMIT 1';
    //                 connection.query(activeServiceQuery, [service], (err, activeResults) => {
    //                     if (err) {
    //                         return res.status(500).json({ error: 'Database error' });
    //                     }
    
    //                     if (activeResults.length === 0) {
    //                         // If no active subscription found for the given service,
    //                         // query the tbl_cat table with the service as the portal
    //                         const serviceQuery = 'SELECT * FROM tbl_cat WHERE portal=?';
    //                         connection.query(serviceQuery, [service], (err, serviceResults) => {
    //                             if (err) {
    //                                 return res.status(500).json({ error: 'Database error' });
    //                             }
    
    //                             if (serviceResults.length === 0) {
    //                                 return res.status(404).json({ message: 'Data not found' });
    //                             }
    
    //                             res.json(serviceResults);
    //                         });
    //                     } else {
    //                         res.json(activeResults[0]); // Return the first row
    //                     }
    //                 });
    //             } else {
    //                 // Case 1: If ani doesn't match the database and status is not 'active',
    //                 // query the tbl_cat table with the service as the portal
    //                 const serviceQuery = 'SELECT * FROM tbl_cat WHERE portal=?';
    //                 connection.query(serviceQuery, [service], (err, serviceResults) => {
    //                     if (err) {
    //                         return res.status(500).json({ error: 'Database error' });
    //                     }
    
    //                     if (serviceResults.length === 0) {
    //                         return res.status(404).json({ message: 'Data not found' });
    //                     }
    
    //                     res.json(serviceResults);
    //                 });
    //             }
    //         } else {
    //             // ani exists in the database, proceed with the existing logic
    //             const currentDate = new Date();
    //             const serviceType = results[0].service_type;
    //             const nextBilledDate = new Date(results[0].next_billed_date);
    
    //             if (nextBilledDate <= currentDate) {
    //                 return res.status(401).json({ message: 'Subscription expired' });
    //             }
    //             if (serviceType === 'NVOD') {
    //                 // NVOD specific logic here
    //                 const videosQuery = `
    //                     SELECT *
    //                     FROM tbl_videos
    //                     WHERE category IN (
    //                         SELECT DISTINCT category
    //                         FROM tbl_videos
    //                     )
    //                     GROUP BY category
    //                     ORDER BY category
    //                 `;
    
    //                 connection.query(videosQuery, (err, categories) => {
    //                     if (err) {
    //                         return res.status(500).json({ error: 'Database error' });
    //                     }
    
    //                     const groupedVideos = {};
    
    //                     const fetchVideosForCategory = (index) => {
    //                         if (index >= categories.length) {
    //                             res.json(groupedVideos);
    //                             return;
    //                         }
    
    //                         const category = categories[index].category;
    //                         const fetchVideosQuery = `
    //                             SELECT *
    //                             FROM tbl_videos
    //                             WHERE category = ?
    //                             LIMIT 4
    //                         `;
    
    //                         connection.query(fetchVideosQuery, [category], (err, videos) => {
    //                             if (err) {
    //                                 return res.status(500).json({ error: 'Database error' });
    //                             }
    
    //                             groupedVideos[category] = videos;
    
    //                             fetchVideosForCategory(index + 1);
    //                         });
    //                     };
    
    //                     fetchVideosForCategory(0);
    //                 });
    //             } else {
    //                 // Service specific logic here
    //                 const partialServiceQuery = 'SELECT * FROM tbl_cat WHERE portal LIKE ?';
    //                 const searchTerm = `%${serviceType}%`;
    
    //                 connection.query(partialServiceQuery, [searchTerm], (err, services) => {
    //                     if (err) {
    //                         return res.status(500).json({ error: 'Database error' });
    //                     }
    
    //                     console.log('Matching Services:', services[0].category_name);
    //                     console.log('Service Type:', serviceType);
    
    //                     res.json(services);
    //                 });
    //             }
    //         }
    //     });
    // }
    

// Import necessary libraries and set up your database connection (connection) before this code

// Define the checkSubscriptionRedirect function
//  checkSubscriptionRedirect :(req, res) => {
//   const ani = req.query.msisdn;
//   const status = req.params.result;
//   const service = req.query.service;
//   console.log("lets check=======", ani, status);

//   const query = 'SELECT * FROM tbl_subscription WHERE ani=? AND service_Type=?';
//   connection.query(query, [ani, service], (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: 'Database error' });
//       }

//       if (results.length === 0) {
//           if (status === 'active') {
         
//               const activeServiceQuery = 'SELECT * FROM tbl_subscription WHERE service_Type=? LIMIT 1';
//               connection.query(activeServiceQuery, [service], (err, activeResults) => {
//                   if (err) {
//                       return res.status(500).json({ error: 'Database error' });
//                   }

//                   if (activeResults.length === 0) {
//                       return res.status(404).json({ message: 'Data not found' });
//                   }

//                   res.json(activeResults[0]); // Return the first row
//               });
//           } else {
//               return res.status(404).json({ message: 'Data not found' });
//           }
//       } else {
//           // ani exists in the database, proceed with the existing logic
//           const currentDate = new Date();
//           const serviceType = results[0].service_type;
//           const nextBilledDate = new Date(results[0].next_billed_date);

//           if (nextBilledDate <= currentDate) {
//               return res.status(401).json({ message: 'Subscription expired' });
//           }
//           if (serviceType === 'NVOD') {
//               // NVOD specific logic here
//               const videosQuery = `
//                   SELECT *
//                   FROM tbl_videos
//                   WHERE category IN (
//                       SELECT DISTINCT category
//                       FROM tbl_videos
//                   )
//                   GROUP BY category
//                   ORDER BY category
//               `;

//               connection.query(videosQuery, (err, categories) => {
//                   if (err) {
//                       return res.status(500).json({ error: 'Database error' });
//                   }

//                   const groupedVideos = {};

//                   const fetchVideosForCategory = (index) => {
//                       if (index >= categories.length) {
//                           res.json(groupedVideos);
//                           return;
//                       }

//                       const category = categories[index].category;
//                       const fetchVideosQuery = `
//                           SELECT *
//                           FROM tbl_videos
//                           WHERE category = ?
//                           LIMIT 4
//                       `;

//                       connection.query(fetchVideosQuery, [category], (err, videos) => {
//                           if (err) {
//                               return res.status(500).json({ error: 'Database error' });
//                           }

//                           groupedVideos[category] = videos;

//                           fetchVideosForCategory(index + 1);
//                       });
//                   };

//                   fetchVideosForCategory(0);
//               });
//           } else {
//               // Service specific logic here
//               const partialServiceQuery = 'SELECT * FROM tbl_cat WHERE portal LIKE ?';
//               const searchTerm = `%${serviceType}%`;

//               connection.query(partialServiceQuery, [searchTerm], (err, services) => {
//                   if (err) {
//                       return res.status(500).json({ error: 'Database error' });
//                   }

//                   console.log('Matching Services:', services[0].category_name);
//                   console.log('Service Type:', serviceType);

//                   res.json(services);
//               });
//           }
//       }
//   });
// },



// working latest
    //   checkSubscriptionRedirect: (req, res) => {
    //     const ani = req.query.msisdn;
    //     const status = req.query.result;
    //     // const service = req.query.service;

    //     let service = req.query.service; 
  
    //     if (service === 'videos') {
    //         service = 'nvod';
    //     }
    //     console.log("lets check=======", ani, status);
    
    //     const query = 'SELECT * FROM tbl_subscription WHERE ani=? AND service_Type=?';
    //     connection.query(query, [ani, service], (err, results) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Database error' });
    //         }
    
    //         if (results.length === 0) {
    //             return res.status(404).json({ message: 'Data not found' });
    //         }
    
    //         const currentDate = new Date();

    //         const serviceType = results[0].service_type;
    //         const nextBilledDate = new Date(results[0].next_billed_date);
    
    //         if (nextBilledDate <= currentDate) {
    //             return res.status(401).json({ message: 'Subscription expired' });
    //         }
    //          if (serviceType === 'NVOD') {
    //             const videosQuery = `
    //                 SELECT *
    //                 FROM tbl_videos
    //                 WHERE category IN (
    //                     SELECT DISTINCT category
    //                     FROM tbl_videos
    //                 )
    //                 GROUP BY category
    //                 ORDER BY category
    //             `;
    
    //             connection.query(videosQuery, (err, categories) => {
    //                 if (err) {
    //                     return res.status(500).json({ error: 'Database error' });
    //                 }
    
    //                 const groupedVideos = {};
    
    //                 const fetchVideosForCategory = (index) => {
    //                     if (index >= categories.length) {
    //                         res.json(groupedVideos);
    //                         return;
    //                     }
    
    //                     const category = categories[index].category;
    //                     const fetchVideosQuery = `
    //                         SELECT *
    //                         FROM tbl_videos
    //                         WHERE category = ?
    //                         LIMIT 4
    //                     `;
    
    //                     connection.query(fetchVideosQuery, [category], (err, videos) => {
    //                         if (err) {
    //                             return res.status(500).json({ error: 'Database error' });
    //                         }
    
    //                         groupedVideos[category] = videos;
    
    //                         fetchVideosForCategory(index + 1);
    //                     });
    //                 };
    
    //                 fetchVideosForCategory(0);
    //             });
    //         }
    //         else {
    //             const partialServiceQuery = 'SELECT * FROM tbl_cat WHERE portal LIKE ?';
    //             const searchTerm = `%${serviceType}%`;
    
    //             connection.query(partialServiceQuery, [searchTerm], (err, services) => {
    //                 if (err) {
    //                     return res.status(500).json({ error: 'Database error' });
    //                 }
    
    //                 console.log('Matching Services:', services[0].category_name);
    //                 console.log('Service Type:', serviceType);
    
    //                 res.json(services);
    //             });
    //         }
    //     });
    // },
    
      


      
// second wokring perfectlty
    //   checkSubscriptionRedirect: (req, res) => {
    //     const ani = req.query.msisdn;
    //     const status = req.query.result;
    //     const service = req.query.service;
    //     console.log("lets check=======", ani, status);
    
    //     const query = 'SELECT * FROM tbl_subscription WHERE ani=? AND service_Type=?';
    //     connection.query(query, [ani, service], (err, results) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Database error' });
    //         }
    
    //         if (results.length === 0) {
    //             return res.status(404).json({ message: 'Data not found' });
    //         }
    
    //         const serviceType = results[0].service_type;
    
    //         if (serviceType === 'NVOD') {
    //             const videosQuery = `
    //                 SELECT *
    //                 FROM tbl_videos
    //                 WHERE category IN (
    //                     SELECT DISTINCT category
    //                     FROM tbl_videos
    //                 )
    //                 GROUP BY category
    //                 ORDER BY category
    //             `;
    
    //             connection.query(videosQuery, (err, categories) => {
    //                 if (err) {
    //                     return res.status(500).json({ error: 'Database error' });
    //                 }
    
    //                 const groupedVideos = {};
    
    //                 const fetchVideosForCategory = (index) => {
    //                     if (index >= categories.length) {
    //                         res.json(groupedVideos);
    //                         return;
    //                     }
    
    //                     const category = categories[index].category;
    //                     const fetchVideosQuery = `
    //                         SELECT *
    //                         FROM tbl_videos
    //                         WHERE category = ?
    //                         LIMIT 4
    //                     `;
    
    //                     connection.query(fetchVideosQuery, [category], (err, videos) => {
    //                         if (err) {
    //                             return res.status(500).json({ error: 'Database error' });
    //                         }
    
    //                         groupedVideos[category] = videos;
    
    //                         fetchVideosForCategory(index + 1);
    //                     });
    //                 };
    
    //                 fetchVideosForCategory(0);
    //             });
    //         } else {
    //             const partialServiceQuery = 'SELECT * FROM tbl_cat WHERE name LIKE ?';
    //             const searchTerm = `%${serviceType}%`;
    
    //             connection.query(partialServiceQuery, [searchTerm], (err, services) => {
    //                 if (err) {
    //                     return res.status(500).json({ error: 'Database error' });
    //                 }
    
    //                 console.log('Matching Services:', services[0].category_name);
    //                 console.log('Service Type:', serviceType);
    
    //                 res.json(services);
    //             });
    //         }
    //     });
    // },
    
    

    
    // working perfectly
      // checkSubscriptionRedirect: (req, res) => {
      //   const ani = req.query.msisdn;
      //   const status = req.query.result;
      //   const service=req.query.service;
      //   console.log("lets check=======",ani,status)
      //   const query = 'SELECT * FROM tbl_subscription WHERE ani=? AND service_Type=?';
      //   connection.query(query, [ani,service], (err, results) => {
      //     if (err) {
      //       return res.status(500).json({ error: 'Database error' });
      //     }
    
      //     if (results.length === 0) {
      //       return res.status(404).json({ message: 'Data not found' });
      //     }
    
      //     const serviceType = results[0].service_type;
      //     const partialServiceQuery = 'SELECT * FROM tbl_cat WHERE name LIKE ?';
      //     const searchTerm = `%${serviceType}%`;
    
      //     connection.query(partialServiceQuery, [searchTerm], (err, services) => {
      //       if (err) {
      //         return res.status(500).json({ error: 'Database error' });
      //       }
    
      //       console.log('Matching Services:', services[0].category_name);
      //       console.log('Service Type:', serviceType);
    
      //       res.json(services);
      //     });
      //   });
      // },
    
}