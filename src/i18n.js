/* i18n.js — language layer for the Salazar portfolio (plain JS, no JSX).
   Defines window.STRINGS (EN/ES), a React context, and a useT() hook so every
   component can translate without prop-threading. English is the default. */

window.STRINGS = {
  en: {
    'nav.about': 'about', 'nav.works': 'works', 'nav.pricing': 'pricing', 'nav.contact': 'contact',
    'nav.cta': 'Get Started',
    'lang.head': 'Language', 'lang.en': 'English', 'lang.es': 'Español',
    'theme.toggle': 'Toggle light / dark',

    'hero.eyebrow': 'Alejandro Salazar // Growth UX/UI Designer × Email Marketer',
    'hero.t1': 'design', 'hero.t2': 'that', 'hero.t3': 'converts.',
    'hero.tag': 'New', 'hero.announce': 'metalform · imfit · noble — case studies live',
    'hero.cta': 'See the work', 'hero.scroll': '↓ scroll',

    'about.who': 'who', 'about.am': 'am', 'about.i': 'I',
    'about.body': "I'm Alejandro — a growth-focused UX/UI designer and email marketer based in Colombia. I design stores that convert and the lifecycle emails that keep them buying. Strategy, interface, and revenue, end to end.",
    'about.plan': 'HAVE A PLAN?', 'about.hit': 'HIT ME UP!',

    'sys.eyebrow': 'the system', 'sys.t1': 'Designed', 'sys.t2': 'and shipped.',
    'sys.body': 'Every surface is engineered from the same hairline boxes, hard rectangles, and one structural red — no shadows, no gradients, no pills.',

    'works.label': 'selected works',
    'works.0.meta': 'Website Design', 'works.0.tag': 'Metalworking · Web',
    'works.1.meta': 'Full Redesign · Email Marketing', 'works.1.tag': 'Vape · E-commerce',
    'works.2.meta': 'Audit · Redesign · Email', 'works.2.tag': 'Supplements · CRO',
    'works.3.meta': 'Website Design · Email Marketing', 'works.3.tag': 'Streetwear · Email',
    'works.4.meta': 'Email Marketing', 'works.4.tag': 'Lifecycle · Retention',
    'mq.1': 'UX / UI DESIGN', 'mq.2': 'EMAIL MARKETING',

    'price.eyebrow': 'engagement', 'price.title': 'Pick a lane.',
    'price.body': 'Three tiers, one polarity-flip. The featured tier is marked by a subtle red glow — elevation by color, never by shadow.',
    'price.per': '/mo',
    'price.t0.cta': 'Choose Starter', 'price.t1.cta': 'Choose Studio', 'price.t2.cta': 'Talk to us',
    'price.f.land': '1 landing page', 'price.f.lib': 'Line-art library', 'price.f.comm': 'Community support',
    'price.f.unl': 'Unlimited pages', 'price.f.full': 'Full component set', 'price.f.prio': 'Priority support', 'price.f.custom': 'Custom line-art',
    'price.f.multi': 'Multi-brand kits', 'price.f.white': 'White-label', 'price.f.ded': 'Dedicated engineer',

    'testi.label': 'what cool people have to say', 'testi.portrait': 'portrait',
    'quote.0.q': 'Dying before you die is the hardest and most important work that you can do if you want to truly live and truly lead.', 'quote.0.by': 'Fred Kofman.',
    'quote.1.q': 'Design is not just what it looks like and feels like. Design is how it works.', 'quote.1.by': 'Steve Jobs.',
    'quote.2.q': 'Simplicity is about subtracting the obvious and adding the meaningful.', 'quote.2.by': 'John Maeda.',
    'testi.0.role': 'Tesla CEO', 'testi.0.q': 'Alejandro, your multifaceted expertise in UX engineering, Front End wizardry, and graphic design is simply out of this world — fitting, considering where I plan to take you. Yes, Alejandro, I\u2019m talking about Mars. Your talent knows no bounds, and I believe your skills will be invaluable in shaping the digital landscapes of our interplanetary future.',
    'testi.1.role': 'Founder, Attienda', 'testi.1.q': 'He rebuilt our entire identity in two weeks and somehow made it feel inevitable. The system still holds up two years later — nothing we have shipped since has dated it.',
    'testi.2.role': 'Design Lead, Nebula', 'testi.2.q': 'The most opinionated, least precious designer I have worked with. Every review made the product sharper, and he never once mistook decoration for design.',
    'testi.3.role': 'CTO, Kumanday', 'testi.3.q': 'Engineer-grade rigor with a designer eye. He shipped a component library our whole team still builds on — documented, tokenized, and impossible to misuse.',
    'testi.4.role': 'PM, Noble', 'testi.4.q': 'Fast without ever feeling rushed. He turned a vague brief into a system with real opinions, and defended every one of them with reasons that held up.',
    'testi.5.role': 'Director, Control Software Pro', 'testi.5.q': 'We came for a redesign and left with a way of working. The hairline-and-one-red discipline he set has become how the whole company thinks about interface.',
    'testi.6.role': 'Head of Brand, Nebula', 'testi.6.q': 'Restraint is the hardest thing to hire for, and he has it. Nothing on the page is decorative, and somehow it still has more personality than anything our competitors ship.',

    'cta.t1': "LET'S", 'cta.t2': 'TOGETHER',
    'cta.toast.title': 'To get there', 'cta.toast.msg': "Tell me where you're headed", 'cta.toast.go': 'Start',

    'contact.eyebrow': 'have a plan?', 'contact.t1': 'Hit me', 'contact.t2': 'up.',
    'contact.body': 'Three quick questions so I can come to our first call already useful. The more honest, the better the first draft.',
    'contact.name': 'Name', 'contact.name.ph': 'Your name', 'contact.email': 'Email', 'contact.email.ph': 'you@studio.com',
    'contact.q1': 'What is the biggest challenge you’re trying to solve right now?',
    'contact.q1.ph': 'The one thing that, if fixed, makes everything else easier…',
    'contact.q2': 'What have you already tried?',
    'contact.q2.ph': 'Tools, hires, redesigns — what moved the needle and what didn’t…',
    'contact.important': 'Important',
    'contact.q3': 'Why is now the right time to address this?',
    'contact.q3.ph': 'What changes if this slips another quarter…',
    'contact.budget': 'Add a budget range',
    'contact.send': 'Send it', 'contact.sent': 'Sent — talk soon',

    'footer.time': 'local time:', 'footer.available': 'available for freelance work', 'footer.up': 'GO UP',
  },
  es: {
    'nav.about': 'perfil', 'nav.works': 'trabajos', 'nav.pricing': 'planes', 'nav.contact': 'contacto',
    'nav.cta': 'Empezar',
    'lang.head': 'Idioma', 'lang.en': 'English', 'lang.es': 'Español',
    'theme.toggle': 'Cambiar claro / oscuro',

    'hero.eyebrow': 'Alejandro Salazar // Diseñador UX/UI de Growth × Email Marketer',
    'hero.t1': 'diseño', 'hero.t2': 'que', 'hero.t3': 'convierte.',
    'hero.tag': 'Nuevo', 'hero.announce': 'metalform · imfit · noble — casos en vivo',
    'hero.cta': 'Ver el trabajo', 'hero.scroll': '↓ desliza',

    'about.who': 'quién', 'about.am': 'soy', 'about.i': 'yo',
    'about.body': 'Soy Alejandro — diseñador UX/UI enfocado en growth y email marketer desde Colombia. Diseño tiendas que convierten y los emails de ciclo de vida que mantienen la recompra. Estrategia, interfaz y revenue, de punta a punta.',
    'about.plan': '¿TIENES UN PLAN?', 'about.hit': '¡ESCRÍBEME!',

    'sys.eyebrow': 'el sistema', 'sys.t1': 'Diseñado', 'sys.t2': 'y entregado.',
    'sys.body': 'Cada superficie se construye con las mismas cajas de línea fina, rectángulos duros y un único rojo estructural — sin sombras, sin degradados, sin píldoras.',

    'works.label': 'trabajos seleccionados',
    'works.0.meta': 'Diseño Web', 'works.0.tag': 'Metalmecánica · Web',
    'works.1.meta': 'Rediseño Completo · Email Marketing', 'works.1.tag': 'Vape · E-commerce',
    'works.2.meta': 'Auditoría · Rediseño · Email', 'works.2.tag': 'Suplementos · CRO',
    'works.3.meta': 'Diseño Web · Email Marketing', 'works.3.tag': 'Streetwear · Email',
    'works.4.meta': 'Email Marketing', 'works.4.tag': 'Ciclo de vida · Retención',

    'price.eyebrow': 'colaboración', 'price.title': 'Elige un carril.',
    'price.body': 'Tres niveles, una inversión de polaridad. El nivel destacado se marca con un sutil resplandor rojo — elevación por color, nunca por sombra.',
    'price.per': '/mes',
    'price.t0.cta': 'Elegir Starter', 'price.t1.cta': 'Elegir Studio', 'price.t2.cta': 'Hablemos',
    'price.f.land': '1 landing page', 'price.f.lib': 'Librería de line-art', 'price.f.comm': 'Soporte comunitario',
    'price.f.unl': 'Páginas ilimitadas', 'price.f.full': 'Set completo de componentes', 'price.f.prio': 'Soporte prioritario', 'price.f.custom': 'Line-art a medida',
    'price.f.multi': 'Kits multi-marca', 'price.f.white': 'Marca blanca', 'price.f.ded': 'Ingeniero dedicado',

    'testi.label': 'lo que dice la gente cool', 'testi.portrait': 'retrato',
    'quote.0.q': 'Morir antes de morir es el trabajo más difícil e importante que puedes hacer si quieres vivir de verdad y liderar de verdad.', 'quote.0.by': 'Fred Kofman.',
    'quote.1.q': 'El diseño no es solo cómo se ve y cómo se siente. El diseño es cómo funciona.', 'quote.1.by': 'Steve Jobs.',
    'quote.2.q': 'La simplicidad consiste en restar lo obvio y sumar lo significativo.', 'quote.2.by': 'John Maeda.',
    'testi.0.role': 'CEO de Tesla', 'testi.0.q': 'Alejandro, tu experiencia multifacética en ingeniería UX, magia del Front End y diseño gráfico está simplemente fuera de este mundo — apropiado, considerando a dónde planeo llevarte. Sí, Alejandro, hablo de Marte. Tu talento no conoce límites, y creo que tus habilidades serán invaluables para dar forma a los paisajes digitales de nuestro futuro interplanetario.',
    'testi.1.role': 'Fundador, Attienda', 'testi.1.q': 'Reconstruyó toda nuestra identidad en dos semanas y de algún modo la hizo sentir inevitable. El sistema sigue en pie dos años después — nada de lo que hemos lanzado desde entonces lo ha hecho ver anticuado.',
    'testi.2.role': 'Líder de Diseño, Nebula', 'testi.2.q': 'El diseñador más opinado y menos pretencioso con el que he trabajado. Cada revisión afiló el producto, y jamás confundió la decoración con el diseño.',
    'testi.3.role': 'CTO, Kumanday', 'testi.3.q': 'Rigor de ingeniero con ojo de diseñador. Entregó una librería de componentes sobre la que todo nuestro equipo aún construye — documentada, tokenizada e imposible de usar mal.',
    'testi.4.role': 'PM, Noble', 'testi.4.q': 'Rápido sin que jamás se sienta apresurado. Convirtió un brief vago en un sistema con opiniones reales, y defendió cada una con razones que se sostenían.',
    'testi.5.role': 'Director, Control Software Pro', 'testi.5.q': 'Vinimos por un rediseño y nos fuimos con una forma de trabajar. La disciplina de línea fina y un solo rojo que estableció se ha vuelto la manera en que toda la empresa piensa la interfaz.',
    'testi.6.role': 'Directora de Marca, Nebula', 'testi.6.q': 'La contención es lo más difícil de contratar, y él la tiene. Nada en la página es decorativo, y aun así tiene más personalidad que cualquier cosa que lancen nuestros competidores.',

    'cta.t1': 'TRABAJEMOS', 'cta.t2': 'JUNTOS',
    'cta.toast.title': 'Para llegar', 'cta.toast.msg': 'Cuéntame a dónde vas', 'cta.toast.go': 'Empezar',

    'contact.eyebrow': '¿tienes un plan?', 'contact.t1': 'Escrí-', 'contact.t2': 'beme.',
    'contact.body': 'Tres preguntas rápidas para llegar a nuestra primera llamada ya siendo útil. Cuanto más honesto, mejor el primer borrador.',
    'contact.name': 'Nombre', 'contact.name.ph': 'Tu nombre', 'contact.email': 'Correo', 'contact.email.ph': 'tu@estudio.com',
    'contact.q1': '¿Cuál es el mayor reto que intentas resolver ahora mismo?',
    'contact.q1.ph': 'Eso que, si se arregla, hace todo lo demás más fácil…',
    'contact.q2': '¿Qué has intentado ya?',
    'contact.q2.ph': 'Herramientas, contrataciones, rediseños — qué funcionó y qué no…',
    'contact.important': 'Importante',
    'contact.q3': '¿Por qué es ahora el momento de abordarlo?',
    'contact.q3.ph': 'Qué cambia si esto se aplaza otro trimestre…',
    'contact.budget': 'Añadir un rango de presupuesto',
    'contact.send': 'Enviar', 'contact.sent': 'Enviado — hablamos pronto',

    'footer.time': 'hora local:', 'footer.available': 'disponible para proyectos freelance', 'footer.up': 'SUBIR',
    'mq.1': 'DISEÑO UX / UI', 'mq.2': 'EMAIL MARKETING',
  },
};

window.LangCtx = React.createContext({ lang: 'en', setLang: function () {} });

window.useT = function () {
  var ctx = React.useContext(window.LangCtx);
  var lang = (ctx && ctx.lang) || 'en';
  return function (key) {
    var dict = window.STRINGS[lang] || window.STRINGS.en;
    if (dict && dict[key] != null) return dict[key];
    if (window.STRINGS.en[key] != null) return window.STRINGS.en[key];
    return key;
  };
};
