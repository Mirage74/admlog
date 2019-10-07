import React, { Component } from 'react';
class Register extends Component {

    componentDidMount() {
        fetch('/admin')
            .then(response => {
                console.log(response)
                return response.json();
            })
            .then(json => {
                if (json == 'You are Not Logged In') {
                    this.props.history.push('/Login')
                    console.log('parsed json ', json);
                }
                else if (json == 'Sorry you have not permission on this page') {
                    this.props.history.push('/Error');
                }

            })
            .catch(error => {
                console.log(error);
            });

    }
    render() {
        return (
            <div>
                <main className="my-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">ADD USER</div>
                                    <div className="card-body">
                                        <form name="my-form" onsubmit="return validform()" action="/save" method="POST">

                                            <div className="form-group row">
                                                <label for="user_name" className="col-md-4 col-form-label text-md-right">User
                                        Name</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="user_name" className="form-control" name="name" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                                <div className="col-md-6">
                                                    <input type="password" id="password" name="password" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="access_app" className="col-md-4 col-form-label text-md-right">Access
                                        App</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="access_app" name="access_app" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="access_app" className="col-md-4 col-form-label text-md-right">Set Admin
            
                                    </label>
                                                <div className="col-md-6">
                                                    <input type="text" id="isAdmin" name="isAdmin" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="startup_arg" className="col-md-4 col-form-label text-md-right">Startup_Arg
            
                                    </label>
                                                <div className="col-md-6">
                                                    <input type="text" id="startup_arg" name="startup_arg" className="form-control" />
                                                </div>
                                            </div>



                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    ADD User
                                    </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>

            </div>

        );
    }
}

export default Register;