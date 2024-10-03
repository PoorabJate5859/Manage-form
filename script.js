let currentEditIndex = null;

function getRecords() {
    const records = localStorage.getItem("userRecords");
    return records ? JSON.parse(records) : [];
}

function displayRecords() {
    const recordList = document.getElementById("recordList");
    recordList.innerHTML = "";

    const records = getRecords();
    records.forEach((record, index) => {
        recordList.innerHTML += `
            <tr>
                <td>${record.name}</td>
                <td>${record.details}</td>
                <td>${new Date(record.date).toLocaleString()}</td>
                <td>
                    <button class="table-button" onclick="loadRecord(${index})">Edit</button>
                    <button class="table-button table-delete" onclick="deleteRecord(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addRecord() {
    const nameInput = document.getElementById("name").value.trim();
    const detailsInput = document.getElementById("details").value.trim();

    if (!nameInput || !detailsInput) {
        alert("Please fill out both fields.");
        return;
    }

    const newRecord = {
        id: generateId(),
        name: nameInput,
        details: detailsInput,
        date: new Date(),
    };

    const records = getRecords();
    records.push(newRecord);
    localStorage.setItem("userRecords", JSON.stringify(records));

    clearForm();
    displayRecords();
}

function loadRecord(index) {
    const records = getRecords();
    const record = records[index];

    document.getElementById("name").value = record.name;
    document.getElementById("details").value = record.details;

    currentEditIndex = index;

    document.getElementById("add-button").style.display = "none";
    document.getElementById("update-button").style.display = "block";
}

function updateRecord() {
    const records = getRecords();
    records[currentEditIndex].name = document.getElementById("name").value.trim();
    records[currentEditIndex].details = document.getElementById("details").value.trim();
    records[currentEditIndex].date = new Date();

    localStorage.setItem("userRecords", JSON.stringify(records));

    clearForm();
    displayRecords();

    document.getElementById("add-button").style.display = "block";
    document.getElementById("update-button").style.display = "none";
    currentEditIndex = null;
}

function deleteRecord(index) {
    const records = getRecords();
    records.splice(index, 1);
    localStorage.setItem("userRecords", JSON.stringify(records));
    displayRecords();
}

function searchByName() {
    const query = document.getElementById("search").value.toLowerCase();
    const records = getRecords();
    const filteredData = records.filter(record => record.name.toLowerCase().includes(query));

    const recordList = document.getElementById("recordList");
    recordList.innerHTML = "";

    filteredData.forEach((record, index) => {
        recordList.innerHTML += `
            <tr>
                <td>${record.name}</td>
                <td>${record.details}</td>
                <td>${new Date(record.date).toLocaleString()}</td>
                <td>
                    <button class="table-button" onclick="loadRecord(${index})">Edit</button>
                    <button class="table-button table-delete" onclick="deleteRecord(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function generateId() {
    return Math.floor(Math.random() * Date.now());
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("details").value = "";
}

document.addEventListener("DOMContentLoaded", displayRecords);