// Section navigation
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden-section');
    });
    document.getElementById(sectionId).classList.add('active-section');
    document.getElementById(sectionId).classList.remove('hidden-section');
}

// Product management
let products = [];
let inventory = {};
let orders = [];

// Employee management
let employees = [];

// Supplier management
let suppliers = [];

// Logistics management
let deliveries = [];

// Quality control management
let qualityRecords = [];

// Equipment management
let equipmentList = [];

// Finance management
let financeRecords = [];
function updateFinanceTable() {
    const tbody = document.querySelector('#financeTable tbody');
    tbody.innerHTML = '';
    let totalSales = 0;
    let totalExpenses = 0;
    financeRecords.forEach((rec, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${rec.date}</td><td>${rec.type}</td><td>${rec.amount}</td><td>${rec.desc}</td><td><button onclick="deleteFinance(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
        if (rec.type === 'Sale') totalSales += Number(rec.amount);
        if (rec.type === 'Expense') totalExpenses += Number(rec.amount);
    });
    document.getElementById('totalSales').textContent = `Total Sales: $${totalSales}`;
    document.getElementById('totalExpenses').textContent = `Total Expenses: $${totalExpenses}`;
    document.getElementById('netProfit').textContent = `Net Profit: $${totalSales - totalExpenses}`;
}

document.getElementById('financeForm').onsubmit = function(e) {
    e.preventDefault();
    const date = document.getElementById('financeDate').value;
    const amount = document.getElementById('financeAmount').value;
    const type = document.getElementById('financeType').value;
    const desc = document.getElementById('financeDesc').value;
    financeRecords.push({ date, amount, type, desc });
    updateFinanceTable();
    this.reset();
};

