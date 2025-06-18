function getParam(k){return new URL(location).searchParams.get(k);}
function loadAll(id){
  const data=localStorage['hist_'+id];
  return data?JSON.parse(data):[];
}
function saveAll(id,arr){localStorage['hist_'+id]=JSON.stringify(arr);}
function renderHistory(id){
  const div=document.getElementById('history');
  const arr=loadAll(id); div.innerHTML='';
  arr.slice().reverse().forEach(i=>{
    const d=document.createElement('div'); d.className='item';
    d.innerHTML=`<strong>${i.date}</strong><br>
      고객사: ${i.customer}<br>
      접수: ${i.reception}<br>
      점검: ${i.inspection}`;
    div.appendChild(d);
  });
}

const id=getParam('id');
if(id){
  document.getElementById('equipTitle').textContent=`장비 ${id} 입력`;
  renderHistory(id);
  document.getElementById('saveBtn').onclick=function(){
    const c=document.getElementById('customer').value.trim();
    const r=document.getElementById('reception').value.trim();
    const i=document.getElementById('inspection').value.trim();
    if(!c||!r||!i){alert('모든 항목을 입력하세요.');return;}
    const arr=loadAll(id);
    arr.push({date:new Date().toLocaleString(),customer:c,reception:r,inspection:i});
    saveAll(id,arr); alert('저장됨'); renderHistory(id);
    document.getElementById('customer').value='';
    document.getElementById('reception').value='';
    document.getElementById('inspection').value='';
  };
  document.getElementById('backBtn').onclick=()=>location.href='index.html';
}
document.addEventListener('DOMContentLoaded', () => {
  const equipList = document.getElementById('equipList');
  if (!equipList) return;

  // 검색 입력창 생성
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '장비 검색';
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.marginBottom = '10px';
  equipList.parentElement.insertBefore(input, equipList);

  // 필터 기능
  input.addEventListener('input', () => {
    const keyword = input.value.toLowerCase();
    [...equipList.children].forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(keyword) ? '' : 'none';
    });
  });
});
function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const sheetNames = ['P2310', 'P2311', 'P2312'];

  sheetNames.forEach(id => {
    const data = loadAll(id).map(item => ({
      날짜: item.date,
      고객사: item.customer,
      접수내용: item.reception,
      점검내용: item.inspection,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, id);
  });

  XLSX.writeFile(wb, '장비이력.xlsx');
}

// HTML에 버튼 추가 (예: equipment.html)
const exportBtn = document.createElement('button');
exportBtn.textContent = '엑셀 내보내기';
exportBtn.onclick = exportToExcel;
document.body.appendChild(exportBtn);

