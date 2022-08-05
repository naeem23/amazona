import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Signin = () => {
    const { search } = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : '/'

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <Helmet>
                    <title>Sign In</title>
                </Helmet>
                <h1>Sign In</h1>

                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className="mt-3">
                        New Customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin