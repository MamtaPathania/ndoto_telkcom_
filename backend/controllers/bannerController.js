const {connection} = require('../db');

module.exports={
    getBanners: (req, res) => {
        const category=req.params.category
        
        console.log("++++++++++++",req.params)
        const query = 'SELECT * FROM tbl_teaser WHERE video_cat= ?';
        connection.query(query,category, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },



      getLogo: (req, res) => {
        const service=req.params.service
        
        console.log("++++++++++++",req.params)
        const query = 'SELECT logourl FROM tbl_logo WHERE service= ?';
        connection.query(query,service, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      // getLogo: (req, res) => {
      //   const category=req.params.category
        
      //   console.log("++++++++++++",req.params)
      //   const query = 'SELECT tl.logourl FROM tbl_cat tc JOIN tbl_logo tl ON tc.sr_no = tl.cat_id WHERE tc.category_name = ?';
      //   db.query(query,category, (error, results) => {
      //     if (error) {
      //       console.error('Error executing the query:', error);
      //       res.status(500).json({ error: 'Error fetching data from the database' });
      //     } else {
      //       res.json(results);
      //     }
      //   });
      // },



      getRandomTeasers: (req, res) => {
        const query = 'SELECT imgurl FROM tbl_teaser ORDER BY RAND() LIMIT 7';
        connection.query(query, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            const imgUrls = results.map(row => row.imgurl);
            res.json(imgUrls);
          }
        });
      }

      
}