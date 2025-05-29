function addRow() {
      const tableBody = document.getElementById('tableBody');
      const row = document.createElement('tr');

      row.innerHTML = `
        <td><input type="text" placeholder="" required></td>
        <td><input type="number" min="1" placeholder="" required></td>
        <td><input type="number" min="0" max="20" placeholder=""></td>
        <td><input type="number" min="0" max="20" placeholder=""></td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
      `;

      tableBody.appendChild(row);
    }

    function deleteRow(button) {
      button.parentElement.parentElement.remove();
    }

    function calculateAverage() {
      const rows = document.querySelectorAll('#tableBody tr');
      let totalWeighted = 0;
      let totalCoefficients = 0;

      rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const coefficient = parseFloat(inputs[1].value);
        const td = parseFloat(inputs[2].value);
        const exam = parseFloat(inputs[3].value);
        if (isNaN(coefficient)) return;

        let subjectAverage = 0;
        if (!isNaN(td) && isNaN(exam)) {
          // فقط TD
          subjectAverage = td;
        } else if (isNaN(td) && !isNaN(exam)) {
          // فقط الامتحان
          subjectAverage = exam;
        } else if (!isNaN(td) && !isNaN(exam)) {
          // كلاهما TD و امتحان
          subjectAverage = td * 0.4 + exam * 0.6;
        } else {
          // لا TD ولا امتحان
          return;
        }
        
        totalWeighted += subjectAverage * coefficient;
        totalCoefficients += coefficient;
      });

      const finalAverage = totalCoefficients > 0 ? (totalWeighted / totalCoefficients).toFixed(2) : "?";
      document.getElementById('average').textContent = ` General Average  : ${finalAverage}`;
    }

 
 
 function saveAsPDF(id) {
  const tableBody = document.getElementById(id);
  const now = new Date().toLocaleString();

  // إنشاء عنصر مؤقت يحتوي على المحتوى المطلوب
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <h3>Student Grades</h3>
    <p><strong>Generated on:</strong> ${now}</p>
    <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>Scale Name</th>
          <th>Lab</th>
          <th>TD Degree</th>
          <th>Exam Degree</th>
        </tr>
      </thead>
      <tbody>
        ${tableBody.innerHTML}
      </tbody>
    </table>
  `;

  // استدعاء مكتبة html2pdf لتحويل العنصر إلى PDF وحفظه
  html2pdf().from(wrapper).save('Grades_Table.pdf');
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker مسجل:', reg))
      .catch(err => console.log('فشل تسجيل Service Worker:', err));
  });
}
    window.onload = addRow;
