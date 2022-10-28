var pg_conn = require('./pg_config');
async function updateProduct(id,name,price,quantity,shop_id) {
    var update_data = {
        text: `UPDATE products SET id = $1, name = $2, quantity = $3, price = $4, shop_id =$5 WHERE id = $1`,
        values: [id,name,quantity,price,shop_id]
    }
    try{
         pg_conn.query(update_data); 
    }
    catch(err){

    }
}
module.exports = updateProduct;
