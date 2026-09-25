// ============================================================
// JAVA DATABASE & SQL LESSONS (Modules 25 - 26)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const DATABASE_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 25: SQL for Java Developers ─────────────────────
  'java-sql': {
    intro: 'Every backend Java developer works directly with relational databases (RDBMS). Mastering SQL querying, table joins, grouping, indexing, normalization, and ACID properties is mandatory for technical interviews and day-to-day enterprise development.',
    keyConcepts: [
      { term: 'SQL Query Order of Execution', definition: 'FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT. Understanding this order clarifies why aliases can\'t be used in WHERE.', example: 'FROM emp WHERE sal > 50000 SELECT name' },
      { term: 'INNER vs LEFT vs RIGHT JOIN', definition: 'INNER JOIN: returns rows with matches in both tables. LEFT JOIN: all rows from left table + matched from right (NULL if no match). RIGHT JOIN: all from right + matched from left.', example: 'SELECT * FROM orders o LEFT JOIN customers c ON o.cust_id = c.id' },
      { term: 'WHERE vs HAVING', definition: 'WHERE filters individual records BEFORE aggregation. HAVING filters aggregated groups AFTER GROUP BY.', example: 'WHERE status = "ACTIVE" ... HAVING COUNT(*) > 5' },
      { term: 'ACID Properties', definition: 'Atomicity (all or nothing), Consistency (data invariants preserved), Isolation (concurrent transactions don\'t collide), Durability (committed data survives crashes).', example: 'Bank fund transfers must be ACID' },
      { term: 'Database Indexes', definition: 'B-Tree data structures that drastically speed up SELECT queries from O(n) table scan to O(log n) index seek, at the cost of slower writes (INSERT/UPDATE).', example: 'CREATE INDEX idx_user_email ON users(email);' },
      { term: 'Normalization (1NF, 2NF, 3NF)', definition: 'Database design technique to eliminate redundancy and update anomalies. 1NF: atomic values. 2NF: 1NF + no partial key dependencies. 3NF: 2NF + no transitive dependencies.', example: '3NF avoids repeating customer address across order rows' },
    ],
    codeExamples: [
      {
        title: 'Second Highest Salary & Aggregation Queries',
        code: `-- Finding 2nd highest salary using DENSE_RANK or Subquery
SELECT MAX(salary) AS SecondHighestSalary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Alternative using DENSE_RANK()
WITH RankedSalaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank_num
    FROM employees
)
SELECT salary FROM RankedSalaries WHERE rank_num = 2;

-- GROUP BY with HAVING
SELECT department_id, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
FROM employees
WHERE status = 'ACTIVE'
GROUP BY department_id
HAVING COUNT(*) >= 5
ORDER BY avg_sal DESC;`,
        output: `-- Query result for 2nd highest salary:
-- SecondHighestSalary: 95000.00`,
        note: 'DENSE_RANK() handles duplicate highest salaries correctly.'
      }
    ],
    commonMistakes: [
      'Using WHERE instead of HAVING to filter aggregate values like COUNT(*) or AVG().',
      'Using = NULL instead of IS NULL (in SQL, NULL = NULL yields UNKNOWN, never TRUE).',
      'Creating redundant indexes on every column, degrading INSERT and UPDATE performance.',
    ],
    interviewTips: [
      '"What is the difference between DELETE and TRUNCATE?" -> DELETE is a DML statement, slower, logs each row deletion, supports WHERE clause, and can be rolled back. TRUNCATE is DDL, deallocates entire data pages, resets identity counters, does not support WHERE, and is faster.',
    ],
    interviewQuestions: [
      { q: 'What is the N+1 query problem and how does SQL/ORM solve it?', a: 'Occurs when an application executes 1 query to fetch N parent records, and then fires N separate queries to fetch children for each parent (N+1 queries total). Solved in SQL using JOINs and in JPA/Hibernate using "JOIN FETCH" or "@EntityGraph".' },
      { q: 'Explain Database Isolation Levels and the phenomena they prevent.', a: 'Levels from weakest to strongest: Read Uncommitted (dirty reads allowed), Read Committed (default in Postgres/Oracle; prevents dirty reads), Repeatable Read (default in MySQL InnoDB; prevents non-repeatable reads), Serializable (prevents phantom reads; slowest, strict locks).' },
    ],
    revisionPoints: [
      'Execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT',
      'WHERE filters rows; HAVING filters aggregated groups',
      'ACID: Atomicity, Consistency, Isolation, Durability',
      'NULL comparison must use IS NULL / IS NOT NULL',
    ]
  },

  // ── MODULE 26: JDBC & Transactions ─────────────────────────
  'java-jdbc': {
    intro: 'JDBC (Java Database Connectivity) is the standard Java API for connecting to relational databases. It defines interfaces like Connection, Statement, PreparedStatement, and ResultSet that database driver vendors implement.',
    keyConcepts: [
      { term: 'PreparedStatement vs Statement', definition: 'PreparedStatement precompiles the SQL query template and uses parameterized placeholders (?), completely preventing SQL Injection and allowing query plan reuse.', example: 'PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?"); ps.setInt(1, id);' },
      { term: 'SQL Injection Prevention', definition: 'PreparedStatement treats parameterized input strictly as literal values rather than executable SQL syntax, neutralizing malicious input.', example: 'ps.setString(1, userInput);' },
      { term: 'Connection Pool', definition: 'Maintaining a cache of open, reusable database connections (e.g. HikariCP, the default in Spring Boot) rather than opening/closing expensive physical TCP connections for every request.', example: 'HikariDataSource' },
      { term: 'Transaction Management', definition: 'Disabling auto-commit on Connection (conn.setAutoCommit(false)), executing multiple queries, and then calling conn.commit() or conn.rollback() on exception.', example: 'conn.setAutoCommit(false); try { ... conn.commit(); } catch(e) { conn.rollback(); }' },
      { term: 'ResultSet', definition: 'Cursor pointing to table of data generated by executing a database query. Navigated using rs.next().', example: 'while (rs.next()) { String name = rs.getString("name"); }' },
    ],
    codeExamples: [
      {
        title: 'Secure JDBC Transaction with PreparedStatement',
        code: `import java.sql.*;

public class JDBCTransactionDemo {
    public static void transferFunds(Connection conn, int fromAcc, int toAcc, double amount) throws SQLException {
        // Step 1: Disable Auto-Commit for Transaction
        conn.setAutoCommit(false);

        String debitSql = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        String creditSql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";

        try (PreparedStatement debitStmt = conn.prepareStatement(debitSql);
             PreparedStatement creditStmt = conn.prepareStatement(creditSql)) {

            // Debit
            debitStmt.setDouble(1, amount);
            debitStmt.setInt(2, fromAcc);
            debitStmt.executeUpdate();

            // Credit
            creditStmt.setDouble(1, amount);
            creditStmt.setInt(2, toAcc);
            creditStmt.executeUpdate();

            // Commit all changes together
            conn.commit();
            System.out.println("Funds transferred successfully: $" + amount);

        } catch (SQLException e) {
            conn.rollback(); // Rollback if any step fails
            System.err.println("Transaction rolled back due to error: " + e.getMessage());
            throw e;
        } finally {
            conn.setAutoCommit(true);
        }
    }
}`,
        output: 'Funds transferred successfully: $250.0',
        note: 'PreparedStatement guarantees immunity against SQL injection.'
      }
    ],
    commonMistakes: [
      'Using simple Statement and string concatenation with user input, introducing severe SQL Injection vulnerabilities.',
      'Forgetting to close Connection, Statement, and ResultSet objects, causing connection leaks that crash production servers.',
      'Opening a new physical JDBC connection per HTTP request instead of using a connection pool like HikariCP.',
    ],
    interviewTips: [
      '"Why is PreparedStatement faster than Statement?" -> PreparedStatement is pre-compiled by the database engine once; subsequent queries with different parameters reuse the cached query execution plan.',
    ],
    interviewQuestions: [
      { q: 'How does PreparedStatement prevent SQL injection attacks in Java?', a: 'PreparedStatement compiles the SQL statement structure beforehand. Parameters supplied via setString(), setInt(), etc. are sent separately and treated by the database parser strictly as literal values/data, never as executable SQL commands, making injection impossible.' },
    ],
    revisionPoints: [
      'Always use PreparedStatement instead of Statement',
      'Never concatenate strings into SQL queries',
      'Manage transactions via conn.setAutoCommit(false), commit(), rollback()',
      'Use HikariCP connection pooling in production',
    ]
  },
};
