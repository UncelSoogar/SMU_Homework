--QUERY 1: Employee name, sex, and salary
SELECT
	e.emp_no,
	e.last_name,
	e.first_name,
	e.sex,
	s.salary,
	e.last_updated
FROM
	employees as e
JOIN salaries as s ON s.emp_no = e.emp_no
;

--QUERY 2: employee names and hire date if hired in 1986

SELECT
	emp_no,
	first_name,
	last_name,
	hire_date,
	last_updated
FROM
	employees
WHERE
	hire_date between '1986-01-01' and '1986-12-31'
	;
	
--QUERY 3: Deptartment, manager, man. name, title

SELECT
	d.dept_no,
	d.dept_name,
	e.emp_no,
	e.last_name,
	e.first_name,
	t.title,
	e.last_updated
FROM
	employees as e
JOIN titles as t on t.title_id = e.emp_title_id
JOIN dept_manager as dm on dm.emp_no = e.emp_no
JOIN department as d on d.dept_no = dm.dept_no
;

--QUERY 4: employee num &name, dept num & name

SELECT
	d.dept_no,
	d.dept_name,
	e.emp_no,
	e.last_name,
	e.first_name,
	e.last_updated
FROM
	employees as e
JOIN dept_emp as de on de.emp_no = e.emp_no
JOIN department as d on d.dept_no = de.dept_no
;

--QUERY 5 list name and sex for all employees named Hercules B

SELECT
	emp_no,
	first_name,
	last_name,
	sex
FROM
	employees
WHERE 
	first_name = 'Hercules' and last_name like 'B%'
;

--QUERY 6: list employee name, num, and dept for employees in sales

SELECT
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
FROM
	employees as e
JOIN dept_emp as de ON de.emp_no = e.emp_no
JOIN department as d ON d.dept_no = de.dept_no
WHERE
	dept_name = 'Sales'
;

--QUERY 7: List employee num, name, and dept name for in Sales or Development

SELECT
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
FROM
	employees as e
JOIN dept_emp as de ON de.emp_no = e.emp_no
JOIN department as d ON d.dept_no = de.dept_no
WHERE
	dept_name = 'Sales' or dept_name = 'Development'
;

--QUERY 8: list unique last names and their frequency

SELECT
	last_name,
	count(last_name) as name_count
FROM
	employees
Group by last_name
Order by name_count Desc 
;

--BONUS QUERY: Find info on emp_no 499942
SELECT
	*
FROM
	employees
WHERE
	emp_no = 499942;