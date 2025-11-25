document.addEventListener('DOMContentLoaded', () => {

    // ระบุ IP ของเครื่อง server ตรงนี้ครั้งเดียว
    const BASE_URL = 'http://44.211.32.196/G18_OurFestival';

    const filterType = document.getElementById('filter-type');
    const filterSearch = document.getElementById('filter-search');
    const filterDateStart = document.getElementById('filter-date-start');
    const filterDateEnd = document.getElementById('filter-date-end');

    const userTableBody = document.getElementById('user-table-body');
    const userCount = document.getElementById('user-count');

    async function loadAndDisplayData() {
        try {
            const response = await fetch(`${BASE_URL}/data.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const allRegistrations = await response.json();
            userTableBody.innerHTML = '';

            if (!Array.isArray(allRegistrations) || allRegistrations.length === 0) {
                userTableBody.innerHTML = '<tr><td colspan="4">ยังไม่มีข้อมูลผู้ลงทะเบียน</td></tr>';
                userCount.textContent = 0;
                return;
            }

            allRegistrations.forEach(entry => {
                const tr = document.createElement('tr');
                tr.className = 'user-row';

                const entryType = entry.type || 'registration';
                tr.dataset.type = entryType;
                tr.dataset.date = entry.created_at ? entry.created_at.split(' ')[0] : '';

                tr.innerHTML = `
                    <td>${entry.fullname}</td>
                    <td>${entry.email}</td>
                    <td>${entryType === 'registration' ? 'Registration' : 'Feedback'}</td>
                    <td>${entry.created_at || 'N/A'}</td>
                `;

                userTableBody.appendChild(tr);
            });

            filterAndDisplayData();

        } catch (error) {
            console.error('Error loading data:', error);
            userTableBody.innerHTML = '<tr><td colspan="4">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>';
            userCount.textContent = 0;
        }
    }

    function filterAndDisplayData() {

        const userRows = document.querySelectorAll('#user-table-body .user-row');

        const typeValue = filterType.value;
        const searchValue = filterSearch.value.toLowerCase();
        const startDateValue = filterDateStart.value;
        const endDateValue = filterDateEnd.value;

        let visibleCount = 0;

        userRows.forEach(row => {

            const rowType = row.dataset.type;
            const rowDate = row.dataset.date;
            const rowName = row.cells[0].textContent.toLowerCase();
            const rowEmail = row.cells[1].textContent.toLowerCase();

            const typeMatch = (typeValue === 'all') || (typeValue === rowType);
            const searchMatch = rowName.includes(searchValue) || rowEmail.includes(searchValue);
            const dateStartMatch = (!startDateValue) || (rowDate >= startDateValue);
            const dateEndMatch = (!endDateValue) || (rowDate <= endDateValue);

            if (typeMatch && searchMatch && dateStartMatch && dateEndMatch) {
                row.classList.remove('hide');
                visibleCount++;
            } else {
                row.classList.add('hide');
            }
        });

        userCount.textContent = visibleCount;
    }

    filterType.addEventListener('change', filterAndDisplayData);
    filterSearch.addEventListener('input', filterAndDisplayData);
    filterDateStart.addEventListener('change', filterAndDisplayData);
    filterDateEnd.addEventListener('change', filterAndDisplayData);

    loadAndDisplayData();
});
