(()=>{function d(t){let o=document.querySelector("html");o.dataset.bsTheme=t}var n=d;function a(t,o){return function(m){m.preventDefault(),t.focus(),t.scrollIntoView({behavior:"smooth"}),o.checked=!0}}var e=a;var r=window.matchMedia("(prefers-color-scheme: dark)"),l=document.getElementById("themeLight"),s=document.getElementById("themeDark");r.matches&&(s.checked=!0,n("dark"));s.addEventListener("input",()=>{n("dark")});l.addEventListener("input",()=>{n("light")});var u=document.getElementById("selectAskQuestion"),k=document.getElementById("selectMomentumPack"),i=document.getElementById("selectGrowthPack"),h=document.getElementById("selectMasteryPack"),c=document.getElementById("emailLabel"),y=e(c,document.getElementById("askQuestionPack")),E=e(c,document.getElementById("momentumPack")),g=e(c,document.getElementById("growthPack")),B=e(c,document.getElementById("masteryPack"));u.addEventListener("click",y);k.addEventListener("click",E);i.addEventListener("click",g);h.addEventListener("click",B);})();
//# sourceMappingURL=main.js.map
