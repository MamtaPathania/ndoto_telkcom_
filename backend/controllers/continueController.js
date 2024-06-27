const {connection} = require('../db');

module.exports={
 

    getContinueVideos: (req, res) => {
      const ani = req.params.ani;
      const beautyParam = req.params.beautyParam;
    
      const query =
        'SELECT DISTINCT v.*, vl.createddatetime  FROM tbl_video_logging vl, tbl_videos v WHERE vl.videoid = v.videoid AND vl.ani = ? AND vl.channel LIKE ? ORDER BY vl.createddatetime DESC';
    
      const wildcardeconnectioneautyParam = '%' + beautyParam + '%'; // Adding wildcards
    
      connection.query(query, [ani, wildcardeconnectioneautyParam], (error, results) => {
        if (error) {
          console.error('Error executing the query:', error);
          res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
          res.json(results);
        }
      });
    },
    
    
    
    

      deleteVideoLog: (req, res) => {
        const { videoid, ani } = req.params;
    
        const deleteQuery = 'DELETE FROM tbl_video_logging WHERE videoid = ? AND ani = ?';
        connection.query(deleteQuery, [videoid, ani], (error, results) => {
          if (error) {
            console.error('Database delete error:', error);
            res.status(500).json({ message: 'Database error' });
          } else {
            res.json({ message: 'Video log deleted successfully' });
          }
        });
      },

      addVideoLogging: (req, res) => {
        const { videoid, ani, createddatetime, type, view, channel, portal } = req.body;

        console.log("body",req.body)
    
        const query =
          'INSERT INTO tbl_video_logging (videoid, ani, createddatetime, type, view, channel, portal) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [videoid, ani, createddatetime, type, view, channel, portal];
    
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ message: 'Database error' });
          } else {
            res.json({ message: 'Video log added successfully' });
          }
        });
      },
    
    
}