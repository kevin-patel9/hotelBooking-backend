import './Mail.css';

export const MailList = () => {
    return(
        <div className='mail'>
            <h1 className='mailTitle'>Save Time,</h1>
            <span className='mailDesc'>Sign and get upto 10% discount</span>
            <div className='mailInputContainer'>
                    <input type='email' placeholder="Your Email" />
                    <button>Subscribe</button>
            </div>
        </div>
    )
}