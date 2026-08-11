const pages = [
  ["Home", "index.html"],
  ["About Us", "about.html"],
  ["Services", "services.html"],
  ["Careers", "careers.html"],
  ["Resources", "resources.html"],
  ["Contact Us", "contact.html"],
];
const current = (
  location.pathname.split("/").pop() || "index.html"
).toLowerCase();
const logo = '<img src="assets/logo-modern.svg" alt="Allied Home Care">';
document.querySelector("#site-header").innerHTML =
  `<div class="topbar"><div class="wrap topbar-inner"><span>Serving Alexandria and Northern Virginia</span><div class="top-actions"><a href="tel:+17037521751">Call 703-752-1751</a><span aria-hidden="true">•</span><span class="text-tools"><button data-size="-1" aria-label="Decrease text size">A−</button><button data-size="0" aria-label="Reset text size">A</button><button data-size="1" aria-label="Increase text size">A+</button></span></div></div></div><header class="site-header"><div class="wrap nav"><a class="logo" href="index.html" aria-label="Allied Home Care home">${logo}</a><button class="menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span><b>Menu</b></button><nav id="nav-links" class="nav-links" aria-label="Primary navigation">${pages.map(([n, u]) => `<a href="${u}" ${current === u ? 'aria-current="page"' : ""}>${n}</a>`).join("")}<a class="nav-cta" href="contact.html">Request Care</a></nav></div></header>`;
document.querySelector("#site-footer").innerHTML =
  `<section class="contact-band"><div class="wrap contact-band-inner"><div><div class="eyebrow light">Care begins with a conversation</div><h2>Let’s talk about care at home.</h2><p>Call our Alexandria office or request an appointment online.</p></div><div class="contact-actions"><a class="btn light-btn" href="contact.html">Request Care</a><a class="phone-link" href="tel:+17037521751">703-752-1751</a></div></div></section><footer class="footer"><div class="wrap"><div class="footer-grid"><div class="footer-brand">${logo}<p>High-quality, client-centered home health services for patients and families in Northern Virginia.</p></div><div><h3>Explore</h3><a href="about.html">About Us</a><a href="services.html">Services</a><a href="careers.html">Careers</a><a href="resources.html">Resources</a></div><div><h3>Contact</h3><address>4900 Leesburg Pike, Suite 214<br>Alexandria, VA 22302</address><a href="tel:+17037521751">703-752-1751</a><span>After hours: 703-459-0240</span><span>Fax: 703-842-6024</span></div><div><h3>Resources</h3><a href="assets/allied-home-care-brochure.pdf">Download Brochure</a><a href="resources.html">Service Areas</a><a href="mailto:allied@alliedhomecareinc.net">Email Our Team</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Allied Home Care. All rights reserved.</span><span>Care with dignity. Support with purpose.</span></div></div></footer><div class="mobile-actions"><a href="tel:+17037521751">Call Now</a><a href="contact.html">Request Care</a></div>`;
const menu = document.querySelector(".menu"),
  nav = document.querySelector("#nav-links");
menu.addEventListener("click", () => {
  nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", nav.classList.contains("open"));
});
document.querySelectorAll("[data-size]").forEach((b) =>
  b.addEventListener("click", () => {
    const v = Number(b.dataset.size);
    document.documentElement.style.fontSize =
      v === 0 ? "16px" : v < 0 ? "14px" : "18px";
    localStorage.setItem("alliedFont", String(v));
  }),
);
const saved = Number(localStorage.getItem("alliedFont") || 0);
if (saved)
  document.documentElement.style.fontSize = saved < 0 ? "14px" : "18px";
const reveal = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        reveal.unobserve(e.target);
      }
    }),
  { threshold: 0.08 },
);
document
  .querySelectorAll("main section,.service-cards article")
  .forEach((el) => {
    el.classList.add("reveal");
    reveal.observe(el);
  });
