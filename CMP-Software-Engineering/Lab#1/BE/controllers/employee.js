const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employee.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  // Check if ID already exists
  const existingEmployee = employee.find(emp => emp.id === id);
  if (existingEmployee) {
    return res.status(400).json({ message: 'Employee ID already exists' });
  }

  if (id && name) {
    employee.push({ id, name });
    return res.status(201).json({ message: 'Employee created successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid employee data' });
  }
};

