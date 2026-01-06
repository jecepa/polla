document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('tabs');
    const contentContainer = document.getElementById('content');
    let jsonData = {};

    const sheetNames = {
        "sheet001": "Participantes",
        "sheet002": "Posiciones",
        "sheet003": "Octavos",
        "sheet004": "Cuartos",
        "sheet005": "Semis",
        "sheet006": "TercerCuarto",
        "sheet007": "Final",
        "sheet008": "Mcuartos",
        "sheet009": "Msemis",
        "sheet010": "MTercero",
        "sheet011": "MFinal",
        "sheet012": "MOctavos"
    };

    function renderTabs() {
        tabsContainer.innerHTML = '';
        Object.keys(jsonData).forEach(sheetId => {
            const button = document.createElement('button');
            button.className = 'px-4 py-2';
            button.textContent = sheetNames[sheetId] || sheetId;
            button.onclick = () => renderContent(sheetId);
            tabsContainer.appendChild(button);
        });
        if (Object.keys(jsonData).length > 0) {
            renderContent(Object.keys(jsonData)[0]);
        }
    }

    function renderContent(sheetId) {
        contentContainer.innerHTML = '';
        const data = jsonData[sheetId];
        if (data) {
            const table = document.createElement('table');
            table.className = 'min-w-full bg-white';
            const tbody = document.createElement('tbody');
            data.forEach(rowData => {
                const tr = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.className = 'border px-4 py-2';
                    td.textContent = cellData;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            contentContainer.appendChild(table);
        }

        Array.from(tabsContainer.children).forEach((button, index) => {
            if (Object.keys(jsonData)[index] === sheetId) {
                button.classList.add('border-b-2', 'border-blue-500');
            } else {
                button.classList.remove('border-b-2', 'border-blue-500');
            }
        });
    }

    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            renderTabs();
        })
        .catch(error => console.error('Error loading data:', error));
});
