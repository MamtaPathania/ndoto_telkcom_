const {connection} = require('../db');

module.exports = {
    // getVideosGroupeconnectionyCategoryAndSubcategory: (req, res) => {
    //     connection.query('SELECT category_name, name FROM tbl_cat', (err, categories) => {
    //         if (err) {
    //             console.error('Error executing the query:', err);
    //             return res.status(500).json({ error: 'Error fetching data from the database' });
    //         }

    //         let results = [];
    //         let processedCategories = 0;

    //         if (categories.length === 0) {
    //             return res.json([]);  // No categories to process
    //         }

    //         categories.forEach(category => {
    //             connection.query('SELECT sub_cat_name, sub_cat_id FROM tbl_sub_cat WHERE parent_cat_id = ?', [category.category_name], (err, subCategories) => {
    //                 if (err) {
    //                     console.error('Error executing the query:', err);
    //                     return res.status(500).json({ error: 'Error fetching sub-categories from the database' });
    //                 }

    //                 let processedSubCategories = 0;

    //                 if (subCategories.length === 0) {
    //                     processedCategories++;
    //                     if (processedCategories === categories.length) {
    //                         return res.json(results);  // All categories processed
    //                     }
    //                 } else {
    //                     subCategories.forEach(subCategory => {
    //                         connection.query('SELECT * FROM tbl_videos WHERE sub_cat_id = ? LIMIT 3', [subCategory.sub_cat_id], (err, videos) => {
    //                             if (err) {
    //                                 console.error('Error executing the query:', err);
    //                                 return res.status(500).json({ error: 'Error fetching videos from the database' });
    //                             }

    //                             results.push({
    //                                 category: category.category_name,
    //                                 categoryName: category.name,
    //                                 subCategory: subCategory.sub_cat_name,
    //                                 subCategoryId: subCategory.sub_cat_id,  // Added this
    //                                 videos: videos
    //                             });

    //                             processedSubCategories++;
    //                             if (processedSubCategories === subCategories.length) {
    //                                 processedCategories++;
    //                                 if (processedCategories === categories.length) {
    //                                     return res.json(results);  // All categories and their sub-categories processed
    //                                 }
    //                             }
    //                         });
    //                     });
    //                 }
    //             });
    //         });
    //     });
    // },




    getvideos: (req, res) => {
        const categoryid=req.params.categoryid
    
        const query = 'SELECT * FROM tbl_videos WHERE sub_cat_id= ?';
        connection.query(query,categoryid, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      getCategories: (req, res) => {
    
        const query = 'SELECT * FROM tbl_cat';
        connection.query(query,categoryid, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      getSubtCategories: (req, res) => {
       const id=req.params.id
        const query = 'SELECT * FROM tbl_sub_cat WHERE parent_cat_id = ?';
        connection.query(query,id, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      getSubCategoriesAndVideos: (req, res) => {
        const id = req.params.id;  // Assuming you're passing the parent_cat_id or category as a route parameter
    
        const subCategoriesQuery = 'SELECT sub_cat_id, sub_cat_name FROM tbl_sub_cat WHERE parent_cat_id = ?';
    
        connection.query(subCategoriesQuery, [id], (subCatError, subCategories) => {
            if (subCatError) {
                console.error('Error fetching subcategories:', subCatError);
                return res.status(500).json({ error: 'Error fetching subcategories' });
            }
    
            // Array to hold promises for each subcategory video fetching
            const videoPromises = [];
    
            subCategories.forEach(subCat => {
                const videoPromise = new Promise((resolve, reject) => {
                    const videosQuery = 'SELECT * FROM tbl_videos WHERE sub_cat_id = ?';
    
                    connection.query(videosQuery, [subCat.sub_cat_id], (videosError, videos) => {
                        if (videosError) {
                            reject(videosError);
                        } else {
                            resolve({
                                sub_cat_id: subCat.sub_cat_id,
                                sub_cat_name: subCat.sub_cat_name,  // Using the correct column name here
                                videos: videos
                            });
                        }
                    });
                });
    
                videoPromises.push(videoPromise);
            });
    
            Promise.all(videoPromises)
                .then(results => {
                    res.json(results);
                })
                .catch(error => {
                    console.error('Error fetching videos:', error);
                    res.status(500).json({ error: 'Error fetching videos for subcategories' });
                });
        });
    },
    
    

  getLatest: (req, res) => {

    const query = 'SELECT * FROM tbl_videos ORDER BY id DESC LIMIT 8';

    connection.query(query, (error, results) => {
      if (error) {
        return res.json({ error: 'Failed to fetch videos' });
      }
      res.json(results);
    });
  },

  getLogo: (req, res) => {

    const query = 'SELECT * FROM tbl_logo ';

    connection.query(query, (error, results) => {
      if (error) {
        return res.json({ error: 'Failed to fetch videos' });
      }
      res.json(results);
    });
  },

      

      






};



