/* Contact.jsx — the booking form below the "LET'S TOGETHER" close.
   "have a plan?" eyebrow tight against the "hit me up" headline, three
   discovery questions (the third flagged IMPORTANT), and a toggleable budget
   range as a hard-rect segmented control. Wireframe motif on the side. */

const BUDGETS = ['$0–$499', '$500–$1999', '$2000–$4999', '+$5000'];

function Contact({ onNav }) {
  const t = window.useT();
  const [budgetOn, setBudgetOn] = React.useState(false);
  const [budget, setBudget] = React.useState(null);
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    if (onNav) onNav('message sent');
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <section className="container" id="contact" style={{ paddingTop: 56, paddingBottom: 56, scrollMarginTop: 90 }}>
      <div className="cform">
        {/* left — heading (tight) + wireframe deco */}
        <div className="c-side">
          <span className="tech-eyebrow c-eyebrow"><span className="idx">03</span> {t('contact.eyebrow')}</span>
          <h2>{t('contact.t1')}<br />{t('contact.t2')}</h2>
          <p>{t('contact.body')}</p>
          <div className="c-art"><MeshArt w={260} h={170} /></div>
        </div>

        {/* right — the form */}
        <form className="c-fields" onSubmit={submit}>
          <div className="c-row2">
            <div className="field"><label>{t('contact.name')}</label><input placeholder={t('contact.name.ph')} /></div>
            <div className="field"><label>{t('contact.email')}</label><input type="email" placeholder={t('contact.email.ph')} /></div>
          </div>

          <div className="qfield">
            <div className="q-label"><span className="q-num">01</span> {t('contact.q1')}</div>
            <textarea placeholder={t('contact.q1.ph')}></textarea>
          </div>

          <div className="qfield">
            <div className="q-label"><span className="q-num">02</span> {t('contact.q2')}</div>
            <textarea placeholder={t('contact.q2.ph')}></textarea>
          </div>

          <div className="qfield is-important">
            <div className="q-label">
              <span className="imp-tag">{t('contact.important')}</span>
              {t('contact.q3')}
              <span className="q-hatch" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            </div>
            <textarea placeholder={t('contact.q3.ph')}></textarea>
          </div>

          {/* toggleable budget */}
          <div>
            <button type="button" className="budget-toggle" onClick={() => setBudgetOn((v) => !v)} aria-pressed={budgetOn}>
              <span className={'sq' + (budgetOn ? ' on' : '')}><Icon name="check" size={14} /></span>
              <span className="lbl">{t('contact.budget')}</span>
            </button>
            {budgetOn ? (
              <div className="seg" style={{ marginTop: 16 }}>
                {BUDGETS.map((b) => (
                  <button type="button" key={b} className={budget === b ? 'on' : ''} onClick={() => setBudget(b)}>{b}</button>
                ))}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '15px 28px' }}>
            {sent ? t('contact.sent') : t('contact.send')} <Icon name="arrow-up-right" size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

Object.assign(window, { Contact });
