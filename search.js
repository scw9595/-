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
