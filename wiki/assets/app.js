"use strict";
(() => {
 const $=id=>document.getElementById(id), params=new URLSearchParams(location.search);
 if ($('article-list')) {
  const search=$('search'),category=$('category'),items=[...document.querySelectorAll('[data-article]')];
  search.value=params.get('q')||''; category.value=params.get('category')||'';
  function filter(){const q=search.value.trim().toLocaleLowerCase('ru');let n=0;items.forEach(el=>{const visible=(!q||(el.dataset.search+' '+el.dataset.category.toLocaleLowerCase('ru')).includes(q))&&(!category.value||el.dataset.category===category.value);el.hidden=!visible;if(visible)n++;});$('result-count').textContent=`Найдено: ${n} из ${items.length}`;$('no-results').hidden=n>0;}
  search.addEventListener('input',filter);category.addEventListener('change',filter);$('reset').addEventListener('click',()=>{search.value='';category.value='';filter();search.focus();});filter();
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
