
document.addEventListener('DOMContentLoaded', () => {


    

    const filterType = document.getElementById('filter-type');
    const filterSearch = document.getElementById('filter-search');
    const filterDateStart = document.getElementById('filter-date-start');
    const filterDateEnd = document.getElementById('filter-date-end');
    

    const userTableBody = document.getElementById('user-table-body');
    const userCount = document.getElementById('user-count');

    

    
    function loadAndDisplayData() {

        const allRegistrations = JSON.parse(localStorage.getItem('festivalRegistrations')) || [];


        userTableBody.innerHTML = ''; 


        if (allRegistrations.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="4">ยังไม่มีข้อมูลผู้ลงทะเบียน</td></tr>';
            userCount.textContent = 0;
            return;
        }


        allRegistrations.forEach(entry => {
            const tr = document.createElement('tr');
            tr.className = 'user-row';
            

            tr.dataset.type = entry.type || 'registration'; 
            tr.dataset.date = entry.date || ''; 


            tr.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${(entry.type === 'registration' ? 'Registration' : 'Feedback')}</td>
                <td>${entry.dateString || 'N/A'}</td>
            `;
            

            userTableBody.appendChild(tr);
        });
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
            
            const searchMatch = (rowName.includes(searchValue)) || 
                                (rowEmail.includes(searchValue));
            
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
    filterAndDisplayData();  
});