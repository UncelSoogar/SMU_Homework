CREATE TABLE titles (
    title_id varchar(10) NOT NULL primary key,
    title varchar(50) NULL,
    last_updated TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE department (
    dept_no varchar(10) NOT NULL primary key,
    dept_name varchar(50) NULL,
    last_updated TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees( 
    emp_no int NOT NULL primary key,
	emp_title_id varchar(10) references titles(title_id),
    birth_day date NULL,
    first_name varchar(50) NULL,
    last_name varchar(50) NULL,
    sex varchar(1) NULL,
    hire_date date NULL,
    last_updated TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dept_emp(
	dept_emp_id serial not null primary key,
	emp_no int null references employees(emp_no),
	dept_no varchar(5) null references department(dept_no),
    last_updated TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dept_manager(
	dept_manager_id serial not null primary key,
	dept_no varchar(5) null references department(dept_no),
	emp_no int null references employees(emp_no),
    last_updated TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salaries(
	salary_id serial not null primary key,
	emp_no int references employees(emp_no),
	salary int null,
	last_updated TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

