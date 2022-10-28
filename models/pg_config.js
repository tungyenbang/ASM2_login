const Pool   = require('pg').Pool;

const pg_conn = new Pool({

  user: 'sghfoofefdhddu',
  host: 'ec2-3-229-165-146.compute-1.amazonaws.com',
  database: 'desvrm7cgbmfaf',
  password: '72a1cbaa204301a52ece6f60cf36218c6e0f13ed58ad661a5062739b52622bb6',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = pg_conn;