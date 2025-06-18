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
