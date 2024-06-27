const {connection} = require('../db');

module.exports={
    addToWatchlist: (req, res) => {
        const { ani, videoid, datetime,portal } = req.body;
        console.log("=========",req.body)
        if (ani && videoid && datetime && portal) {
          const query = 'INSERT INTO tbl_wishlist (ani, videoid, datetime,portal) VALUES (?, ?, ?, ?)';
    
          connection.query(query, [ani, videoid, datetime,portal], (err, results) => {
            if (err) {
              console.error('Database query error:', err);
              res.status(500).json({ error: 'Error adding video to watchlist' });
            } else {
              res.status(201).json({ message: 'Video added to watchlist' });
            }
          });
        } else {
          res.status(400).json({ error: 'Invalid video data' });
        }
      },


      getWatchlist: (req, res) => {
        const ani = req.params.ani;
        const desiredPortal = req.params.portal; // Assuming portal comes through params
        console.log("params",req.params)
        const query = 'SELECT * FROM tbl_wishlist wl JOIN tbl_videos v ON wl.videoid = v.videoid WHERE wl.ani = ? AND wl.portal = ? ORDER BY wl.datetime DESC';
        
      
        connection.query(query, [ani,desiredPortal], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            // Filter the results based on the desired portal value
            const filteredResults = results.filter(result => result.portal === desiredPortal);
      
            res.json(filteredResults);
          }
        });
      },
      

      // getWatchlist: (req, res) => {
      //   const ani = req.params.ani;
      //   const query ='SELECT * FROM tbl_wishlist wl JOIN tbl_videos v ON wl.videoid = v.videoid WHERE wl.ani = ? ORDER BY wl.datetime DESC'
      
  
      //   connection.query(query, [ani], (error, results) => {
      //     if (error) {
      //       console.error('Error executing the query:', error);
      //       res.status(500).json({ error: 'Error fetching data from the database' });
      //     } else {
      //       res.json(results);
      //     }
      //   });
      // },
      

// working 
      // getWatchlist: (req, res) => {
      //   const ani = req.params.ani;
      //   const query = 'SELECT * FROM tbl_wishlist wl JOIN tbl_videos v ON wl.videoid = v.videoid WHERE wl.ani = ? ORDER BY wl.datetime DESC';
    
      //   connection.query(query, ani, (error, results) => {
      //     if (error) {
      //       console.error('Error executing the query:', error);
      //       res.status(500).json({ error: 'Error fetching data from the database' });
      //     } else {
      //       res.json(results);
      //     }
      //   });
      // },

      removeFromWatchlist: (req, res) => {
        const videoId = req.params.videoId;
        const query = 'DELETE FROM tbl_wishlist WHERE videoid = ?';
    
        connection.query(query, videoId, (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Error removing video from watchlist' });
          } else {
            res.status(200).json({ message: 'Video removed from watchlist' });
          }
        });
      },

      
  checkVideoInWatchlist: (req, res) => {
    const ani = req.params.ani;
    const videoid = req.params.videoid;

    const query = 'SELECT * FROM tbl_wishlist WHERE ani = ? AND videoid = ?';
    connection.query(query, [ani, videoid], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error checking video in watchlist' });
      } else {
        const exists = results.length > 0;
        res.json({ exists });
      }
    });
  },
}