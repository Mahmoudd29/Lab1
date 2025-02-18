function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteEmployee(item.id)); // Add event listener to delete button
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload
  createEmployee();
});

// TODO
// add event listener to delete button
// This is handled in the fetchEmployees function above

// TODO

function createEmployee() {
  const id = document.getElementById('id').value; 
  const name = document.getElementById('name').value;
  const errorMessage = document.getElementById('error-message');

  // Clear previous errors
  errorMessage.textContent = '';

  // Validate input fields
  if (!id || !name) {
    errorMessage.textContent = 'Please enter both ID and Name.';
    return;
  }

  // Send data to backend
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Employee created successfully') {
      fetchEmployees(); 
      document.getElementById('id').value = '';
      document.getElementById('name').value = '';
    } else {
      errorMessage.textContent = data.message; 
    }
  })
  .catch(error => {
    errorMessage.textContent = 'Something went wrong. Please try again.';
  });
}



// TODO
function deleteEmployee (id){
  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Employee deleted successfully') {
      // call fetchEmployees
      fetchEmployees();
    } else {
      console.error('Error deleting employee:', data.message);
    }
  })
  .catch(error => console.error('Error:', error));
}

fetchEmployees()