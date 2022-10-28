const pg_conn = require("./pg_config");

async function insertFunc(id, name, price, quantity, shop_id){
    const ins_query=
    {
        text: 'INSERT INTO products (id,name,price, quantity, shop_id) VALUES ($1, $2, $3, $4, $5)',
        values: [id, name, price, quantity, shop_id]
    };
    var query_data = await pg_conn.query(ins_query);
    console.log(query_data);
    return;
}

module.exports=insertFunc;