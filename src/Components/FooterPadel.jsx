export default function FooterPadel(){
    return(
 <footer className="bg-dark text-light py-4 mt-auto ">
      <div className="container">
        <div className="row ">
          <div className="col-md-4 mb-3 ">
            <h5 className="fw-bold">🎾 Zerbo Padel</h5>
            <p className=" small text-white">Il tuo centro sportivo di riferimento per il padel.</p>
            <p className=" small text-white mt-0">Prenota il tuo campo e divertiti!</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contatti</h6>
            <p className="text-white small mb-1">📍 Via Arturo Coello, 1 - Roma</p>
            <p className="text-white small mb-1">📞 +39 06 1234567</p>
            <p className="text-white small mb-1">✉️ zerbopadel@gmail.com</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">I nostri orari</h6>
            <p className="text-white small mb-1">Lunerdì - Venerdì: 08:00 - 22:00</p>
            <p className="text-white small mb-1">Sabato - Domenica: 08:00 - 22:00</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center text-white small">
          &copy; {new Date().getFullYear()} PadelCenter - Tutti i diritti riservati
        </div>
      </div>
    </footer>
    );
}