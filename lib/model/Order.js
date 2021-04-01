const pool = require('../utils/pool');

module.exports = class Order {
    id;
    quantity;

    constructor(row) {
        this.id =row.id;
        this.quantity= row.quantity
    }

    static async insert(order){
        const {
            rows,
        } = await pool.query('INSERT INTO orders (quantity) VALUES ($1) RETURNING *', [order.quantity]
        );

        return new Order(rows[0]);
    }

    static async select(){
        const {
            rows,
        } = await pool.query('SELECT * FROM orders',
        );

        return rows.map(row => new Order(row))
}
}