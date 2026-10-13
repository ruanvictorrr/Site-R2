const WA = "5581983431568", $ = id => document.getElementById(id), clean = v => (v || "").trim();
const P = [["70-medical.jpg", "70 Medical"], ["somos.png", "Somos Educação"], ["grupo-galdi.png", "Grupo Galdi"], ["dufrio.png", "Dufrio"], ["nathalya.png", "Nathalya"], ["mor.png", "Mor"], ["inbetta.png", "InBetta"], ["kelldrin.png", "Kelldrin"], ["docile.png", "Docile"], ["tuper.png", "Tuper"], ["algobom.png", "Algo Bom"], ["baby-roger.png", "Baby Roger"], ["becker.png", "Becker"], ["datavoice.png", "Datavoice"], ["granplast.png", "Granplast"], ["grillo.png", "Grillo"], ["grupo-dago.jpg", "Grupo Dago"], ["maxtil.png", "Maxtil"], ["pinduca.png", "Pinduca"], ["set-sistemas.png", "Set Sistemas"], ["padreccicero.png", "Padre Cícero"], ["grupo_fortpel.png", "Fortpel"], ["hairfly.jpeg", "Hairfly"], ["leitexpress.png", "Leite Express"], ["techlux.jpeg", "Techlux"]];
const track = $("track");
track.innerHTML = P.map(([f, a]) => `<div class="p"><img src="resources/partners/${f}" alt="${a}" width="140" height="52" loading="lazy"></div>`).join("");
const clone = track.cloneNode(true); clone.removeAttribute("id"); clone.setAttribute("aria-hidden", "true"); $("marqIn").appendChild(clone);
addEventListener("load", () => $("marq").style.setProperty("--d", Math.max(24, Math.round(track.scrollWidth / 70)) + "s"));
$("pause").addEventListener("click", e => { const b = e.currentTarget, p = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", p); $("marq").classList.toggle("paused", p); $("pl").textContent = p ? "Reproduzir" : "Pausar" });

const mb = $("menuBtn"), lk = $("links");
const closeMenu = () => { lk.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.setAttribute("aria-label", "Abrir menu") };
mb.addEventListener("click", () => { const o = lk.classList.toggle("open"); mb.setAttribute("aria-expanded", o); mb.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu") });
lk.addEventListener("click", e => { if (e.target.closest("a")) closeMenu() });
addEventListener("keydown", e => { if (e.key === "Escape" && lk.classList.contains("open")) { closeMenu(); mb.focus() } });

const hd = document.querySelector("header"), sent = document.createElement("div");
sent.style.cssText = "position:absolute;top:0;height:8px;width:1px"; document.body.prepend(sent);
new IntersectionObserver(([e]) => hd.classList.toggle("on", !e.isIntersecting)).observe(sent);

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll("[data-r]").forEach(el => io.observe(el));

const tabs = [["t-cot", "formCotacao"], ["t-msg", "formContato"]];
function pick(i) { tabs.forEach(([t, f], j) => { const on = i === j; $(t).setAttribute("aria-selected", on); $(t).tabIndex = on ? 0 : -1; $(f).hidden = !on }); $("status").textContent = "" }
tabs.forEach(([t], i) => { $(t).addEventListener("click", () => pick(i)); $(t).addEventListener("keydown", e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const n = (i + 1) % 2; pick(n); $(tabs[n][0]).focus() } }) });
document.querySelectorAll("[data-tab]").forEach(a => a.addEventListener("click", () => pick(0)));

function validate(form) {
    let first = null;
    form.querySelectorAll("[required]").forEach(el => {
        const err = $("e-" + el.id), bad = !clean(el.value) || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.setAttribute("aria-invalid", bad);
        if (err) { err.textContent = bad ? (el.type === "email" && clean(el.value) ? "Informe um e-mail válido, como voce@empresa.com." : "Preencha este campo para continuar.") : ""; el.setAttribute("aria-describedby", err.id) }
        if (bad && !first) first = el
    });
    if (first) first.focus();
    return !first
}
function send(form, msg) {
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
    $("status").textContent = "Abrindo o WhatsApp…";
    form.reset(); setTimeout(() => $("status").textContent = "", 6000)
}

$("formCotacao").addEventListener("submit", e => {
    e.preventDefault(); if (!validate(e.target)) return;
    const g = id => clean($(id).value);
    send(e.target, `Olá! Gostaria de uma cotação de transporte para minha empresa.\n\nNome: ${g("nome")}\nEmpresa: ${g("empresa")}\nE-mail: ${g("email")}\nWhatsApp: ${g("telefone")}\nTipo de operação: ${g("tipo")}\nDetalhes: ${g("mensagem") || "-"}\n\n(Enviado pelo site)`)
});
$("formContato").addEventListener("submit", e => {
    e.preventDefault(); if (!validate(e.target)) return;
    const g = id => clean($(id).value);
    send(e.target, `Olá! Vim pelo site e gostaria de falar com a R2.\n\nNome: ${g("nome2")}\nE-mail: ${g("email2")}\nMensagem: ${g("msg2") || "-"}\n\n(Enviado pelo site)`)
});
$("year").textContent = new Date().getFullYear();

(() => {
    const sc = document.getElementById("scrolly"), v = document.getElementById("heroVideo");
    if (!sc || !window.gsap || !window.ScrollTrigger || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    sc.classList.add("scrolly-on");
    const [a, b, c] = sc.querySelectorAll(".stage"), hint = sc.querySelector(".hint");
    gsap.set([b, c], { autoAlpha: 0, y: 48 });
    const p = { t: 0 };
    const sync = () => { if (v && v.duration) v.currentTime = p.t * v.duration };
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: sc, start: "top top", end: "bottom bottom", scrub: .6 } });
    tl.to(p, { t: 1, duration: 10, onUpdate: sync }, 0)
        .to(hint, { autoAlpha: 0, duration: .6 }, .4)
        .to(a, { autoAlpha: 0, y: -48, duration: 1 }, 2.6)
        .to(b, { autoAlpha: 1, y: 0, duration: 1 }, 3.4)
        .to(b, { autoAlpha: 0, y: -48, duration: 1 }, 5.8)
        .to(c, { autoAlpha: 1, y: 0, duration: 1 }, 6.6);
    if (v) {
        const src = v.querySelector("source");
        src.addEventListener("error", () => v.remove());
        v.addEventListener("loadedmetadata", sync);
        const prime = () => { v.play().then(() => v.pause()).catch(() => { }); removeEventListener("touchstart", prime) };
        addEventListener("touchstart", prime, { once: true, passive: true });
    }
})();