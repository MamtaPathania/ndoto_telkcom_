const {connection} = require('../db');

module.exports={
    getSingleVideo: (req, res) => {
        const videoid = req.params.videoid;
        const query = 'SELECT * FROM tbl_videos WHERE videoid = ?';
        connection.query(query, videoid, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      searchVideos: (req, res) => {
        const cat = req.params.cat;
        const searchQuery = req.query.searchQuery || '';
    
        const query = 'SELECT * FROM tbl_videos WHERE category = ? AND NAME LIKE ?';
        const values = [cat, `%${searchQuery}%`];
    
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

    streamSearch: (req, res) => {
        const searchQuery = req.query.searchQuery || '';
        console.log(searchQuery)
        const query = 'SELECT * FROM tbl_videos WHERE name LIKE ? '
        const values = [`%${searchQuery}%`];
      
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      
      
  getTerms: (req, res) => {
    const query = 'SELECT * FROM tbl_terms';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.json(results);
      }
    });
  },
}