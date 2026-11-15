"use strict";
(() => {
 const $=id=>document.getElementById(id), params=new URLSearchParams(location.search);
 const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
 function setTheme(value, persist) {
  const theme = value === 'dark' ? 'dark' : 'screen';
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach(button => {
   const active = button.dataset.themeChoice === theme;
   button.classList.toggle('active', active);
   button.setAttribute('aria-pressed', String(active));
  });
  if (persist) { try { localStorage.setItem('azimuth-theme', theme); } catch (error) {} }
 }
 setTheme(document.documentElement.dataset.theme, false);
 themeButtons.forEach(button => button.addEventListener('click', () => setTheme(button.dataset.themeChoice, true)));
 window.addEventListener('storage', event => {
  if (event.key === 'azimuth-theme' || event.key === null) setTheme(event.newValue, false);
 });
 const normalize = value => value.toLocaleLowerCase('ru').replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
 if ($('article-list')) {
  const search = $('search'), category = $('category');
  const items = [...document.querySelectorAll('[data-article]')];
  const pills = [...document.querySelectorAll('[data-filter-category]')];
  search.value = params.get('q') || '';
  category.value = params.get('category') || '';
  function filter() {
   const words = normalize(search.value).split(' ').filter(Boolean);
   let count = 0;
   items.forEach(item => {
    const text = normalize(item.dataset.search + ' ' + item.dataset.category);
    const visible = words.every(word => text.includes(word)) && (!category.value || item.dataset.category === category.value);
    item.hidden = !visible;
    if (visible) count++;
   });
   $('result-count').textContent = `Найдено: ${count} из ${items.length}`;
   $('no-results').hidden = count > 0;
   pills.forEach(button => {
    const active = button.dataset.filterCategory === category.value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
   });
  }
  search.addEventListener('input', filter);
  search.addEventListener('keydown', event => {
   if (event.key === 'Escape') { search.value = ''; filter(); }
  });
  category.addEventListener('change', filter);
  pills.forEach(button => button.addEventListener('click', () => {
   category.value = button.dataset.filterCategory;
   filter();
  }));
  $('reset').addEventListener('click', () => {
   search.value = ''; category.value = ''; filter(); search.focus();
  });
  filter();
 }
 if ($('media-grid')&&window.AZ_MEDIA) {
  const search=$('media-search'),type=$('media-type');let page=0;const size=36;search.value=params.get('q')||'';
  function render(){const q=search.value.trim().toLocaleLowerCase('ru'),files=window.AZ_MEDIA.filter(m=>(!q||m.original.toLocaleLowerCase('ru').includes(q))&&(!type.value||m.type===type.value));const pages=Math.max(1,Math.ceil(files.length/size));page=Math.min(page,pages-1);const grid=$('media-grid');grid.replaceChildren();
   files.slice(page*size,(page+1)*size).forEach(m=>{const tile=document.createElement('article');tile.className='media-tile';if(m.type==='Изображения'){const box=document.createElement('a');box.className='media-preview';box.href=m.path;const img=document.createElement('img');img.loading='lazy';img.src=m.path;img.alt=m.name;box.append(img);tile.append(box);}else{const audio=document.createElement('audio');audio.controls=true;audio.preload='none';audio.src=m.path;audio.setAttribute('aria-label',m.name);tile.append(audio);}const link=document.createElement('a');link.className='media-name';link.href=m.path;link.textContent=m.original;tile.append(link);grid.append(tile);});
   if(!files.length){const p=document.createElement('p');p.textContent='Файлы не найдены. Измени запрос.';grid.append(p);}
   $('media-count').textContent=`Файлов: ${files.length} из ${window.AZ_MEDIA.length}`;$('media-page').textContent=`${page+1} / ${pages}`;$('prev').disabled=page===0;$('next').disabled=page>=pages-1;
  }
  search.addEventListener('input',()=>{page=0;render();});type.addEventListener('change',()=>{page=0;render();});$('prev').addEventListener('click',()=>{page--;render();});$('next').addEventListener('click',()=>{page++;render();});render();
 }
})();
