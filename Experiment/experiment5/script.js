let employees = [];

function addEmployee() {
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let salary = parseFloat(document.getElementById("salary").value);
    let dept = document.getElementById("dept").value;

    if (name === "" || id === "" || isNaN(salary) || dept === "") {
        alert("Please fill all fields correctly!");
        return;
    }
    let employee = {
        name: name,
        id: id,
        salary: salary,
        dept: dept
    };
    employees.push(employee);
    alert("Employee Added Successfully!");
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("dept").value = "";
}
function displayEmployees() {
    let output = "<h3>All Employees</h3>";

    employees.forEach(emp => {
        output += `Name: ${emp.name} | ID: ${emp.id} | Salary: ₹${emp.salary} | Dept: ${emp.dept} <br>`;
    });

    document.getElementById("output").innerHTML = output;
}
function filterSalary() {
    let filtered = employees.filter(emp => emp.salary > 50000);

    let output = "<h3>Employees with Salary > ₹50,000</h3>";

    filtered.forEach(emp => {
        output += `Name: ${emp.name} | Salary: ₹${emp.salary} <br>`;
    });

    document.getElementById("output").innerHTML = output;
}
function totalSalary() {
    let total = employees.reduce((sum, emp) => sum + emp.salary, 0);

    document.getElementById("output").innerHTML =
        `<h3>Total Salary Payout: ₹${total}</h3>`;
}
function avgSalary() {
    if (employees.length === 0) return;

    let total = employees.reduce((sum, emp) => sum + emp.salary, 0);
    let avg = total / employees.length;

    document.getElementById("output").innerHTML =
        `<h3>Average Salary: ₹${avg.toFixed(2)}</h3>`;
}
function countByDept() {
    let deptCount = {};

    employees.forEach(emp => {
        deptCount[emp.dept] = (deptCount[emp.dept] || 0) + 1;
    });

    let output = "<h3>Employee Count by Department</h3>";

    for (let dept in deptCount) {
        output += `${dept}: ${deptCount[dept]} <br>`;
    }

    document.getElementById("output").innerHTML = output;
}