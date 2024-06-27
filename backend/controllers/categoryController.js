const {connection} = require('../db');

module.exports={
    getCategories: (req, res) => {
        const query = 'SELECT * FROM tbl_cat';
        connection.query(query, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },


      getCategoryName: (req, res) => {
        const id=req.params.id

        const query = 'SELECT NAME FROM tbl_cat WHERE category_name= ?';
        connection.query(query,id, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      getVideosBySubcategory: (req, res) => {
        const selectedSubcategoryId = req.params.subcategoryId;
        const query = 'SELECT * FROM tbl_videos WHERE sub_cat_id = ?';
        connection.query(query, selectedSubcategoryId, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            res.json(results);
          }
        });
      },

      getSubcategoriesByCategory: (req, res) => {
        const selectedCategoryName = req.params.categoryName;
        const getCategoryQuery = 'SELECT category_name FROM tbl_cat WHERE category_name = ?';
    
        connection.query(getCategoryQuery, selectedCategoryName, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
          } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Category not found' });
            } else {
              const categoryId = results[0].category_name;
              const query = 'SELECT * FROM tbl_sub_cat WHERE parent_cat_id = ?';
    
              connection.query(query, categoryId, (error, subcategoryResults) => {
                if (error) {
                  console.error('Error executing the query:', error);
                  res.status(500).json({ error: 'Error fetching data from the database' });
                } else {
                  res.json(subcategoryResults);
                }
              });
            }
          }
        });
      },
}