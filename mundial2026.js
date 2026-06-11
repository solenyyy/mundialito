let currentFilter='all';
let currentView='list';

function setView(v){
    currentView=v;
    document.getElementById('view-list').classList.toggle('active',v==='list');
    document.getElementById('view-cal').classList.toggle('active',v==='cal');
    document.getElementById('btn-list').classList.toggle('vt-active',v==='list');
    document.getElementById('btn-cal').classList.toggle('vt-active',v==='cal');
}

function setFilter(type,btn){
    currentFilter=type;
    document.querySelectorAll('.btn-filter').forEach(b=>{
        b.className='btn-filter';
    });
    const map={all:'f-all',spain:'f-spain',morocco:'f-morocco',big:'f-big'};
    btn.classList.add(map[type]);

    function show(tags){
        if(type==='all') return true;
        if(type==='spain') return tags.includes('spain');
        if(type==='morocco') return tags.includes('morocco');
        if(type==='big') return tags.includes('big')||tags.includes('spain')||tags.includes('morocco');
        return false;
    }

    document.querySelectorAll('.match-row').forEach(row=>{
        row.classList.toggle('js-hidden',!show(row.dataset.tags||''));
    });
    document.querySelectorAll('.day-section').forEach(day=>{
        const vis=[...day.querySelectorAll('.match-row')].some(r=>!r.classList.contains('js-hidden'));
        day.classList.toggle('js-hidden',!vis);
    });

    document.querySelectorAll('.pill').forEach(p=>{
        p.classList.toggle('js-hidden',!show(p.dataset.tags||''));
    });
}