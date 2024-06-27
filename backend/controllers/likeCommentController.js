const {connection} = require('../db');

module.exports = {
  postComment: (req, res) => {
    const { name, videoid, comment, datetime, portal } = req.body; // Correct property names
    console.log("hiiiii")
    console.log("body",req.body)

    if (name && videoid && datetime && portal) {
      const query = 'INSERT INTO tbl_comment (name, videoid, comment,datetime, portal) VALUES (?, ?, ?,?, ?)'; // Use correct column names

      connection.query(query, [name, videoid, comment,datetime,portal], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          res.status(500).json({ error: 'Error adding video to watchlist' });
        } else {
          res.status(201).json({ message: 'Video added to watchlist' });
        }
      });
    } else {
      res.status(400).json({ error: 'Missing required fields' }); // Return a proper response for missing fields
    }
  },

  postLike: (req, res) => {
    const { name, videoid,datetime, category, portal, like } = req.body;

    if (name && videoid && category && portal !== undefined) {
      if (like === 1) {
        // If like is 1, insert a new like
        const query = 'INSERT INTO tbl_like (name, videoid,datetime, `like`, category, portal) VALUES (?, ?, ?, ?, ?,?)';
        
        connection.query(query, [name, videoid,datetime, like, category, portal], (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Error adding like' });
          } else {
            res.status(201).json({ message: 'Like added successfully' });
          }
        });
      } else if (like === 0) {
        // If like is 0, delete the like
        const deleteQuery = 'DELETE FROM tbl_like WHERE name = ? AND videoid = ?';
        
        connection.query(deleteQuery, [name, videoid], (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Error deleting like' });
          } else {
            res.status(204).send(); // Send a success response with no content
          }
        });
      }
    } else {
      res.status(400).json({ error: 'Invalid request data' });
    }
  },


  getComments: (req, res) => {
    const id=req.params.id
    
 
    const query = 'SELECT * FROM tbl_comment WHERE videoid= ?';
    connection.query(query,id, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.json(results);
      }
    });
  },

  




};