function deleteFinance(idx) {
    financeRecords.splice(idx, 1);
    updateFinanceTable();
}
function updateEquipmentTable() {
    const tbody = document.querySelector('#equipmentTable tbody');
    tbody.innerHTML = '';
    equipmentList.forEach((eq, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${eq.name}</td><td>${eq.type}</td><td>${eq.lastMaint}</td><td>${eq.nextMaint}</td><td>${eq.status}</td><td><button onclick="deleteEquipment(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('equipmentForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('equipmentName').value;
    const type = document.getElementById('equipmentType').value;
    const lastMaint = document.getElementById('equipmentLastMaint').value;
    const nextMaint = document.getElementById('equipmentNextMaint').value;
    const status = document.getElementById('equipmentStatus').value;
    equipmentList.push({ name, type, lastMaint, nextMaint, status });
    updateEquipmentTable();
    this.reset();
};

function deleteEquipment(idx) {
    equipmentList.splice(idx, 1);
    updateEquipmentTable();
}
function updateQualityTable() {
    const tbody = document.querySelector('#qualityTable tbody');
    tbody.innerHTML = '';
    qualityRecords.forEach((q, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${q.product}</td><td>${q.batch}</td><td>${q.date}</td><td>${q.inspector}</td><td>${q.result}</td><td>${q.notes}</td><td><button onclick="deleteQuality(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('qualityForm').onsubmit = function(e) {
    e.preventDefault();
    const product = document.getElementById('qcProduct').value;
    const batch = document.getElementById('qcBatch').value;
    const date = document.getElementById('qcDate').value;
    const inspector = document.getElementById('qcInspector').value;
    const result = document.getElementById('qcResult').value;
    const notes = document.getElementById('qcNotes').value;
    qualityRecords.push({ product, batch, date, inspector, result, notes });
    updateQualityTable();
    this.reset();
};

// Safety/Compliance Documentation
let safetyDocs = [];

function updateSafetyTable() {
    const tbody = document.querySelector('#safetyTable tbody');
    tbody.innerHTML = '';
    safetyDocs.forEach((doc, idx) => {
        let fileCell = '';
        if (doc.fileType.startsWith('image/')) {
            fileCell = `<a href="${doc.fileUrl}" target="_blank"><img src="${doc.fileUrl}" alt="${doc.title}" style="width:40px;height:40px;object-fit:cover;"></a>`;
        } else if (doc.fileType === 'application/pdf') {
            fileCell = `<a href="${doc.fileUrl}" target="_blank">PDF</a>`;
        } else {
            fileCell = `<a href="${doc.fileUrl}" target="_blank">File</a>`;
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${doc.title}</td><td>${fileCell}</td><td><button onclick="deleteSafetyDoc(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('safetyForm').onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('safetyTitle').value;
    const fileInput = document.getElementById('safetyFile');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            safetyDocs.push({ title, fileUrl: ev.target.result, fileType: file.type });
            updateSafetyTable();
        };
        reader.readAsDataURL(file);
    }
    this.reset();
};

function deleteSafetyDoc(idx) {
    safetyDocs.splice(idx, 1);
    updateSafetyTable();
}

function deleteQuality(idx) {
    qualityRecords.splice(idx, 1);
    updateQualityTable();
}
function updateLogisticsTable() {
    const tbody = document.querySelector('#logisticsTable tbody');
    tbody.innerHTML = '';
    deliveries.forEach((d, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${d.product}</td><td>${d.driver}</td><td>${d.vehicle}</td><td>${d.date}</td><td>${d.status}</td><td><button onclick="deleteDelivery(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('logisticsForm').onsubmit = function(e) {
    e.preventDefault();
    const product = document.getElementById('deliveryProduct').value;
    const driver = document.getElementById('deliveryDriver').value;
    const vehicle = document.getElementById('deliveryVehicle').value;
    const date = document.getElementById('deliveryDate').value;
    const status = document.getElementById('deliveryStatus').value;
    deliveries.push({ product, driver, vehicle, date, status });
    updateLogisticsTable();
    this.reset();
};

function deleteDelivery(idx) {
    deliveries.splice(idx, 1);
    updateLogisticsTable();
}
function updateSupplierTable() {
    const tbody = document.querySelector('#supplierTable tbody');
    tbody.innerHTML = '';
    suppliers.forEach((sup, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${sup.name}</td><td>${sup.contact}</td><td>${sup.products}</td><td><button onclick="deleteSupplier(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('supplierForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('supplierName').value;
    const contact = document.getElementById('supplierContact').value;
    const products = document.getElementById('supplierProducts').value;
    suppliers.push({ name, contact, products });
    updateSupplierTable();
    this.reset();
};

function deleteSupplier(idx) {
    suppliers.splice(idx, 1);
    updateSupplierTable();
}
function updateEmployeeTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    employees.forEach((emp, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="${emp.photo || ''}" alt="${emp.name}" style="width:40px;height:40px;object-fit:cover;"></td><td>${emp.name}</td><td>${emp.role}</td><td>${emp.contact}</td><td><button onclick="deleteEmployee(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('employeeForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('employeeName').value;
    const role = document.getElementById('employeeRole').value;
    const contact = document.getElementById('employeeContact').value;
    const photoInput = document.getElementById('employeePhoto');
    const file = photoInput.files[0];
    if (file) {
        readImageFile(file, function(dataUrl) {
            employees.push({ name, role, contact, photo: dataUrl });
            updateEmployeeTable();
        });
    } else {
        employees.push({ name, role, contact, photo: '' });
        updateEmployeeTable();
    }
    this.reset();
};

function deleteEmployee(idx) {
    employees.splice(idx, 1);
    updateEmployeeTable();
}

// Helper to read image as data URL
function readImageFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

function updateProductTable() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach((prod, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="${prod.image || ''}" alt="${prod.name}" style="width:50px;height:50px;object-fit:cover;"></td><td>${prod.name}</td><td>${prod.volume}</td><td>${prod.price}</td>
            <td><button onclick="editProduct(${idx})">Edit</button> <button onclick="deleteProduct(${idx})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
    updateProductSelect();
    updateInventoryTable();
}

function updateProductSelect() {
    const select = document.getElementById('orderProduct');
    select.innerHTML = '';
    products.forEach((prod, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = prod.name;
        select.appendChild(option);
    });
}

function updateInventoryTable() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';
    products.forEach((prod, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="${prod.image || ''}" alt="${prod.name}" style="width:40px;height:40px;object-fit:cover;"></td><td>${prod.name}</td><td>${inventory[prod.name] || 0}</td><td>${prod.price}</td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('productForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const volume = document.getElementById('productVolume').value;
    const price = document.getElementById('productPrice').value;
    const imageInput = document.getElementById('productImage');
    const file = imageInput.files[0];
    if (file) {
        readImageFile(file, function(dataUrl) {
            products.push({ name, volume, price, image: dataUrl });
            inventory[name] = 0;
            updateProductTable();
        });
    } else {
        products.push({ name, volume, price, image: '' });
        inventory[name] = 0;
        updateProductTable();
    }
    this.reset();
};

function editProduct(idx) {
    const prod = products[idx];
    document.getElementById('productName').value = prod.name;
    document.getElementById('productVolume').value = prod.volume;
    document.getElementById('productPrice').value = prod.price;
    // Note: image cannot be set for file input for security reasons
    products.splice(idx, 1);
    updateProductTable();
}

function deleteProduct(idx) {
    const prod = products[idx];
    products.splice(idx, 1);
    delete inventory[prod.name];
    updateProductTable();
}

// Order management
function updateOrderTable() {
    const tbody = document.querySelector('#orderTable tbody');
    tbody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${order.customer}</td><td>${order.product}</td><td>${order.quantity}</td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();
    const customer = document.getElementById('orderCustomer').value;
    const productIdx = document.getElementById('orderProduct').value;
    const quantity = parseInt(document.getElementById('orderQuantity').value);
    const product = products[productIdx];
    if (!product) return;
    if ((inventory[product.name] || 0) < quantity) {
        alert('Not enough stock!');
        return;
    }
    orders.push({ customer, product: product.name, quantity });
    inventory[product.name] -= quantity;
    updateOrderTable();
    updateInventoryTable();
    this.reset();
};

// Initialize
showSection('dashboard');
updateProductTable();
updateOrderTable();
updateInventoryTable();

updateEmployeeTable();

updateSupplierTable();

updateLogisticsTable();

updateQualityTable();

updateEquipmentTable();

updateFinanceTable();

updateSafetyTable();

// Reports/Analytics
function generateReport(type) {
    let html = '';
    if (type === 'sales') {
        html = '<h3>Sales Report</h3>';
        if (financeRecords.length === 0) html += '<p>No sales data.</p>';
        else {
            html += '<ul>';
            financeRecords.filter(r => r.type === 'Sale').forEach(r => {
                html += `<li>${r.date}: $${r.amount} - ${r.desc}</li>`;
            });
            html += '</ul>';
        }
    } else if (type === 'inventory') {
        html = '<h3>Inventory Report</h3>';
        if (products.length === 0) html += '<p>No products in inventory.</p>';
        else {
            html += '<ul>';
            products.forEach(p => {
                html += `<li>${p.name}: ${inventory[p.name] || 0} units in stock</li>`;
            });
            html += '</ul>';
        }
    } else if (type === 'quality') {
        html = '<h3>Quality Control Report</h3>';
        if (qualityRecords.length === 0) html += '<p>No quality records.</p>';
        else {
            html += '<ul>';
            qualityRecords.forEach(q => {
                html += `<li>${q.date}: ${q.product} (Batch ${q.batch}) - ${q.result} (${q.inspector})</li>`;
            });
            html += '</ul>';
        }
    } else if (type === 'equipment') {
        html = '<h3>Equipment Report</h3>';
        if (equipmentList.length === 0) html += '<p>No equipment data.</p>';
        else {
            html += '<ul>';
            equipmentList.forEach(eq => {
                html += `<li>${eq.name} (${eq.type}): Status - ${eq.status}, Next Maintenance: ${eq.nextMaint}</li>`;
            });
            html += '</ul>';
        }
    }
    document.getElementById('reportResult').innerHTML = html;
}

// Simple advert carousel
let advertIdx = 0;
const advertImages = document.querySelectorAll('.adverts-carousel .ad-image');
if (advertImages.length > 0) {
    setInterval(() => {
        advertImages[advertIdx].classList.remove('active');
        advertIdx = (advertIdx + 1) % advertImages.length;
        advertImages[advertIdx].classList.add('active');
    }, 3000);
}
