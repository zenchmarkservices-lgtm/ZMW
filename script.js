// Zenchmark Site Scripts
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const d = new Date().toISOString().slice(0,10);
  const ids = ['pp-date','tc-date','rp-date'];
  ids.forEach(id=>{ const el = document.getElementById(id); if (el) el.textContent = d; });

  // Namespace for contact form
  window.Zenchmark = window.Zenchmark || {};
  window.Zenchmark.submitForm = function(e){
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    status.textContent = 'Submitting...';
    // Demo only – in production integrate with backend or form service
    setTimeout(()=>{
      status.textContent = 'Thanks! We\'ll reach out shortly.';
      form.reset();
    }, 700);
    return false;
  };
})();
