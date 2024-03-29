document.addEventListener('DOMContentLoaded', function(){
  function stripcdata(x) {
    if (x.startsWith('% <![CDATA[') && x.endsWith('%]]>'))
      return x.substring(11,x.length-4);
    return x;
  }
  document.querySelectorAll("script[type='math/tex']").forEach(function(el){
    el.outerHTML = "\\(" + stripcdata(el.textContent) + "\\)";
  });
  document.querySelectorAll("script[type='math/tex; mode=display']").forEach(function(el){
    el.outerHTML = "\\[" + stripcdata(el.textContent) + "\\]";
  });
  var script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
  document.head.appendChild(script);
}, false);
