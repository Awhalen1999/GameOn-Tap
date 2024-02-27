const RulesModal = ({ id, title, rules, buttonText }) => (
  <>
    <button
      className='btn'
      onClick={() => document.getElementById(id).showModal()}
    >
      {buttonText}
    </button>
    <dialog id={id} className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box'>
        <h2 className='font-bold text-lg'>{title}</h2>
        <p className='py-4'>{rules}</p>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
);

export default RulesModal;
