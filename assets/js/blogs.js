document.addEventListener('DOMContentLoaded', ()=>{
    /* 2‑A  –  Build TOC */
    const toc = document.getElementById('toc');
    const list = document.createElement('ul');
    document.querySelectorAll('.blog h2, .blog h3').forEach((h,i)=>{
        if(!h.id) h.id = h.textContent
          .toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]/g,'')+'-'+i;
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${h.id}">${h.textContent}</a>`;
        if(h.tagName==='H3'){
            let sub = list.lastElementChild?.querySelector('ul');
            if(!sub){sub=document.createElement('ul');list.lastElementChild.appendChild(sub);}
            sub.appendChild(li);
        }else list.appendChild(li);
    });
    toc.appendChild(list);
  
    /* 2‑B  –  toc toggle */
    const open = document.getElementById('open-toc-btn');
    const close = document.getElementById('close-toc-btn');
    const body     = document.body;
  
    open.addEventListener('click', ()=> body.classList.toggle('show-toc'));
    close.addEventListener('click',()=> body.classList.remove('show-toc'));
    
    /* 2‑C  –  Dark / light toggle */
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.onclick = ()=>{
      body.classList.toggle('dark-mode');
      themeBtn.textContent = body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
    };
  
    /* 2‑D  –  Font‑size limits */
    const incBtn = document.getElementById('font-inc');
    const decBtn = document.getElementById('font-dec');
    const MIN = 14, MAX = 22;          // hard limits
    function setSize(px){
       document.documentElement.style.setProperty('--base-font-size', px+'px');
    }
    function currentSize(){
       return parseInt(getComputedStyle(document.documentElement)
                       .getPropertyValue('--base-font-size'));
    }
    incBtn.onclick = ()=>{ let s=currentSize(); if(s<MAX) setSize(s+1); };
    decBtn.onclick = ()=>{ let s=currentSize(); if(s>MIN) setSize(s-1); };
  });